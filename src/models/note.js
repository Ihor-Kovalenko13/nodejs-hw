import mongoose from "mongoose";
import { TAGS } from "../constants/tags.js";

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      trim: true,
      default: ""
    },
    tag: {
      type: String,
      enum: TAGS,
      default: "Todo"
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

noteSchema.index(
  { title: 'text', content: 'text' },
  {
    name: 'NoteTextIndex',
    weights: { title: 1, content: 2 },
    default_language: 'english',
  }
);

export const Note = mongoose.model("Note", noteSchema);