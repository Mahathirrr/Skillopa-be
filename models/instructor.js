import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);
const { Schema } = mongoose;
const { ObjectId } = Schema;

const bankAccount = new Schema(
  {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const instructor = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    slug: { type: String, slug: "name", unique: true, slugPaddingSize: 4 },
    email: { type: String },
    headline: String,
    bio: String,
    avatar: {
      type: String,
      default: "/avatar.svg",
    },
    courses: { type: [ObjectId], ref: "Course" },
    social: {
      website: String,
      twitter: String,
      youtube: String,
      linkedin: String,
      facebook: String,
    },
    bankAccount: bankAccount,
    createdBy: { type: ObjectId, ref: "User" },
    meta: {
      enrollments: Number,
      totalReviews: Number,
      totalEarnings: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Instructor = mongoose.model("Instructor", instructor);
