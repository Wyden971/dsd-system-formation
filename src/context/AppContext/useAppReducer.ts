import { isValidElement, useEffect, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TAppContext } from "./AppContext";
import { client } from "@/services/api";
import { useSQLiteContext } from "expo-sqlite";
import { AppContextValue } from "@/context/AppContext/AppContext";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";

enum AppActions {
  SET_ACTIVE_LANGUAGE = "SET_ACTIVE_LANGUAGE",
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
}

type TAction = {
  type: AppActions;
  [name: string]: any;
};
export function useAppReducer() {
  AppContextValue.db = useSQLiteContext();
  useDrizzleStudio(AppContextValue.db);
  const [isReady, setIsReady] = useState(false);
  const [state, dispatch] = useReducer(
    (state: TAppContext, action: TAction) => {
      switch (action.type) {
        case AppActions.SET_ACTIVE_LANGUAGE:
          return {
            ...state,
            activeLanguage: action.language,
          };
        case AppActions.SET_ACCESS_TOKEN:
          return {
            ...state,
            accessToken: action.accessToken,
          };
      }
      return {
        ...state,
      };
    },
    {
      ...AppContextValue,
      activeLanguage: "fr",
      setActiveLanguage: (language: string) => {
        dispatch({
          type: AppActions.SET_ACTIVE_LANGUAGE,
          language,
        });
      },

      accessToken: null,
      setAccessToken: (accessToken: string | null) => {
        dispatch({
          type: AppActions.SET_ACCESS_TOKEN,
          accessToken,
        });
      },
    }
  );

  useEffect(() => {
    AsyncStorage.getItem("@app_context")
      .then((data) => {
        try {
          const context = JSON.parse(data!) ?? {};
          Object.assign(state, context);
        } catch (e) {}
      })
      .finally(() => setIsReady(true));
  }, []);

  useEffect(() => {
    if (isReady) {
      AsyncStorage.setItem(
        "@app_context",
        JSON.stringify({
          activeLanguage: state.activeLanguage,
          accessToken: state.accessToken,
        })
      );
    }
  }, [state.activeLanguage, state.accessToken, isReady]);

  return [isReady, state, dispatch] as const;
}
