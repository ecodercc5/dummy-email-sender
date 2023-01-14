import { mutate } from "swr";

export const useClearCache = () => {
  // match all keys, set value in cache to undefined to remove them and not revalidate them
  const clearCache = () => mutate(() => true, undefined, { revalidate: false });
  return clearCache;
};
