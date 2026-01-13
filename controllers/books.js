import Book from "../Models/Book.js";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(200).json({
        success: true,
        books,
        message: "No books found",
      });
    }

    res.status(200).json({
      books,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "Book id is required",
        success: false,
      });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        message: "book not found",
        success: false,
      });
    }

    res.status(200).json({
      book,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Invalid MongoDB ID format",
    });
  }
};

export const addBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;

    if (!title || !author || !year) {
      return res.status(400).json({
        message: "All fields are required",
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
    res.status(500),
      json({
        success: false,
        message: error.message,
      });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true, // updated document return
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      success: true,
      updatedBook,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
