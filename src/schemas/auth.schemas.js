import joi from "joi";

//schema de signUp aqui

  export const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(3),
  });
  