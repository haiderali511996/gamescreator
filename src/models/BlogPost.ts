import mongoose, { Schema, models, model } from "mongoose";

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, required: true, default: "Games Creator Team" },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: true },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default (models.BlogPost as mongoose.Model<IBlogPost>) ||
  model<IBlogPost>("BlogPost", BlogPostSchema);
