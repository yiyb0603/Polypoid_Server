import { Request, Response } from 'express';
import * as Joi from 'joi';
import { IPostTypes } from 'types/post';
import validate from './validate';

export const validateCreatePost = (request: Request | IPostTypes, response: Response) => {
  const scheme: Joi.ObjectSchema = Joi.object().keys({
    title: Joi.string().min(5).max(255).required(),
    contents: Joi.string().min(1).max(10000).required(),
    categoryIdx: Joi.number().integer().required(),
    writerId: Joi.string().required(),
    writerName: Joi.string().required(),
  });

  return validate(request, response, scheme);
}