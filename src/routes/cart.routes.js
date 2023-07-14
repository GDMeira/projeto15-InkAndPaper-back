import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { addToCart, getCartItemsByUserId } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/cart/items", tokenValidation, getCartItemsByUserId);
cartRouter.post("/post-cart/:id", tokenValidation, addToCart);


export default cartRouter;
