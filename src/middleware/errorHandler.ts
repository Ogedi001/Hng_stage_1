import { StatusCodes } from "http-status-codes";

import { Response, Request, NextFunction } from "express";
import { CustomError } from "../errors";
import Logger from "../utils/logger";
import {AxiosError} from 'axios'


export const errorHandlerMiddleware = async (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        Logger.error(err.serializeErrors());
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }

    
    if (err instanceof AxiosError) {
        const axiosError = err as AxiosError;
    
        if (axiosError.response) {
          Logger.error({
            message: "Axios error response",
            status: axiosError.response.status,
            data: axiosError.response.data,
          });
          return res.status(axiosError.response.status).json({
            errors: [
              {
                message: "Axios error response",
                details: axiosError.response.data,
              },
            ],
          });
        } else if (axiosError.request) {
          Logger.error({
            message: "No response received from Axios request",
            request: axiosError.request,
          });
          return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
            errors: [
              {
                message: "No response received from the external service.",
              },
            ],
          });
        } else {
          Logger.error({
            message: "Error setting up Axios request",
            error: axiosError.message,
          });
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: [
              {
                message:
                  "An error occurred while setting up the request to the external service.",
                details: axiosError.message,
              },
            ],
          });
        }
      }

    // Other uncaught errors
    Logger.error({
        message: "Internal server error",
        error: err.message,
    });
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: [{ message: err.message }],
    });
};
