import { useAppStore } from "./use-app-store";

export const useSheet = () => {
  return useAppStore((state) =>
    state.sheet.imported ? state.sheet.data : null
  );
};
