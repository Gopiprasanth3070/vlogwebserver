import express, { Application } from "express"
import MongoDBConnection from "./common/database/connection"
import config from "./common/app-config"
import request from "request"
import TemplatesModule from "./modules/templates"
import ElementsModule from "./modules/elements"
import AuthModule from "./modules/auth"
import UploadsModule from "./modules/uploads"
import UsersModule from "./modules/users"
import FontsModule from "./modules/fonts"
import CreationsModule from "./modules/creations"
import ResourcesModule from "./modules/resources"
import errorHandler from "./middlewares/error-handler"
import notFound from "./middlewares/not-found-handler"

import cors from "cors"
import morgan from "morgan"

import "./core/designManager/objects"

// Swagger
import swaggerUI from "swagger-ui-express"
import swaggerJsDoc from "swagger-jsdoc"
import { swagger_doc } from "./swagger_doc"

class App {
  public app: Application
  constructor() {
    this.app = express()
  }
  public init() {
    this.app.use(cors())

    this.app.use(function (req, res, next) {
      res.header("Cross-Origin-Embedder-Policy", "require-corp")
      res.header("Cross-Origin-Opener-Policy", "cross-origin")
      res.header("Cross-Origin-Resource-Policy", "cross-origin")
      next()
    })

    this.app.use(morgan("dev"))
    this.app.use(express.json())

    this.initDatabaseClient()
    this.initRoutes()

    const specs = swaggerJsDoc(swagger_doc(config.proxyBase))
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))

    this.initMiddlewares()

    this.app.listen(config.appPort, () => console.log("running", config.appPort))
  }
  public initDatabaseClient() {
    MongoDBConnection.connect((err, db) => {
      console.log(err)
      if (db) {
        this.app.locals.db = db
      }
    })
  }
  public initRoutes() {
    new TemplatesModule(this.app)
    new ElementsModule(this.app)
    new AuthModule(this.app)
    new UploadsModule(this.app)
    new UsersModule(this.app)
    new FontsModule(this.app)
    new CreationsModule(this.app)
    new ResourcesModule(this.app)
  }
  private initMiddlewares() {
    this.app.use(notFound)
    this.app.use(errorHandler)
  }
}

const app = new App()

app.init()
