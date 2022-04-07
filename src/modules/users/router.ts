import { Router } from "express"
import UsersController from "./controller"

class UsersRouter {
  router: Router
  handlers: UsersController

  constructor() {
    this.router = Router()
    this.handlers = new UsersController()
    this.init()
  }

  private init() {
    /**
     * @swagger
     * /users:
     *  post:
     *    summary: create a user
     *    tags: [Users]
     *    responses:
     *      200:
     *        description: new user
     */
    this.router.post("/users", this.handlers.createUser)

    this.router.post("/tokens", this.handlers.createToken)
  }
}

export default UsersRouter
