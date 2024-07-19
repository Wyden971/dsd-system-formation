import { UserForm } from "@/components";
import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  View,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import { useUserContext } from "@/context";
import { User } from "@/models";
import { Iconify } from "react-native-iconify";
import { useActionSheet } from "@expo/react-native-action-sheet";
import LottieView from "lottie-react-native";

export default function UserScreen() {
  const { userId } = useLocalSearchParams();

  const { setOptions, goBack } = useNavigation();
  const userContext = useUserContext();

  const user = useMemo(() => {
    return userContext.users.find((item) => item.id === userId);
  }, [userId]);

  const { showActionSheetWithOptions } = useActionSheet();

  useLayoutEffect(() => {
    setOptions({
      title: user ? `${user.firstName} ${user.lastName}` : "Nouvel utilisateur",
      headerRight: () => {
        if (!user?.id) {
          return null;
        }
        return (
          <TouchableOpacity
            onPress={() => {
              showActionSheetWithOptions(
                {
                  options: ["Supprimer", "Annuler"],
                  destructiveButtonIndex: 0,
                  cancelButtonIndex: 1,
                },
                (result) => {
                  switch (result) {
                    case 0:
                      userContext.deleteUser(user);
                      goBack();
                      break;

                    case 1:
                      break;
                  }
                }
              );
            }}
          >
            <View>
              <Iconify icon={"mdi:trash-can-outline"} size={20} color={"red"} />
            </View>
          </TouchableOpacity>
        );
      },
    });
  }, [user]);

  const handleSave = useCallback(async (updatedUser: Partial<User>) => {
    if (!updatedUser.id) {
      await userContext.addUser(updatedUser as User);
    } else {
      await userContext.updateUser(updatedUser as User);
    }

    return updatedUser as User;
  }, []);

  return (
    <KeyboardAvoidingView
      className={"flex-1"}
      behavior={Platform.select({
        ios: "padding",
        android: "height",
      })}
      keyboardVerticalOffset={Platform.select({
        android: 30,
      })}
    >
      <ScrollView keyboardShouldPersistTaps={"always"}>
        <View className={"bg-white p-5"}>
          <View className={"items-center"}>
            <LottieView
              autoPlay
              loop
              style={{
                width: 200,
                height: 200,
              }}
              source={require("@/assets/lottie/Animation - 1721377427275.json")}
            />
          </View>
          <UserForm user={user} onSuccess={goBack} onSave={handleSave} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
