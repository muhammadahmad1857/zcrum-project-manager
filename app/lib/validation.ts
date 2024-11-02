import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(1, "The project name must be at least 2 characters long.")
    .max(100, "The project name must not exceed 100 characters."),
  key: z
    .string()
    .min(1, "The project key must be at least 2 characters long.")
    .max(100, "The project key must not exceed 100 characters."),
  description: z
    .string()
    .max(500, "The description must not exceed 500 characters.")
    .optional(),
});
