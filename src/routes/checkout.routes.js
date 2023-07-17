import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { postCheckOut, getCheckoutItems, getCheckoutLastItems } from "../controllers/checkout.controllers.js"

const checkoutRouter = Router();

checkoutRouter.post("/payment", tokenValidation, postCheckOut);
checkoutRouter.get("/checkout", tokenValidation, getCheckoutLastItems );
checkoutRouter.get("/myorders", tokenValidation, getCheckoutItems );

export default checkoutRouter;
