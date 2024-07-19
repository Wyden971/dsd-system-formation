import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Iconify } from "react-native-iconify";

export type Props = {
  title: string;
  description: string;
  image: string;
  href: string;
};
export const ProductListItem = ({ title, description, image, href }: Props) => {
  return (
    <Link href={href} asChild>
      <TouchableOpacity>
        <View
          className={"flex flex-row items-center bg-white rounded-xl mx-4 p-2"}
        >
          <Image
            className={
              "aspect-square w-[20vw] bg-gray-100 rounded-xl overflow-hidden"
            }
            source={{
              uri: image,
            }}
          />
          <View className={"flex-1 mx-4"}>
            <Text className={"font-bold text-lg"} numberOfLines={1}>
              {title}
            </Text>
            <Text className={"text-base text-gray-500"} numberOfLines={2}>
              {description}
            </Text>
          </View>
          <Iconify icon={"mdi:chevron-right"} size={25} color={"black"} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};
