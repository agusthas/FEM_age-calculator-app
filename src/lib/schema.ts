import { z } from "zod";

export const dobFormSchema = z.object({
  day: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return num >= 1 && num <= 31;
      },
      { message: "Invalid day" }
    )
    .transform(Number),
  month: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        return num >= 1 && num <= 12;
      },
      { message: "Invalid month" }
    )
    .transform(Number),
  year: z
    .string()
    .refine(
      (val) => {
        const num = Number(val);
        const now = new Date();
        return num >= 1900 && num <= now.getFullYear();
      },
      { message: "Invalid year" }
    )
    .transform(Number),
});
