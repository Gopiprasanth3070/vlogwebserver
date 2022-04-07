import { Router } from "express"
import ResourcesController from "./controller"

class ResourcesRouter {
  router: Router
  handlers: ResourcesController

  constructor() {
    this.router = Router()
    this.handlers = new ResourcesController()
    this.init()
  }
  private init() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Resource:
     *      type: object
     *      properties:
     *        object:
     *          type: string
     *          description: the auto-generated id of fonts
     *        page:
     *          type: integer
     *        hasNext:
     *          type: boolean
     *        data:
     *          type: array
     *          items:
     *            type: object
     *            properties:
     *              id:
     *                type: string
     *              preview:
     *                type: string
     *              src:
     *                type: string
     *              object:
     *                type: string
     *        hasPrevious:
     *          type: string
     *        perPage:
     *          type: integer
     *        totalPages:
     *          type: integer
     *      required:
     *        - page
     *        - perPage
     *      example:
     *        object: list
     *        page: 1
     *        hasNext: false
     *        data": [
     *          {
     *              id: 555556,
     *              preview: https://api.scenify.io/resources/pixabay/photo/2015/10/25/14/10/DOG-11111_150.jpg,
     *              src: https://pixabay.com/get/g38ea513db4fecb0c75657dbb6e1c9eca50c7c91008ec1a957e5fe47f1d2395655558920922222afe8273d231e99161_222.jpg,
     *              object: pixabayImage
     *          }
     *        ]
     *        perPage: 10
     *    Iconscout:
     *      type: object
     *      properties:
     *        id:
     *          type: integer
     *        uuid:
     *          type: string
     *        asset:
     *          type: string
     *        name:
     *          type: string
     *        slug:
     *          type: string
     *        price:
     *          type: integer
     *        urls:
     *          type: object
     *          properties:
     *            thumb:
     *              type: string
     *            original:
     *              type: string
     *            svg:
     *              type: string
     *        color_codes:
     *          type: array
     *          items:
     *            type: object
     *            properties:
     *              decimal_color:
     *                type: integer
     *              color_id:
     *                type: integer
     *        formats:
     *          type: array
     *          items:
     *            type: object
     *            properties:
     *              id:
     *                type: integer
     *              name:
     *                type: string
     *              mime_type:
     *                type: string
     *      required:
     *        - page
     *        - perPage
     *      example:
     *        object: list
     *        id: 2225223,
     *        uuid: 9fffefyk-d1c9-24e5-92CC-0242ac140003,
     *        asset: illustration,
     *        name: lady with dog,
     *        slug: lady-with-dog-2686534,
     *        urls: {
     *          thumb: https://cdni.iconscoutmails.com/illustration/free/thumb/lady-with-DOG-222222-222222.png,
     *          original: https://d2g16cura83u2t.cloudfront.net/illustration/free/original/222222.png?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkMmcxNmN1cmE4M3UydC5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTY0NTE0MjQwMCwicSI6bnVsbCwiaWF0IjoxNjQ0OTQyNTc4fQ__.5b4d304f322222214f0cc8f2cf9222222ce262660189752222228e00c,
     *          svg: https://d2g16cura83u2t.cloudfront.net/illustration/free/additional-file/222222/0.svg?token=eyJhbGciOiJoczI1NiIsImtpZCI6ImRlZmF1bHQifQ__.eyJpc3MiOiJkMmcxNmN1cmE4M3UydC5jbG91ZGZyb250Lm5ldCIsImV4cCI6MTY0NTIwMTc3OCwicSI6bnVsbCwiaWF0IjoxNjQ0OTQyNTc4fQ__.e6080f2069822222223c2298da0d12222224de6222222bb00afcfbb
     *        }
     *        color_codes: [
     *          {
     *              decimal_color: 15120054,
     *              color_id: 1182
     *          }
     *        ]
     *        formats: [
     *          {
     *              id: 2,
     *              name: svg,
     *              mime_type: image/svg+xml
     *          },
     *          {
     *              id: 3,
     *              name: png,
     *              mime_type: image/png
     *          }
     *        ]
     *
     *  parameters:
     *    queryName:
     *      in: query
     *      name: query
     *      required: true
     *      schema:
     *        type: string
     *        description: the name of the image
     *    page:
     *      in: query
     *      name: page
     *      required: true
     *      schema:
     *        type: integer
     *        description: page number
     *        default: 1
     *    limit:
     *      in: query
     *      name: perPage
     *      required: true
     *      schema:
     *        type: integer
     *        description: number of elements
     *        default: 10
     */

    /**
     * @swagger
     * tags:
     *  name: Resources
     *  description: Resources endpoint
     */

    /**
     * @swagger
     * /resources/pixabay:
     *  get:
     *    summary: Returns a list of pixabay
     *    tags: [Resources]
     *    parameters:
     *      - $ref: '#/components/parameters/queryName'
     *      - $ref: '#/components/parameters/page'
     *      - $ref: '#/components/parameters/limit'
     *    responses:
     *      200:
     *        description: return the pixabay
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Resource'
     *      500:
     *        description: Some server error
     */
    this.router.get("/resources/pixabay", this.handlers.getPixabayResources)

    this.router.get("/resources/pixabay/*", this.handlers.getPixabayResource)

    /**
     * @swagger
     * /resources/pexels:
     *  get:
     *    summary: Returns a list of pexels
     *    tags: [Resources]
     *    parameters:
     *      - $ref: '#/components/parameters/queryName'
     *      - $ref: '#/components/parameters/page'
     *      - $ref: '#/components/parameters/limit'
     *    responses:
     *      200:
     *        description: return the pexels
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Resource'
     *      500:
     *        description: Some server error
     */
    this.router.get("/resources/pexels", this.handlers.getPexelsResources)

    this.router.get("/resources/pexels/*", this.handlers.getPexelsResource)

    /**
     * @swagger
     * /resources/iconscout:
     *  get:
     *    summary: Returns a list of iconscouts
     *    tags: [Resources]
     *    parameters:
     *      - $ref: '#/components/parameters/queryName'
     *      - $ref: '#/components/parameters/page'
     *      - $ref: '#/components/parameters/limit'
     *    responses:
     *      200:
     *        description: the list of iconscouts
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Iconscout'
     *      500:
     *        description: Some server error
     */
    this.router.get("/resources/iconscout", this.handlers.getIconscoutResources)

    this.router.get("/resources/local/*", this.handlers.getLocalResource)
  }
}

export default ResourcesRouter
