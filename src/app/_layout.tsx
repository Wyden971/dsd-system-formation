import { Slot } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  AppContextProvider,
  ProductContextProvider,
  UserContextProvider,
} from "@/context";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { LanguageManager } from "@/components";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useFonts } from "expo-font";
import { useCallback, useEffect } from "react";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "@/global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function AppLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const migrateDbIfNeeded = useCallback(async (db: SQLiteDatabase) => {
    await db.runAsync(`
        CREATE TABLE IF NOT EXISTS users (
            id VARCHAR(50) PRIMARY KEY NOT NULL,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR5(255) NOT NULL,
            telephone VARCHAR(15) NOT NULL
        );
    `);
  }, []);
  if (!loaded) {
    return null;
  }
  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <SQLiteProvider
          databaseName="app.db"
          onInit={migrateDbIfNeeded}
          assetSource={{
            assetId: require("@/assets/databases/app.db"),
          }}
        >
          <ActionSheetProvider>
            <AppContextProvider>
              <UserContextProvider>
                <ProductContextProvider>
                  <LanguageManager>
                    <BottomSheetModalProvider>
                      <Slot />
                    </BottomSheetModalProvider>
                  </LanguageManager>
                </ProductContextProvider>
              </UserContextProvider>
            </AppContextProvider>
          </ActionSheetProvider>
        </SQLiteProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
