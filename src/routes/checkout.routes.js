import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { postCheckOut, getCheckoutItems } from "../controllers/checkout.controllers.js"

const checkoutRouter = Router();

checkoutRouter.post("/payment", tokenValidation, postCheckOut);
checkoutRouter.get("/checkout", tokenValidation, getCheckoutItems );

export default checkoutRouter;
