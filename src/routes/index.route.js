import { Router } from "express";
import testRouter from "./teste.route.js";
import authRouter from "./auth.routes.js";
import productRouter from "./products.routes.js";

const router = Router();

router.use(testRouter);
router.use(authRouter)
router.use(productRouter)

export default router;