import mongoose, { Schema, models, model } from "mongoose";

export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin";
  createdAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.AdminUser as mongoose.Model<IAdminUser>) ||
  model<IAdminUser>("AdminUser", AdminUserSchema);
