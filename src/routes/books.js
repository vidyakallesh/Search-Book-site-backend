import express from 'express';
import { BookModel } from '../models/BooksSchema.js';
import { UserModel } from '../models/UsersSchema.js';

const router = express.Router();

router.put("/savedbooks/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { title, description, authors, imageLink } = req.body;

    const existingBook = await BookModel.findOne({ title, userID: { $ne: userId } });

    if (existingBook) {
      return res.status(400).json({ error: 'Book with the same title already exists' });
    }

    const book = new BookModel({ title, description, authors, imageLink, userID: userId });
    const savedBook = await book.save();

    const user = await UserModel.findById(userId);
    user.savedBooks.push(savedBook);
    await user.save();

    res.json({ savedBooks: user.savedBooks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get("/books/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await BookModel.find({ userID: userId });
    res.json({ savedBooks: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/books/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    await BookModel.findByIdAndDelete(bookId);
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



export { router as bookRouter };
