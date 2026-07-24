import mongoose, { Schema, models, model } from "mongoose";

export interface ITeamMember {
  _id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
  order: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    photo: { type: String },
    order: { type: Number, default: 0 },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
      github: { type: String },
    },
  },
  { timestamps: true }
);

export default (models.TeamMember as mongoose.Model<ITeamMember>) ||
  model<ITeamMember>("TeamMember", TeamMemberSchema);
