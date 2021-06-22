import mongoose from "mongoose";

interface ITina {
  title: string;
  body: string;
}

interface TinaDoc extends mongoose.Document {
  title: string;
  body: string;
}

interface tinaModalInterface extends mongoose.Model<any> {
  build(attr: ITina): TinaDoc;
}

const TineSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

TineSchema.statics.build = (attr: ITina) => {
  return new Tina(attr);
};

export const Tina = mongoose.model<any, tinaModalInterface>("Tina", TineSchema);
