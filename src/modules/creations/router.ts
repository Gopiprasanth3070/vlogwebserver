import { Router } from "express"
import Controller from "./controller"

class CreationsRouter {
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
     *    Creation:
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
     *                properties:
     *                  value:
     *                    type: array
     *                    items:
     *                      type: array
     *                      items:
     *                        type: string
     *        background:
     *          type: object
     *          description: color of creation
     *          properties:
     *            type:
     *              type: string
     *            value:
     *              type: string
     *        frame:
     *          type: object
     *          properties:
     *            width:
     *              type: integer
     *            height:
     *              type: integer
     *      required:
     *        - name
     *        - preview
     *      example:
     *        id: dszofSGd_fZZD44Qj87tr
     *        name: My first Creations
     *        objects: []
     *        background: {
     *          type: color,
     *          value: ffffff
     *        }
     *        preview: https://ik.image.io/scenify/xUhDgdC11ftrd1ñlkjhjfpsd.png
     *    CreationNotFound:
     *      type: object
     *      properties:
     *        msg:
     *          type: string
     *          description: A message for the not found creation
     *      example:
     *        msg: Creation was not found
     *
     *  parameters:
     *    creationId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *        description: the creation id
     */

    /**
     * @swagger
     * tags:
     *  name: Creations
     *  description: Creations endpoint
     */

    /**
     * @swagger
     * /creations:
     *  get:
     *    summary: Returns a list of creations
     *    tags: [Creations]
     *    responses:
     *      200:
     *        description: the list of creations
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Creation'
     *      500:
     *        description: Some server error
     */
    this.router.get("/creations", this.controller.getCreations)

    /**
     * @swagger
     * /creations/{id}:
     *  get:
     *    summary: Retrieve a creation by Id
     *    tags: [Creations]
     *    parameters:
     *      - $ref: '#/components/parameters/creationId'
     *    responses:
     *      200:
     *        description: return the creation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Creation'
     *      404:
     *        description: the creation was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreationNotFound'
     */
    this.router.get("/creations/:id", this.controller.getCreationById)

    /**
     * @swagger
     * /creations/{id}:
     *  put:
     *    summary: Update a creation by Id
     *    tags: [Creations]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Creation'
     *    responses:
     *      200:
     *        description: the creations was successfully updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Creation'
     *      404:
     *        description: the creation was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreationNotFound'
     */
    this.router.put("/creations/:id", this.controller.updateCreationById)

    /**
     * @swagger
     * /creations:
     *  post:
     *    summary: Design a creations
     *    tags: [Creations]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Creation'
     *    responses:
     *      200:
     *        description: the creations was successfully created
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Creation'
     *      500:
     *        description: Some server error
     */
    this.router.post("/creations", this.controller.createCreation)

    /**
     * @swagger
     * /creations/{id}:
     *  delete:
     *    summary: delete a creation by Id
     *    tags: [Creations]
     *    parameters:
     *      - $ref: '#/components/parameters/creationId'
     *    responses:
     *      200:
     *        description: return the creation
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Creation'
     *      404:
     *        description: the creation was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/CreationNotFound'
     */
    this.router.delete("/creations/:id", this.controller.removeCreationById)
  }
}

export default CreationsRouter
