import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerdoc from "swagger-jsdoc";
import "express-async-errors";
import colors from "colors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import xss from "xss-clean";
import mangoSanitize from "express-mongo-sanitize";
import connectdb from "./config/db.js";
import testRoute from "./routes/testRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobsRoute from "./routes/jobsRoute.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
dotenv.config();
connectdb();
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job portal",
      description: "Node expressjs job portal application",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const spec = swaggerdoc(options);
const app = express();
app.use(express.json());
app.use(xss());
app.use(cors());
app.use(mangoSanitize());
app.use(morgan("dev"));
app.use(helmet());

app.use("/api/v1/test", testRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobsRoute);
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(spec));
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on port no ${PORT}`
      .bgCyan.white
  );
});
