import { useForm } from "react-hook-form";
import { z } from "zod";
import { AnimatedNumber } from "./components/animated-number";
import { useSetState } from "./hooks/use-set-state";
import { dobFormSchema } from "./lib/schema";
import { calculateAge, cn } from "./lib/utils";
import { useId } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type DOBFormValues = z.infer<typeof dobFormSchema>;

function App() {
  const id = useId();
  const [age, setAge] = useSetState({ days: 0, months: 0, years: 0 });

  const {
    register,
    formState: { errors },
    setError: setFormError,
    handleSubmit,
  } = useForm<DOBFormValues>({
    resolver: zodResolver(dobFormSchema),
  });

  const onSubmit = (data: DOBFormValues) => {
    const [isValidAge, result] = calculateAge(data.day, data.month, data.year);
    if (!isValidAge) {
      setFormError("day", { message: result });
      setFormError("month", { message: result });
      setFormError("year", { message: result });
      return;
    }

    setAge(result);
  };
  return (
    <main className="main-grid">
      <h1 className="visually-hidden">Age calculator app</h1>
      <div className="calculator">
        <form id={id} onSubmit={handleSubmit(onSubmit)}>
          <div className="calculator-form">
            <div className={cn("form-group", errors.day && "error")}>
              <label htmlFor="day">Day</label>
              <input
                type="text"
                id="day"
                placeholder="DD"
                {...register("day")}
              />
              {errors.day && (
                <span className="invalid-feedback">{errors.day.message}</span>
              )}
            </div>
            <div className={cn("form-group", errors.month && "error")}>
              <label htmlFor="month">Month</label>
              <input
                type="text"
                id="month"
                placeholder="MM"
                {...register("month")}
              />
              {errors.month && (
                <span className="invalid-feedback">{errors.month.message}</span>
              )}
            </div>
            <div className={cn("form-group", errors.year && "error")}>
              <label htmlFor="year">Year</label>
              <input
                type="text"
                id="year"
                placeholder="YYYY"
                {...register("year")}
              />
              {errors.year && (
                <span className="invalid-feedback">{errors.year.message}</span>
              )}
            </div>
          </div>
        </form>

        <div className="divider">
          <button type="submit" form={id}>
            <img src="/assets/images/icon-arrow.svg" alt="arrow" />
          </button>
        </div>

        <div className="calculator-result">
          <p>
            <AnimatedNumber end={age.years} /> years
          </p>
          <p>
            <AnimatedNumber end={age.months} /> months
          </p>
          <p>
            <AnimatedNumber end={age.days} /> days
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;
