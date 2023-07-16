import { Router } from "express";
import authRouter from "./auth.routes.js";
import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import checkoutRouter from "./checkout.routes.js";

const router = Router();

router.use(authRouter)
router.use(productRouter)
router.use(cartRouter)
router.use(checkoutRouter)

export default router;