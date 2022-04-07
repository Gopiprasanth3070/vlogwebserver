import { Router } from "express"
import UploadsController from "./controller"

class UploadsRouter {
  router: Router
  handlers: UploadsController

  constructor() {
    this.router = Router()
    this.handlers = new UploadsController()
    this.init()
  }

  private init() {
    /**
     * @swagger
     * components:
     *  schemas:
     *    Upload:
     *      type: object
     *      properties:
     *        id:
     *          type: string
     *          description: the auto-generated id of upload
     *        userId:
     *          type: string
     *        url:
     *          type: string
     *        type:
     *          type: string
     *        name:
     *          type: string
     *        folder:
     *          type: string
     *        contentType:
     *          type: string
     *      required:
     *        - name
     *      example:
     *        id: 5TfRVQQR2kkVOaNLW16gE
     *        contentType: #null
     *        folder: /
     *        name: gqwrjBx12o.png
     *        type: #null
     *        url: https://ik.imagekit.io/scenify/gqwrjBx12o.png
     *        userId:
     *    UploadNotFound:
     *      type: object
     *      properties:
     *        msg:
     *          type: string
     *          description: A message for the not found upload
     *      example:
     *        msg: Upload was not found
     *
     *  parameters:
     *    uploadId:
     *      in: path
     *      name: id
     *      required: true
     *      schema:
     *        type: string
     *        description: the upload id
     */

    /**
     * @swagger
     * tags:
     *  name: Uploads
     *  description: Uploads endpoint
     */

    /**
     * @swagger
     * /uploads:
     *  post:
     *    summary: create a upload
     *    tags: [Uploads]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Upload'
     *    responses:
     *      200:
     *        description: the uploads was successfully created
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Upload'
     *      500:
     *        description: Some server error
     */
    this.router.post("/uploads", this.handlers.create)

    /**
     * @swagger
     * /uploads:
     *  get:
     *    summary: Returns a list of uploads
     *    tags: [Uploads]
     *    responses:
     *      200:
     *        description: the list of uploads
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *                $ref: '#/components/schemas/Upload'
     *      500:
     *        description: Some server error
     */
    this.router.get("/uploads", this.handlers.get)

    /**
     * @swagger
     * /uploads:
     *  put:
     *    summary: Update a upload by Id
     *    tags: [Uploads]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/Upload'
     *    responses:
     *      200:
     *        description: the uploads was successfully updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Upload'
     *      404:
     *        description: the upload was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/UploadNotFound'
     */
    this.router.put("/uploads", this.handlers.update)

    /**
     * @swagger
     * /uploads/{id}:
     *  delete:
     *    summary: delete a upload by Id
     *    tags: [Uploads]
     *    parameters:
     *      - $ref: '#/components/parameters/uploadId'
     *    responses:
     *      200:
     *        description: return the upload
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Upload'
     *      404:
     *        description: the upload was not found
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/UploadNotFound'
     */
    this.router.delete("/uploads/:id", this.handlers.deleteUpload)
  }
}

export default UploadsRouter

/*
{
      "contentType": "",
      "folder": "/",
      "name": "gWfojBxe9o.png",
      "type": "",
      "url": "https://ik.imagekit.io/scenify/gWfojBxe9o.png",
      "userId": "",
      "id": "5TdnkFRj2kkVOaNLW16gE"
    }
*/
