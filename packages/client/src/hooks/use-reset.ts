import { ActionType } from "./use-app-store";
import { useDispatch } from "./use-dispatch";

export const useReset = () => {
  const dispatch = useDispatch();

  const reset = () =>
    dispatch({
      type: ActionType.Reset,
    });

  return reset;
};
