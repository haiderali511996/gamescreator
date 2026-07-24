import mongoose, { Schema, models, model } from "mongoose";

export interface IContactSubmission {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Responded";
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ["New", "Read", "Responded"], default: "New" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.ContactSubmission as mongoose.Model<IContactSubmission>) ||
  model<IContactSubmission>("ContactSubmission", ContactSubmissionSchema);
