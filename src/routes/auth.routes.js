import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { signIn, signUp } from "../controllers/auth.controllers.js";


const authRouter = Router()

authRouter.post("/sign-up", schemaValidation(signUpSchema), signUp)
authRouter.post("/sign-in", schemaValidation(signInSchema), signIn)

export default authRouter