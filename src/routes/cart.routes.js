import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { addToCart } from "../controllers/cart.controllers.js";



const cartRouter = Router()

cartRouter.post("/product/:id/update-shopping-cart", tokenValidation, addToCart);

export default cartRouter