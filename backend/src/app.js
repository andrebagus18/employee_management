import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./routes/route.js";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/department", router);
app.use("/api", router);

export default app;
