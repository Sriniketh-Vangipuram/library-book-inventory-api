import { bookService } from "../services/book.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { BOOK_MESSAGES } from "../constants/messages.js";
import { analytics } from "../utils/analytics.js";
import { ANALYTICS_EVENTS } from "../constants/analytics.js";


const getAll = asyncHandler(async (req, res) => {
  const books = await bookService.getAll();

  const message =
    books.length === 0
      ? BOOK_MESSAGES.NO_BOOKS_FOUND
      : BOOK_MESSAGES.FETCH_SUCCESS;

  return successResponse(
    res,
    HTTP_STATUS.OK,
    message,
    books
  );
});

const getById = asyncHandler(async (req, res) => {
  const book = await bookService.getById(req.params.id);

  return successResponse(
    res,
    HTTP_STATUS.OK,
    BOOK_MESSAGES.FETCH_SUCCESS,
    book
  );
});

const create = asyncHandler(async (req, res) => {
  const book = await bookService.create(req.body);

  analytics.track(
    ANALYTICS_EVENTS.CREATE_BOOK,
    req.requestId
  );

  return successResponse(
    res,
    HTTP_STATUS.CREATED,
    BOOK_MESSAGES.CREATED,
    book
  );
});

const update = asyncHandler(async (req, res) => {
  const book = await bookService.update(
    req.params.id,
    req.body
  );

  analytics.track(
    ANALYTICS_EVENTS.UPDATE_BOOK,
    req.requestId
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    BOOK_MESSAGES.UPDATED,
    book
  );
});

const remove = asyncHandler(async (req, res) => {
  const book = await bookService.delete(req.params.id);

  analytics.track(
    ANALYTICS_EVENTS.DELETE_BOOK,
    req.requestId
  );

  return successResponse(
    res,
    HTTP_STATUS.OK,
    BOOK_MESSAGES.DELETED,
    book
  );
});

export const bookController = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};