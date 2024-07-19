import { Stack } from "expo-router";
import { useQuickActionRouting, RouterAction } from "expo-quick-actions/router";
import * as QuickActions from "expo-quick-actions";
import { useEffect } from "react";
export default function RootLayout() {
  useQuickActionRouting();

  useEffect(() => {
    // Now you can configure your quick actions to link places (including externally):
    QuickActions.setItems<RouterAction>([
      {
        title: "Voir les utilisateurs",
        icon: "compose",
        id: "0",
        params: { href: "/index" },
      },
      {
        title: "Voir mon profil",
        icon: "compose",
        id: "1",
        params: { href: "/profile" },
      },
    ]);

    const subscription = QuickActions.addListener((action) => {
      console.log(action);
    });

    return () => subscription.remove();
  }, []);
  return (
    <Stack initialRouteName="login">
      <Stack.Screen name="login" />
      <Stack.Screen name="(private)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
