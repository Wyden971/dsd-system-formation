import { ReactNode, useEffect } from "react";
import { useAppReducer } from "./useAppReducer";
import { UserContext } from "../UserContext";
import { AppContext } from "./AppContext";
import { client } from "@/services/api";

export type Props = {
  children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [isReady, state] = useAppReducer();

  useEffect(() => {
    client.defaults.headers.common.Authorization = state.accessToken?.length
      ? `bearer ${state.accessToken}`
      : null;
  }, [state.accessToken]);

  useEffect(() => {
    const interceptorId = client.interceptors.response.use((response) => {
      switch (response.status) {
        case 401:
          /**x
           * or
           * return client.getRefreshToken({refreshToken: ''})
           * .then(() => client.request(response.config))
           */
          break;
      }
      return response;
    });

    return () => {
      client.interceptors.response.eject(interceptorId);
    };
  }, []);

  if (!isReady) {
    return null;
  }
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
