import { useReducer } from "react";

export function useSetState<T extends Record<string, any>>(initialValue: T) {
  const [state, setState] = useReducer(
    (state: T, newState: Partial<T>) => ({ ...state, ...newState }),
    initialValue
  );

  return [state, setState] as const;
}
