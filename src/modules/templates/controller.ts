import { NextFunction, Response, Request } from "express"
import Service from "./service"
import DesignManager from "../../core/designManager"
import awsService from "../../services/aws"

class TemplatesHandler {
  private service: Service
  constructor() {
    this.service = new Service()
    this.get = this.get.bind(this)
    this.create = this.create.bind(this)
    this.getById = this.getById.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
    this.downloadById = this.downloadById.bind(this)
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    try {
      const templates = await this.service.get()
      return res.send(templates)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const template = await this.service.getById(id)
      return res.send(template)
    } catch (err) {
      return res.status(404).send({ msg: "Template was not found" })
      //next(err)
    }
  }

  public async downloadById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id as string
      const template = await this.service.getById(id)
      const designManager = new DesignManager(template)
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      return res.send(imageURL)
    } catch (err) {
      console.log("err", err)
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
      console.log("err", err)
      next(err)
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      const designManager = new DesignManager(data)
      await designManager.loadTemplate({})
      const base64Image = await designManager.toDataURL()
      const imageURL = await awsService.uploadBase64Image({ image: base64Image })
      const template = await this.service.create({ ...data, preview: imageURL })
      return res.send(template)
    } catch (err) {
      return res.status(500)
      //next(err)
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const data = req.body
      const template = await this.service.update(id, data)
      return res.send(template)
    } catch (err) {
      next(err)
    }
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const template = await this.service.remove(id)
      return res.send(template)
    } catch (err) {
      return res.status(404).send({ msg: "Template was not found" })
      //next(err)
    }
  }
}

export default TemplatesHandler
