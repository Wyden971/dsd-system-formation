import { isLoading } from "expo-font";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

export type Props = {
  label: string;
  onPress?: () => void;
  className?: string;
  color?: "normal" | "error" | "success";
  disabled?: boolean;
  isLoading?: boolean;
};

export const Button = ({
  label,
  onPress,
  className,
  color = "normal",
  disabled = false,
  isLoading = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        className={twMerge(
          "bg-blue-700 px-5 py-5 rounded-xl flex flex-row justify-center items-center",
          color === "normal" && "bg-blue-700",
          color === "error" && "bg-red-500",
          color === "success" && "bg-green-500",
          disabled && "opacity-50",
          className
        )}
      >
        <ActivityIndicator
          className={"absolute left-4"}
          animating={isLoading}
          hidesWhenStopped
          color={"#FFF"}
        />
        <Text className={twMerge("text-white text-center text-2xl")}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
