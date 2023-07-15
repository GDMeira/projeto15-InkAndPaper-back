import { Router } from "express";
import {schemaValidation} from "../middlewares/schemaValidation.js"
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { logout, signIn, signInByGoogle, signUp } from "../controllers/auth.controllers.js";
import { tokenValidation } from "../middlewares/tokenValidation.js";

const authRouter = Router()

authRouter.post("/sign-up", schemaValidation(signUpSchema), signUp)
authRouter.post("/sign-in", schemaValidation(signInSchema), signIn)
authRouter.post('/sign-in/google', signInByGoogle)
authRouter.delete('/logout', tokenValidation, logout)

export default authRouter