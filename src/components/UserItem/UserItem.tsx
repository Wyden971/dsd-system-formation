import { View, Text, TouchableOpacity } from "react-native";
import { Iconify } from "react-native-iconify";

export type Props = {
  fullName: string;
  email: string;
  isVip?: boolean;
  onPress: () => void;
};

export const UserItem = ({ fullName, email, isVip, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className={"bg-white p-4 flex flex-row items-center gap-x-3"}>
        <Iconify icon={"mdi:user-outline"} size={25} color={"black"} />
        <View className={"flex-1"}>
          <View className={"flex flex-row items-center"}>
            <Text className={"font-bold mr-1"}>{fullName}</Text>
            {isVip && (
              <Iconify
                icon={"mdi:police-badge-outline"}
                size={15}
                color={"blue"}
              />
            )}
          </View>
          <Text className={"text-base text-gray-400"}>{email}</Text>
        </View>
        <Iconify icon={"mdi:chevron-right"} size={25} color={"black"} />
      </View>
    </TouchableOpacity>
  );
};
