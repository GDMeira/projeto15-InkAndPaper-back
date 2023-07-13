import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { product, products } from "../controllers/products.controllers.js";


const productRouter = Router()

productRouter.post("/home", schemaValidation(), products)
productRouter.get("/home", schemaValidation(), products)
productRouter.get("/product/:id", schemaValidation(), product )

export default productRouter