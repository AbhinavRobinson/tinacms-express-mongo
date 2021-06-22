import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.urlencoded({ extended: true }));

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

app.get("/", (_req: Request, res: Response) => {
  console.log("HELLO");
  res.json({ "Server Says": "Hello" });
});
