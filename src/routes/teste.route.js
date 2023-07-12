import { Router } from "express";
import { getTests, postTest } from "../controllers/test.controller.js";


const testRouter = Router();

testRouter.post('/post-test', postTest);
testRouter.get('/get-tests', getTests);

export default testRouter;