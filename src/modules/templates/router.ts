import { Router } from "express"
import Controller from "./controller"

class ShapesRouter {
  router: Router
  controller: Controller

  constructor() {
    this.router = Router()
    this.controller = new Controller()
    this.init()
  }

  private init() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Template:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of creations
     *        name:
     *          type: string
     *        preview:
     *          type: string
     *        objects:
     *          type: array
     *          items:
     *            type: object
     *            properties:
     *              id:
     *                type: string
     *                description: the auto-generated id of objects
     *              angle:
     *                type: integer
     *              stroke:
     *                type: string
     *              strokeWidth:
     *                type: integer
     *              left:
     *                type: integer
     *              top:
     *                type: integer
     *              width:
     *                type: integer
     *              height:
     *                type: integer
     *              opacity:
     *                type: integer
     *              originX:
     *                type: string
     *              originY:
     *                type: string
     *              scaleX:
     *                type: integer
     *              scaleY:
     *                type: integer
     *              flipX:
     *                type: boolean
     *              flipY:
     *                type: boolean
     *              skewX:
     *                type: integer
     *              skewY:
     *                type: integer
     *              visible:
     *                type: boolean
     *              metadata:
     *                type: object
     *                description: sub creation information
     *        background:
     *          type: object
     *          description: the description of the task
     *          properties:
     *            type:
     *              type: string
     *            value:
     *              type: string
     *        frame:
     *          type: object
     *          description: the description of the task
     *          properties:
     *            width:
     *              type: integer
     *            height:
     *              type: integer
     *      required:
     *        - name
     *      example:
     *        id: dszofSGd_fZZD44Qj87tr
     *        background: {
     *          type: color,
     *          value: ffffff
     *        }
     *        name: Untitled design
     *        preview: https://ik.imagekit.io/scenify/4LbVpqrqr7pKM7NzYSXASf5L.png
     *    TemplateNotFound:
     *      type: object
     *      properties:
     *        msg:
     *          type: string
     *          description: A message for the not found template
     *      example:
     *        msg: Template was not found
     *
     *  parameters:
     *    templateId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *        description: the template id
     */

    /**
     * @swagger
     * tags:
     *  name: Templates
     *  description: Templates endpoint
     */

    /**
     * @swagger
     * /templates:
     *  get:
     *    summary: Returns a list of templates
     *    tags: [Templates]
     *    responses:
     *      200:
     *        description: the list of templates
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Template'
     *      500:
     *        description: Some server error
     */
    this.router.get("/templates", this.controller.get)

    /**
     * @swagger
     * /templates/{id}:
     *  get:
     *    summary: Retrieve a template by Id
     *    tags: [Templates]
     *    parameters:
     *      - $ref: '#/components/parameters/templateId'
     *    responses:
     *      200:
     *        description: return the template
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Template'
     *      404:
     *        description: the template was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/TemplateNotFound'
     */
    this.router.get("/templates/:id", this.controller.getById)

    /**
     * @swagger
     * /templates:
     *  post:
     *    summary: Create a new template
     *    tags: [Templates]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Template'
     *    responses:
     *      200:
     *        description: the templates was successfully created
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Template'
     *      500:
     *        description: Some server error
     */
    this.router.post("/templates", this.controller.create)

    /**
     * @swagger
     * /templates/{id}:
     *  delete:
     *    summary: Delete template by Id
     *    tags: [Templates]
     *    parameters:
     *      - $ref: '#/components/parameters/templateId'
     *    responses:
     *      200:
     *        description: return the template
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Template'
     *      404:
     *        description: the Template was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/TemplateNotFound'
     */
    this.router.delete("/templates/:id", this.controller.remove)
  }
}

export default ShapesRouter
