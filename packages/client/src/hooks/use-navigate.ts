import { ActionType } from "./use-app-store";
import { useDispatch } from "./use-dispatch";

export const useNavigate = () => {
  const dispatch = useDispatch();

  const next = () =>
    dispatch({
      type: ActionType.Next,
    });

  const back = () =>
    dispatch({
      type: ActionType.Back,
    });

  return [next, back] as const;
};
