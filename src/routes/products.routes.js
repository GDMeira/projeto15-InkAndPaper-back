import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { getProduct, postProduct, products } from "../controllers/products.controllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { postProductSchema } from "../schemas/products.schemas.js";


const productRouter = Router()

productRouter.post("/home", schemaValidation(), products)
productRouter.get("/home", schemaValidation(), products)
productRouter.get("/product/:id", tokenValidation, getProduct)
productRouter.post("/product", schemaValidation(postProductSchema), postProduct)

export default productRouter