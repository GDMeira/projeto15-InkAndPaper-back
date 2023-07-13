import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { getProduct, products } from "../controllers/products.controllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";


const productRouter = Router()

productRouter.post("/home", schemaValidation(), products)
productRouter.get("/home", schemaValidation(), products)
productRouter.get("/product/:id", tokenValidation, getProduct)

export default productRouter