import mongoose, { Schema, models, model } from "mongoose";

export interface IGame {
  _id: string;
  title: string;
  slug: string;
  description: string;
  coverImage?: string;
  screenshots: string[];
  platform: string[];
  genre: string[];
  status: "In Development" | "Released" | "Coming Soon";
  releaseDate?: Date;
  trailerUrl?: string;
  storeLinks?: {
    steam?: string;
    appStore?: string;
    playStore?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    coverImage: { type: String },
    screenshots: { type: [String], default: [] },
    platform: { type: [String], default: [] },
    genre: { type: [String], default: [] },
    status: {
      type: String,
      enum: ["In Development", "Released", "Coming Soon"],
      default: "In Development",
    },
    releaseDate: { type: Date },
    trailerUrl: { type: String },
    storeLinks: {
      steam: { type: String },
      appStore: { type: String },
      playStore: { type: String },
    },
  },
  { timestamps: true }
);

export default (models.Game as mongoose.Model<IGame>) || model<IGame>("Game", GameSchema);
