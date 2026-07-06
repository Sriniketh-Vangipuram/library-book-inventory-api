import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_FILE_PATH = path.join(__dirname, "../data/books.json");

const readBooks = async () => {
  try {
    const data = await fs.readFile(BOOKS_FILE_PATH, "utf-8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeBooks([]);
      return [];
    }

    throw error;
  }
};

const writeBooks = async (books) => {
  await fs.writeFile(
    BOOKS_FILE_PATH,
    JSON.stringify(books, null, 2),
    "utf-8"
  );
};

const findAll = async () => {
  return await readBooks();
};

const findById = async (id) => {
  const books = await readBooks();

  return books.find((book) => book.id === id) ?? null;
};

const findByIsbn = async (isbn) => {
  const books = await readBooks();

  return books.find((book) => book.isbn === isbn) ?? null;
};


const create = async (book) => {
  const books = await readBooks();

  books.push(book);

  await writeBooks(books);

  return book;
};

const update = async (updatedBook) => {
  const books = await readBooks();

  const index = books.findIndex(
    (book) => book.id === updatedBook.id
  );

  if (index === -1) {
    return null;
  }

  books[index] = updatedBook;

  await writeBooks(books);

  return books[index];
};

const remove = async (id) => {
  const books = await readBooks();

  const filteredBooks = books.filter(
    (book) => book.id !== id
  );

  if (filteredBooks.length === books.length) {
    return false;
  }

  await writeBooks(filteredBooks);

  return true;
};

export const bookRepository = {
  findAll,
  findById,
  findByIsbn,
  create,
  update,
  delete: remove,
};