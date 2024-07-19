import { TextInput, View } from "react-native";
import { Iconify } from "react-native-iconify";
export type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchInput = ({ value, onChange }: Props) => {
  return (
    <View className={"px-4 py-2 bg-white"}>
      <View
        className={
          "pl-4 bg-gray-100 rounded-xl border-b-2 border-gray-100 flex flex-row items-center"
        }
      >
        <Iconify icon={"mdi:search"} size={25} color={"#000"} />
        <TextInput
          underlineColorAndroid={"transparent"}
          className={"flex-1 h-[44px] ml-2"}
          clearButtonMode="while-editing"
          value={value}
          onChangeText={onChange}
          placeholder={"Rechercher un pays"}
        />
      </View>
    </View>
  );
};
