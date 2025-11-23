import { RouteHeader } from "@/components/RouteHeader"; // Importe o componente
import { useColorScheme } from "@/components/useColorScheme";
import { FavoritesProvider } from "@/context/FavoritesContext";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <FavoritesProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="filters-screen"
            options={{
              header: () => <RouteHeader>Todos os filtros</RouteHeader>,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="register-screen"
            options={{
              header: () => <RouteHeader>Cadastrar conta</RouteHeader>,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="login-screen"
            options={{
              header: () => <RouteHeader />,
              headerShown: true,
            }}
          />

          <Stack.Screen
            name="product-details-screen"
            options={{
              header: () => <RouteHeader>Detalhes do produto</RouteHeader>,
              headerShown: true,
            }}
          />
        </Stack>
      </ThemeProvider>
    </FavoritesProvider>
  );
}
