import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { RouteHeader } from "@/components/RouteHeader";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ header: () => <></>, tabBarStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="login-screen"
        options={{
          header: () => <RouteHeader />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="register-screen"
        options={{
          header: () => <RouteHeader>Cadastrar conta</RouteHeader>,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="forgot-password-screen"
        options={{
          header: () => <RouteHeader />,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="home-screen"
        options={{
          header: () => <></>,
        }}
      />
    </Tabs>
  );
}
