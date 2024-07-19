import { useAppContext } from "@/context";
import { countries } from "countries-list";
import { useMemo } from "react";
export const useActiveLanguage = () => {
  const appContext = useAppContext();
  return useMemo(() => {
    const country =
      countries[
        appContext.activeLanguage.toUpperCase() as keyof typeof countries
      ];
    return {
      ...country,
      code: appContext.activeLanguage,
    };
  }, [appContext.activeLanguage]);
};
