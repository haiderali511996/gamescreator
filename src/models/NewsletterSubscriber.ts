import mongoose, { Schema, models, model } from "mongoose";

export interface INewsletterSubscriber {
  _id: string;
  email: string;
  subscribedAt: Date;
}

const NewsletterSubscriberSchema = new Schema<INewsletterSubscriber>({
  email: { type: String, required: true, unique: true },
  subscribedAt: { type: Date, default: Date.now },
});

export default (models.NewsletterSubscriber as mongoose.Model<INewsletterSubscriber>) ||
  model<INewsletterSubscriber>("NewsletterSubscriber", NewsletterSubscriberSchema);
