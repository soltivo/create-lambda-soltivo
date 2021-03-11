import * as Validation from "../utils/validation";

/**
 * Already setup to prevent CORS issue with your lambda code.
 */
export const headers = {
    "Access-Control-Allow-Headers": "Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token, Orgid",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE",
};

export const getHeaderValidationResponse = (errors: any[], message: string): object => {
    return {
        headers,
        statusCode: 422,
        body: JSON.stringify({
            error: {
                code: 422,
                message: message,
                errors: Validation.formatErrors(errors, "HeaderValidationException"),
            },
        }),
    };
};

export const getBodyValidationResponse = (errors: any[], message: string): object => {
    return {
        headers,
        statusCode: 422,
        body: JSON.stringify({
            error: {
                code: 422,
                message: message,
                errors: Validation.formatErrors(errors, "UnprocessableEntityException"),
            },
        }),
    };
};

export const getExceptionResponse = (error: any, message: string): object => {
    console.error("[LOGIC EXCEPTION] Error: ", error);

    const errorCode = error.statusCode || 500;
    return {
        headers,
        statusCode: errorCode,
        body: JSON.stringify({
            error: {
                code: errorCode,
                message: message,
                errors: [
                    {
                        domain: process.env.SERVICE_NAME,
                        reason: error.code,
                        message: `${error.message}`,
                    },
                ],
            },
        }),
    };
};

export const getSuccessResponse = (message: string, data?: any): object => {
    if (data) {
        return {
            headers: headers,
            statusCode: 200,
            body: JSON.stringify({
                code: 200,
                message: message,
                data: data,
            }),
        };
    }
    return {
        headers: headers,
        statusCode: 200,
        body: JSON.stringify({
            code: 200,
            message: message,
        }),
    };
};
