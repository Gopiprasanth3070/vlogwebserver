import { Router } from "express"
import ElementsController from "./controller"

class ShapesRouter {
  router: Router
  handlers: ElementsController

  constructor() {
    this.router = Router()
    this.handlers = new ElementsController()
    this.init()
  }

  private init() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Element:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of creations
     *        left:
     *          type: integer
     *        top:
     *          type: integer
     *        width:
     *          type: integer
     *        height:
     *          type: integer
     *        originX:
     *          type: string
     *        originY:
     *          type: string
     *        scaleX:
     *          type: integer
     *        scaleY:
     *          type: integer
     *        type:
     *          type: string
     *        metadata:
     *          type: object
     *          properties:
     *            preview:
     *              type: string
     *            fill:
     *              type: string
     *            subsets:
     *              type: array
     *              items:
     *                type: array
     *                items:
     *                  type: string
     *      required:
     *        - left
     *        - top
     *      example:
     *        id: E21cH5k6GA-Mjsffl7Avr
     *        left: 0
     *        top: 0
     *        width: 60
     *        height: 60
     *        originX: "left"
     *        originY: "top"
     *        scaleX: 4
     *        scaleY: 4
     *        type: "StaticPath"
     *    ElementNotFound:
     *      type: object
     *      properties:
     *        msg:
     *          type: string
     *          description: A message for the not found element
     *      example:
     *        msg: Element was not found
     *
     *  parameters:
     *    elementId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *        description: the element id
     */

    /**
     * @swagger
     * tags:
     *  name: Elements
     *  description: Elements endpoint
     */

    /**
     * @swagger
     * /elements:
     *  get:
     *    summary: Returns a list of elements
     *    tags: [Elements]
     *    responses:
     *      200:
     *        description: the list of elements
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Element'
     *      500:
     *        description: Some server error
     */
    this.router.get("/elements", this.handlers.get)

    /**
     * @swagger
     * /elements:
     *  post:
     *    summary: Create a elements
     *    tags: [Elements]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Element'
     *    responses:
     *      200:
     *        description: the elements was successfully created
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Element'
     *      500:
     *        description: Some server error
     */
    this.router.post("/elements", this.handlers.create)

    /**
     * @swagger
     * /elements/{id}:
     *  delete:
     *    summary: delete a element by Id
     *    tags: [Elements]
     *    parameters:
     *      - $ref: '#/components/parameters/elementId'
     *    responses:
     *      200:
     *        description: return the element
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Element'
     *      404:
     *        description: the element was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/ElementNotFound'
     *
     */
    this.router.delete("/elements/:id", this.handlers.remove)
  }
}

export default ShapesRouter
