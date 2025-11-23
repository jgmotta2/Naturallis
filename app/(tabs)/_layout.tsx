import { Tabs } from "expo-router";
import React from "react";

import { useColorScheme } from "@/components/useColorScheme";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { paddingTop: 15, backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          header: () => <></>,
          href: null,
          tabBarStyle: { display: "none" },
        }}
      />

      <Tabs.Screen
        name="home-screen"
        options={{
          headerShown: false,
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
        name="favorites-screen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="heart-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="shopping-cart-screen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="cart-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="user-screen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="all-categories-screen"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="menu-outline"
              color={focused ? "#41744E" : "#ccc"}
              size={30}
            />
          ),
        }}
      />
    </Tabs>
  );
}
