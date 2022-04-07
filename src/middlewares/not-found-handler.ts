import { Request, Response, NextFunction } from "express"

function notFound(req: Request, res: Response, next: NextFunction) {
  console.log(req.path, req.method, req.params)
  console.log("NOT FOUND")
  next(new Error("Not found"))
}

export default notFound
