import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { Tina } from "./modal";

const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(function (_req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization, title, body"
  );
  next();
});

mongoose.connect(
  "mongodb://localhost:27017/tina",
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("🚀 Server is connected to MongoDB.");
  }
);

app.listen(3001, () => {
  console.log(`🚀 Server listening on port:${3001}`);
});

app.get("/", async (_req: Request, res: Response) => {
  const data = await Tina.find({});
  res.json({ title: data[0].title, body: data[0].body });
});

app.post("/", async (req: Request, res: Response) => {
  const title = req.body.title as string;
  const body = req.body.body as string;
  if (title !== undefined && body !== undefined) {
    mongoose.connection.collections["tinas"].drop();
    const data = Tina.build({
      title,
      body,
    });
    await data.save();
    res.status(200).json(data);
    return;
  }
  res.status(500);
  return;
});
