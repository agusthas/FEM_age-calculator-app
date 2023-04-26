import { useDateForm } from "./hook";
import { Path, UseFormRegister } from "react-hook-form";
import { DateFormData } from "./schema";

const Input: React.FC<{
  label: Path<DateFormData>;
  placeholder: string;
  register: UseFormRegister<DateFormData>;
  error?: string;
}> = ({ label, placeholder, register, error }) => {
  return (
    <div className={`input-group ${error && "error"}`}>
      <label htmlFor="day">{label}</label>
      <input
        type="text"
        id="day"
        placeholder={placeholder}
        {...register(label)}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

const Inputs = () => {
  const { register, errors, onSubmit } = useDateForm();

  return (
    <form onSubmit={onSubmit}>
      <div className="inputs">
        <Input
          label="day"
          placeholder="DD"
          register={register}
          error={errors.day?.message}
        />
        <Input
          label="month"
          placeholder="MM"
          register={register}
          error={errors.month?.message}
        />
        <Input
          label="year"
          placeholder="YYYY"
          register={register}
          error={errors.year?.message}
        />
      </div>

      <div className="divider">
        <div className="line"></div>
        <button type="submit" className="btn-submit">
          <img src="/assets/images/icon-arrow.svg" alt="arrow" />
        </button>
      </div>
    </form>
  );
};

export default Inputs;
