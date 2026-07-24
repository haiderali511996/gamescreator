import mongoose, { Schema, models, model } from "mongoose";

export interface ISubmitGame {
  _id: string;
  studioName: string;
  contactEmail: string;
  gameTitle: string;
  gameDescription: string;
  links?: string;
  status: "New" | "Reviewed" | "Contacted";
  createdAt: Date;
}

const SubmitGameSchema = new Schema<ISubmitGame>(
  {
    studioName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    gameTitle: { type: String, required: true },
    gameDescription: { type: String, required: true },
    links: { type: String },
    status: { type: String, enum: ["New", "Reviewed", "Contacted"], default: "New" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.SubmitGame as mongoose.Model<ISubmitGame>) ||
  model<ISubmitGame>("SubmitGame", SubmitGameSchema);
