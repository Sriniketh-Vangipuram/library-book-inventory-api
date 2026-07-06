import { v4 as uuid } from "uuid";

import { bookRepository } from "../repositories/book.repository.js";
import { ApiError } from "../utils/apiError.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { BOOK_MESSAGES } from "../constants/messages.js";

const getExistingBook = async (id) => {
  const book = await bookRepository.findById(id);

  if (!book) {
    throw new ApiError(
      HTTP_STATUS.NOT_FOUND,
      BOOK_MESSAGES.NOT_FOUND
    );
  }

  return book;
};

const ensureUniqueIsbn = async (isbn, currentBookId = null) => {
  const existingBook = await bookRepository.findByIsbn(isbn);

  if (
    existingBook &&
    existingBook.id !== currentBookId
  ) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      BOOK_MESSAGES.DUPLICATE_ISBN
    );
  }
};

const getAll = async () => {
  return await bookRepository.findAll();
};

const getById = async (id) => {
  return await getExistingBook(id);
};

const create = async (bookData) => {
  await ensureUniqueIsbn(bookData.isbn);

  const timestamp = new Date().toISOString();

  const book = {
    id: uuid(),
    ...bookData,
    available: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  return await bookRepository.create(book);
};


const update = async (id, updatedData) => {
  const existingBook = await getExistingBook(id);

  if (
    updatedData.isbn &&
    updatedData.isbn !== existingBook.isbn
  ) {
    await ensureUniqueIsbn(updatedData.isbn, id);
  }

  const updatedBook = {
    ...existingBook,
    ...updatedData,
    updatedAt: new Date().toISOString(),
  };

  return await bookRepository.update(updatedBook);
};

const remove = async (id) => {
  const existingBook = await getExistingBook(id);

  await bookRepository.delete(id);

  return existingBook;
};

export const bookService = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};