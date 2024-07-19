import { useAppContext, useUserContext } from "@/context";
import { useURL, parse } from "expo-linking";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import app from "../../app.json";

export const useDeepLink = () => {
  const url = useURL();
  const router = useRouter();
  const appContext = useAppContext();
  const userContext = useUserContext();
  console.log("url : ", url);
  useEffect(() => {
    if (url && !!appContext.accessToken?.length) {
      const parsedUrl = parse(url);
      switch (parsedUrl.hostname) {
        case "user":
          userContext.getUsers().then(() => {
            router.push(url.replace(app.expo.scheme + "://", ""));
          });
          break;
      }
    }
  }, [url, appContext.accessToken]);
};
