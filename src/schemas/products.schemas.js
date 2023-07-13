import joi from "joi";

  export const productsSchema = joi.object({

  });

  export const postProductSchema = joi.object({
      title: joi.string().required(),
      description: joi.string().required(),
      image: joi.string().uri().required(),
      price: joi.number().min(0).precision(2).required(),
      quantityInStock: joi.number().min(1).required(),
      author: joi.string().required(),
      gender: joi.string().required(),
      publisher: joi.string().required(),
      year: joi.number().integer().min(0).required()
  });
