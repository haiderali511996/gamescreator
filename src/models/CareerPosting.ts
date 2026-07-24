import mongoose, { Schema, models, model } from "mongoose";

export interface ICareerPosting {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  applyEmail?: string;
  applyLink?: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CareerPostingSchema = new Schema<ICareerPosting>(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Remote"],
      default: "Full-time",
    },
    description: { type: String, required: true },
    requirements: { type: [String], default: [] },
    applyEmail: { type: String },
    applyLink: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default (models.CareerPosting as mongoose.Model<ICareerPosting>) ||
  model<ICareerPosting>("CareerPosting", CareerPostingSchema);
