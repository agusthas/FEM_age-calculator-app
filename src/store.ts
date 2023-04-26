import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type Age = {
  years: number;
  months: number;
  days: number;
};

type AgeState = {
  age: Age;
  setAge: (age: Age) => void;
};

export const useAgeStore = create<AgeState>()(
  devtools((set) => ({
    age: {
      years: 0,
      months: 0,
      days: 0,
    },
    setAge: ({ years, months, days }: Age) =>
      set({ age: { years, months, days } }),
  }))
);
