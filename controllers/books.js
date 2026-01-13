import Book from "../Models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books) {
      return res.status(404).json({
        success: false,
      });
    }

    res.status(200).json({
      books,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        message: "Book id not found",
        success: false,
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "invalid book id",
        success: false,
      });
    }

    res.status(200).json({
      book,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(404).json({
        message: "missing details",
        success: false,
      });
    }

    const book = await Book.create({
      title,
      author,
      year,
    });

    if (book) {
      res.status(201).json({
        message: "New book added successfully",
        success: true,
      });
    } else {
      return res.status(500).json({
        message: "add again",
        success: false,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        message: "Book is is not found",
        success: false,
      });
    }

    let book = await Book.findByIdAndUpdate(id, req.body);

    if (book) {
      res.status(200).json({
        message: "Book updated successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "Book id is not provided",
        success: false,
      });
    }

    await Book.findByIdAndDelete(id);

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
  }
};
