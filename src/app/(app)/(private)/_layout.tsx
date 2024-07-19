import { SecurePage } from "@/components";
import { useDeepLink } from "@/hooks";
import { Stack } from "expo-router";

export default function PrivateLayout() {
  useDeepLink();

  return (
    <SecurePage>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="language-modal"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            title: "Sélectionnez un Pays",
          }}
        />
      </Stack>
    </SecurePage>
  );
}
