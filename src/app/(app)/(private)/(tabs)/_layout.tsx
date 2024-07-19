import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserContext } from "@/context";
import { Iconify } from "react-native-iconify";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const intl = useIntl();
  const data = useUserContext();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: intl.formatMessage(
            { id: "user.title" },
            {
              nbUsers: data.users.length,
            }
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "code-slash" : "code-slash-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Mon profil",
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Iconify icon={"mdi:user"} size={30} color={"#000"} />
            ) : (
              <Iconify icon={"mdi:user-outline"} size={30} color={"#000"} />
            ),
        }}
      />
    </Tabs>
  );
}
