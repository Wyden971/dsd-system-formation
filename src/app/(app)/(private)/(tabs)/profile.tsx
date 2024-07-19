import { Button } from "@/components";
import { useAppContext } from "@/context";
import { useActiveLanguage } from "@/hooks";
import { Link } from "expo-router";
import { useEffect, useMemo } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  Animated,
  Easing,
} from "react-native";
import { Iconify } from "react-native-iconify";

export default function ProfileScreen() {
  const activeLanguage = useActiveLanguage();
  const appContext = useAppContext();
  const screen = useWindowDimensions();

  const animation = useMemo(() => {
    return new Animated.Value(0);
  }, []);

  const goToRight = () => {
    return Animated.timing(animation, {
      toValue: screen.width - 100,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  const goToLeft = () => {
    return Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };
  useEffect(() => {
    goToRight().start(() => {
      goToLeft().start();
    });
  }, []);
  return (
    <ScrollView>
      <Link href={"/language-modal"} asChild>
        <TouchableOpacity>
          <View className={"flex flex-row items-center gap-x-2 p-4 bg-white"}>
            <Text className={"flex flex-1 font-bold"}>Langue</Text>
            <Text className={"text-gray-500"}>{activeLanguage.name}</Text>
            <Iconify icon={"mdi:chevron-right"} size={20} color={"#000"} />
          </View>
        </TouchableOpacity>
      </Link>
      <View className={"h-[1px] bg-gray-100"} />
      <Link href={"/storybook"} asChild>
        <TouchableOpacity>
          <View className={"flex flex-row items-center gap-x-2 p-4 bg-white"}>
            <Text className={"flex flex-1 font-bold"}>Storybook</Text>
            <Iconify icon={"mdi:chevron-right"} size={20} color={"#000"} />
          </View>
        </TouchableOpacity>
      </Link>
      <View className={"p-4"}>
        <Button
          onPress={() => {
            Alert.alert(
              "Déconnexion",
              "Voulez-vous vraiment vous déconnecter?",
              [
                {
                  text: "Oui",
                  style: "destructive",
                  onPress: () => {
                    appContext.setAccessToken(null);
                  },
                },
                {
                  text: "Non",
                  style: "cancel",
                },
              ]
            );
          }}
          label={"Se deconnecter"}
          color={"error"}
        />
      </View>

      <View>
        <Animated.View
          className={"w-[100px] aspect-square bg-blue-500 rounded-full"}
          style={{
            backgroundColor: animation.interpolate({
              inputRange: [0, screen.width - 100],
              outputRange: ["#0000FF", "#FF0000"],
            }),
            borderRadius: animation.interpolate({
              inputRange: [0, (screen.width - 100) / 2, screen.width - 100],
              outputRange: [100, 0, 100],
            }),
            transform: [
              {
                translateX: animation,
              },
            ],
          }}
        ></Animated.View>
      </View>
    </ScrollView>
  );
}
