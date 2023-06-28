import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import initAuthRoute from "./routes/auth.routes";
import initUserRoute from "./routes/user.routes";
import connectDB from "./config/connectdb.config";

require("dotenv").config();
const morgan = require("morgan");
const app = express();

const port = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:3600",
};

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(corsOptions));

initAuthRoute(app);
initUserRoute(app);
connectDB();

app.get("/", (req, res) => {
  res.send("APP IS RUNNING");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
