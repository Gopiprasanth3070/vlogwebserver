import { Router } from "express"
import FontsController from "./controller"

class FontsRouter {
  router: Router
  handlers: FontsController

  constructor() {
    this.router = Router()
    this.handlers = new FontsController()
    this.init()
  }

  private init() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Font:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of fonts
     *        family:
     *          type: string
     *        version:
     *          type: string
     *        lastModified:
     *          type: string
     *        category:
     *          type: string
     *        kind:
     *          type: string
     *        files:
     *          type: object
     *          description: the description of the files
     *          properties:
     *            regular:
     *              type: string
     *            italic:
     *              type: string
     *        variants:
     *          type: array
     *          items:
     *            type: string
     *        subsets:
     *          type: array
     *          items:
     *            type: string
     *      required:
     *        - family
     *        - version
     *      example:
     *        id: D1sLEIe0mtE2fhymJiuTgu6e
     *        family: ACeeZee
     *        version: v14
     *        variants: [
     *          regular,
     *          italic
     *        ]
     *        files: {
     *          regular: https://fonts.gstatic.com/t/aceezee/v14/esDR31xSF-5AGleN6tKukbcHCpE.ttf,
     *          italic: https://fonts.gstatic.com/t/aceezee/v14/esDT31xSF-5AGleN2tCklZUCGpG-GQ.ttf
     *        }
     *        category: sans-serif
     *        kind: webfonts#webfont
     */

    /**
     * @swagger
     * tags:
     *  name: Fonts
     *  description: Fonts endpoint
     */

    /**
     * @swagger
     * /fonts:
     *  get:
     *    summary: Retrieve list of Fonts
     *    tags: [Fonts]
     *    responses:
     *      200:
     *        description: Return list of Fonts
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Font'
     *      500:
     *        description: Some server error
     */
    this.router.get("/fonts", this.handlers.getFonts)
  }
}

export default FontsRouter
