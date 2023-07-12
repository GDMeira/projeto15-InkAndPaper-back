import { Router } from "express";
import testRouter from "./teste.route.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.use(testRouter);
router.use(authRouter)

export default router;