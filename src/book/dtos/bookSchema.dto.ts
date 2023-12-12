import * as Joi from "joi";

export const BookSchema = Joi.object({
    title: Joi.string().required().pattern(/^[a-zA-Z0-9\-\s]*$/).max(60),
    author: Joi.string(),
    publishDate: Joi.date().iso(),
    summary: Joi.string()
}).options({
    abortEarly: true,
});