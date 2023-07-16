import { Router } from "express";
import { tokenValidation } from "../middlewares/tokenValidation.js";
import { postCheckOut } from "../controllers/checkout.controllers.js"

const checkoutRouter = Router();

checkoutRouter.post("/payment", tokenValidation, postCheckOut);

export default checkoutRouter;
