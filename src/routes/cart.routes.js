import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { addToCart, getCartItemsByUserId, removeCartItem } from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.get("/cart/items", tokenValidation, getCartItemsByUserId);
cartRouter.post("/post-cart/:id", tokenValidation, addToCart);
cartRouter.delete("/cart/items", tokenValidation, removeCartItem );


export default cartRouter;
