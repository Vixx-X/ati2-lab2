import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import HttpException from "./models/http-exception.model";
import i18n from "i18n-express";
import path from "path";
import translate from "./utils/translate";

const app = express();

/**
 * App Configuration
 */

app.use(express.static(path.join(__dirname, "../../frontend/build")));

const allowedOrigins = [
  "https://ati2.lab2.vittorioadesso.com",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  i18n({
    translationsPath: path.join(__dirname, "i18n"), // <--- use here. Specify translations files path.
    siteLangs: ["en", "es"],
    textsVarName: "translation",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "API is running on /api" });
});

/* eslint-disable */
app.use(
  (
    err: Error | HttpException,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // @ts-ignore
    const trans = (text: string) => req.i18n_texts?.[text] ?? text;
    const msg = translate(trans, err.message);
    // @ts-ignore
    if (err && err.errorCode) {
      // @ts-ignore
      res.status(err.errorCode).json(msg);
    } else if (err) {
      res.status(500).json(msg);
    }
  }
);

/**
 * Server activation
 */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`server up in http://localhost:${PORT}`);
});
