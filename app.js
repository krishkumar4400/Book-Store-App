import express from "express";

const app = express();

app.use(express.json());

const books = [
  {
    id: 1,
    name: "book 1",
    isPublished: true,
  },
  {
    id: 2,
    name: "book 2",
    isPublished: false,
  },
  {
    id: 3,
    name: "book 3",
    isPublished: true,
  },
  {
    id: 4,
    name: "book 4",
    isPublished: false,
  },
];

app.get("/", (req, res) => {
  res.send("The book store app");
});

app.get("/books", (req, res) => {
  res.json({ books });
});

app.get("/books/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((book) => {
    return book.id === parseInt(id);
  });
  if (!book) {
    return res.status(404).json({
      message: "Book not found",
      success: false,
    });
  }
  res.json({ book });
});

const port = 3000;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
