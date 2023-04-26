import { SubmitHandler, useForm } from "react-hook-form";
import { DateFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useAgeStore } from "../../store";

dayjs.extend(customParseFormat);

export const useDateForm = () => {
  const setAge = useAgeStore((state) => state.setAge);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<DateFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<DateFormData> = (data) => {
    if (
      !dayjs(
        `${data.year}-${data.month}-${data.day}`,
        "YYYY-M-D",
        true
      ).isValid()
    ) {
      setError("day", { message: "Invalid date" });
      setError("month", { message: "Invalid date" });
      setError("year", { message: "Invalid date" });
      return;
    }

    const now = dayjs();
    const birthdate = dayjs(`${data.year}-${data.month}-${data.day}`);

    let years = now.get("year") - birthdate.get("year");
    let months = now.get("month") - birthdate.get("month");
    let days = now.get("date") - birthdate.get("date");
    if (
      now.get("month") > birthdate.get("month") ||
      (now.get("month") === birthdate.get("month") &&
        now.get("date") >= birthdate.get("date"))
    ) {
      // do nothing
    } else {
      years -= 1;
    }

    if (months < 0) {
      months += 12;
    }

    if (days < 0) {
      days += birthdate.daysInMonth();
      months -= 1;
    }

    setAge({ years, months, days });
  };

  return {
    register,
    onSubmit: handleSubmit(onSubmit),
    errors,
  };
};
