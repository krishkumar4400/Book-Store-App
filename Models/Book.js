import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "Book title is required"],
      trim: true,
      maxLength: [100, "Book title cannot be more than 100 characters"],
    },
    author: {
      type: String,
      require: [true, "Author name is required"],
      trim: true,
    },
    year: {
      type: Number,
      require: [true, "Publication year is required"],
      min: [1000, "Year must be atleast 1000"],
      max: [new Date().getFullYear(), "Year cannot be in the future"],
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model.book || mongoose.model("book", bookSchema);

export default Book;
