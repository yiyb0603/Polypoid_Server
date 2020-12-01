import * as Joi from 'joi';
import { Request, Response } from 'express';
import validate from './validate';

export const validateSignIn = (request: any, response: Response) => {
	const scheme: Joi.ObjectSchema = Joi.object().keys({
		id: Joi.string().min(10).max(50).required(),
		password: Joi.string().min(5).max(100000).required(),
	});

	return validate(request, response, scheme);
};

export const validateSignUp = (request: any, response: Response) => {
  const scheme: Joi.ObjectSchema = Joi.object().keys({
		id: Joi.string().min(10).max(50).required(),
    password: Joi.string().min(5).max(100000).required(),
    name: Joi.string().min(1).max(50).required(),
	});

	return validate(request, response, scheme);
}