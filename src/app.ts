import "dotenv/config";
import "express-async-errors";
import express, { Request, Response, Application } from "express";
import { createServer } from "http";



import { StatusCodes } from "http-status-codes";


import Logger from "./utils/logger";
import { pageNotFound } from "./middleware/page-not-found";
import { errorHandlerMiddleware } from "./middleware/errorHandler";
import { ApplicationRoute } from "./routes";



const app: Application = express();



const server = createServer(app);
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const startServer = () => {

  app.get("/", (req: Request, res: Response) => {
    return res
      .status(StatusCodes.OK)
      .json({ message: "Welcome to HNG STAGE 1 Backend Api  🔥🔥🔥" });
  });

  
  app.use("/api", ApplicationRoute);


  app.use(errorHandlerMiddleware);
  app.use(pageNotFound);

  server.listen(PORT, () => {
    Logger.info(`App is running @localhost:${PORT}`);
  });

  const shutdown = () => {
    server.close(() => {
      Logger.info("Server is shut down");
      process.exit(0);
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
};

startServer();
