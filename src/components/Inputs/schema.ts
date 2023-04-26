import { z } from "zod";

export const schema = z.object({
  day: z
    .string()
    .nonempty("This field is required")
    .refine((value) => {
      const day = parseInt(value);
      return day > 0 && day <= 31;
    }, "Must be a valid day")
    .transform((value) => parseInt(value)),
  month: z
    .string()
    .nonempty("This field is required")
    .refine((value) => {
      const month = parseInt(value);
      return month > 0 && month <= 12;
    }, "Must be a valid month")
    .transform((value) => parseInt(value)),
  year: z
    .string()
    .nonempty("This field is required")
    .refine((value) => {
      const year = parseInt(value);
      const now = new Date();
      return year > 0 && year <= now.getFullYear();
    }, "Must be in the past")
    .transform((value) => parseInt(value)),
});

export type DateFormData = z.infer<typeof schema>;
