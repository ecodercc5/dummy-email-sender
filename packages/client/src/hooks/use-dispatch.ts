import { useAppStore } from "./use-app-store";

export const useDispatch = () => {
  return useAppStore((state) => state.dispatch);
};
