import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { RouteHeader } from "@/components/RouteHeader";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

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
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 15 },
      }}
    >
      <Tabs.Screen
        name="home-screen"
        options={{
          header: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          header: () => <></>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="login-screen"
        options={{
          header: () => <RouteHeader />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="register-screen"
        options={{
          header: () => <RouteHeader>Cadastrar conta</RouteHeader>,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="forgot-password-screen"
        options={{
          header: () => <RouteHeader />,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="menu-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="product-details-screen"
        options={{
          header: () => <RouteHeader />,
          href: null,
        }}
      />
    </Tabs>
  );
}
