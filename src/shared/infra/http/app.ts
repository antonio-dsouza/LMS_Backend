import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import morgan from 'morgan'
import swaggerUi from "swagger-ui-express";
import { router } from "./routes";
import { urlencoded } from "body-parser";
import "@shared/container";
import { AppError } from "@shared/errors/AppError";

import swaggerFile from "../../../swagger.json";
import upload from "@config/upload";

const app = express();

app.use(morgan('dev'));
app.use(urlencoded({ extended: false}));
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app }