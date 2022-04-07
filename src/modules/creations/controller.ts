import { NextFunction, Response, Request } from "express"
import Service from "./service"
import DesignManager from "../../core/designManager"
import awsService from "../../services/aws"
import { getUserIdFromRequest } from "../../utils/token"

class CreationsController {
  private service: Service
  constructor() {
    this.service = new Service()
    this.downloadById = this.downloadById.bind(this)
  }

  public getCreations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let userId = await getUserIdFromRequest(req)
      const templates = await this.service.get({ userId })
      return res.send(templates)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public getCreationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string
      const template = await this.service.getById(id)
      return res.send(template)
    } catch (err) {
      return res.status(404).send({ msg: "Creation was not found" })
      //next(err)
    }
  }

  public async downloadById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const template = (await this.service.getById(id)) as any
      const designManager = new DesignManager(template)
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      return res.send(imageURL)
    } catch (err) {
      next(err)
    }
  }

  public async download(req: Request, res: Response, next: NextFunction) {
    try {
      const template = req.body
      const designManager = new DesignManager(template)
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })

      return res.send({ source: imageURL })
    } catch (err) {
      next(err)
    }
  }

  public createCreation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body
      let userId = await getUserIdFromRequest(req)

      const designManager = new DesignManager(data)
      await designManager.loadTemplate({})
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      const template = await this.service.create({ ...data, preview: imageURL, userId })
      return res.send(template)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public updateCreationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const data = req.body
      const designManager = new DesignManager(data)
      await designManager.loadTemplate({})
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      const currentCreation = await this.service.getById(id)
      if (currentCreation) {
        await this.service.update(id, { ...data, preview: imageURL })
        return res.send({ ...data, preview: imageURL, id })
      } else {
        const template = await this.service.create({ ...data, preview: imageURL, id })
        return res.send(template)
      }
    } catch (err) {
      return res.status(404).send({ msg: "Creation was not found" })
      //next(err)
    }
  }

  public removeCreationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const template = await this.service.remove(id)
      return res.send(template)
    } catch (err) {
      return res.status(404).send({ msg: "Creation was not found" })
      //next(err)
    }
  }
}

export default CreationsController
