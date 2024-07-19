import { SQLiteDatabase } from "expo-sqlite";
import { createContext } from "react";

export type TAppContext = {
  db: SQLiteDatabase;

  activeLanguage: string;
  setActiveLanguage: (language: string) => void;

  accessToken?: string | null;
  setAccessToken: (token: string | null) => void;
};
export const AppContextValue = {} as TAppContext;
export const AppContext = createContext<TAppContext>(AppContextValue);
