import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { signInSchema } from "../schemas/auth.schemas.js";
import { signIn } from "../controllers/auth.controllers.js";


const authRouter = Router()

authRouter.post("/sign-in", schemaValidation(signInSchema), signIn)

export default authRouter