import { useAppContext } from "@/context";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

export type Props = {
  children: ReactNode;
  roles?: string[];
};
export const SecurePage = ({ children, roles }: Props) => {
  const appContext = useAppContext();

  if (!appContext.accessToken?.length) {
    return <Redirect href={"/login"} />;
  }

  return children;
};
