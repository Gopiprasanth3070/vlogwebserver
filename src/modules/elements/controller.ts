import { NextFunction, Response, Request } from "express"
import ShapesService from "./service"
import DesignManager from "../../core/designManager"
import awsService from "../../services/aws"
import appConfig from "../../common/app-config"

class ElementsController {
  private service: ShapesService
  constructor() {
    this.service = new ShapesService()
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.remove = this.remove.bind(this)
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const elements = await this.service.get()
      const data = elements.map((element: any) => {
        const suffix = element.metadata.preview.split("https://d3q7mfli5umxdg.cloudfront.net/")[1]
        return {
          ...element,
          metadata: {
            ...element.metadata,
            preview: `${appConfig.proxyBase}/resources/local/${suffix}`,
          },
        }
      })
      return res.send(data)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const designManager = new DesignManager(data)
      await designManager.loadTemplate({})
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      const template = await this.service.create({
        ...data.objects[0],
        metadata: { ...data.objects[0].metadata, preview: imageURL },
      })

      return res.send(template)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const template = await this.service.remove(id)
      return res.send(template)
    } catch (err) {
      return res.status(404).send({ msg: "Element was not found" })
      //next(err)
    }
  }
}

export default ElementsController
