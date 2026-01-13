import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBookById, updateBook } from "../controllers/books.js";

const bookRouter = Router();

// routes
bookRouter.get('/books', getAllBooks);
bookRouter.get('/book/:id', getBookById);
bookRouter.post('/book', addBook);
bookRouter.put('/book/:id', updateBook);
bookRouter.delete('/book/:id', deleteBook);

export default bookRouter;