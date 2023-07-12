import { Router } from "express";
import testRouter from "./teste.route.js";

const router = Router();

router.use(testRouter);

export default router;