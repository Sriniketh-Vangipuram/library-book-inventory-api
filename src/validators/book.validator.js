import {z} from "zod";

export const createBookSchema=z.object({
    title:z
        .string()
        .trim()
        .min(1,"Title is required.")
        .max(200,"Title cannot exceed 200 characters."),
    author:z
        .string()
        .trim()
        .min(1,"Author is required.")
        .max(100,"Author cannot exceed 100 characters."),
    isbn:z
        .string()
        .trim()
        .regex(
            /^(97(8|9))?\d{9}(\d|X)$/,
            "Invalid ISBN."
        ),
    category:z
        .string()
        .trim()
        .min(1,"Category is required.")
        .max(100,"Category cannot exceed 100 characters."),
    available:z
        .boolean()
        .optional(),
});

export const updateBookSchema=createBookSchema.partial();