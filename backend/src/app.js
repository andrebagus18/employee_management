import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/route.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/department", router);
app.use("/api", router);

export default app;
