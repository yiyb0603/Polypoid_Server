import { Request, Response } from 'express';

export default (request: any, response: Response, schema: any): boolean => {
	const validation = schema.validate(request.body);

	if (validation.error) {
    response.status(400).json({
      status: 400,
      message: "검증 오류입니다.",
    });

		return false;
	}
	return true;
};
