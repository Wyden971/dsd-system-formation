import { Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";
import CountryFlag from "react-native-country-flag";
import { memo, useEffect, useState } from "react";

export type Props = {
  name: string;
  code: string;
  active?: boolean;
  onPress: () => void;
};

export const CountryItem = memo(
  ({ name, code, active, onPress }: Props) => {
    const [isActive, setIsActive] = useState(active);

    useEffect(() => {
      setIsActive(active);
    }, [active]);
    return (
      <TouchableOpacity
        onPress={() => {
          onPress();
          setIsActive(true);
        }}
      >
        <View
          className={"bg-white flex flex-row items-center gap-x-2 p-4 h-[70px]"}
        >
          <CountryFlag isoCode={code} size={25} />
          <Text className={"flex-1 text-xl"}>{name}</Text>
          {isActive && (
            <Iconify
              icon={"mdi:check-circle-outline"}
              size={25}
              color={"limegreen"}
            />
          )}
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => prevProps.active === nextProps.active
);
