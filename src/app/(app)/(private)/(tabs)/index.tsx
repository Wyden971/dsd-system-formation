import { UserItem, UserScanButton } from "@/components";
import { useUserContext } from "@/context";
import { Link, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { Iconify } from "react-native-iconify";

export default function HomeScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setOptions } = useNavigation();
  const { users, getUsers } = useUserContext();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <View className={"flex-row items-center gap-x-1 mr-2"}>
            <UserScanButton
              onUserFound={(userId) => {
                router.push(`/user/${userId}`);
              }}
            />
            <Link href={"/user/create"} asChild>
              <TouchableOpacity className={"py-2 px-2"}>
                <Iconify icon={"mdi:add"} size={25} color={"#000"} />
              </TouchableOpacity>
            </Link>
          </View>
        );
      },
    });
  }, []);

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setIsLoading(true);
              getUsers(1).finally(() => setIsLoading(false));
            }}
          />
        }
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserItem
            fullName={`${item.firstName} ${item.lastName}`}
            email={item.email}
            isVip={item.isVip}
            onPress={() => {
              router.push(`/user/${item.id}`);
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <View className={"h-[1px] w-full bg-gray-150"} />
        )}
        ListEmptyComponent={
          <View className={"items-center justify-center p-4"}>
            <Text>Aucun utilisateur disponible</Text>
          </View>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
