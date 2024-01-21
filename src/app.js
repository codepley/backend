import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // read cors documentation for more configuration options
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(
  bodyParser.json({
    limit: "50mb"
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true
  })
);
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRouter from './routes/user.routes.js'

// routes declaration
app.use('/api/v1/users', userRouter)

export { app };
