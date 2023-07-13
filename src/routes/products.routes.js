import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { getProduct, postProduct, getProducts, addToCart } from "../controllers/products.controllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { postProductSchema } from "../schemas/products.schemas.js";


const productRouter = Router()

productRouter.get("/home", tokenValidation, getProducts)
productRouter.get("/product/:id", tokenValidation, getProduct)
productRouter.post("/product", schemaValidation(postProductSchema), postProduct)
productRouter.post("/product/:id/update-shopping-cart", tokenValidation, addToCart);

export default productRouter