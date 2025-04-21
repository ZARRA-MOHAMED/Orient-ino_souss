// **DEPENDENCIES**

// --top-level-- //
import dotenv from "dotenv";
import express from "express";

// --security--
import cors from "cors";
import helmet from "helmet";

// --requestHandlers--
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// --logger--
import morgan from "morgan";

// --imports--
import loggerApp from "./utils/logger";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute";
import { Diagnostique } from "./models/diagnostiqueModel";
import connectDB from "./config/db";
import calculateTraits from "./services/oceanSevice";
import path from "path";
import { School } from "./models/schoolModel";
import diagnosticRoute from "../src/routes/diagRoute";
import CareerRoute from "./routes/careerRoutes";
import schoolRoutes from "./routes/schoolRoute";
import careerRoutes from "./routes/careerRoute";
import questionRoutes from "./routes/questionRoute";
import resultRoutes from "./routes/resultRoutes";

// *********
// **VARIABLES**
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const morganFormat = ":method :url :status :response-time ms";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

// *********
// **MIDDLEWARES**
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());

// --req-middleware--
app.use(bodyParser.json({ limit: "16kb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --logger--
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logParts = message.split(" ");
        const logObject = {
          method: logParts[0],
          url: logParts[1],
          status: logParts[2],
          responseTime: logParts[3],
        };
        loggerApp.info(JSON.stringify(logObject));
      },
    },
  })
);

// *********
// CONNECTION

connectDB();

// *********
// ROUTES

app.use("/auth", authRoute);
app.use("/", diagnosticRoute);
app.use("/", CareerRoute);
app.use("/api/auth", authRoute);
app.use("/api/schools", schoolRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/diagnostic", diagnosticRoute);
app.use("/api/results", resultRoutes);
app.use("/api", questionRoutes);

//   res.status(201).send('Success ✅')
// });
app.use('/diagnostics',diagnosticRoute)
app.use('/',CareerRoute)
app.use('/api/auth', authRoute);
app.use('/api/schools', schoolRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/diagnostic', diagnosticRoute);
app.use('/api/results', resultRoutes);
app.use('/api', questionRoutes);
// *********
// EXECUTION

app.listen(PORT, () => {
  console.log(`Server running at port: http://localhost:${PORT} 🍵`);
});
