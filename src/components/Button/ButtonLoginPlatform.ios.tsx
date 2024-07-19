import { Button, Props as ButtonProps } from "./Button";

export interface Props extends Omit<ButtonProps, "label"> {}
export const ButtonLoginPlatform = (props: Props) => {
  return <Button {...props} label={"Se connecter Apple"} />;
};
