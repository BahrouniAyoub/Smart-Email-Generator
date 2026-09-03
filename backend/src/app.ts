import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRoutes from "./routes/authRoutes";
import emailRoutes from "./routes/emailRoutes";
import { errorHandler } from "./middleWare/errorMiddleware";

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/emails", emailRoutes);

app.use((req, res) => {
  res.status(404).json({
    error: {
      message: "Route not found.",
      code: "ROUTE_NOT_FOUND",
    },
  });
});

app.use(errorHandler);