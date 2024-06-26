import { QueryClientProvider } from "react-query";
import { Stack } from "expo-router";

import { queryClient } from "@/utils/http";
import useAppSetup from "@/hooks/setup/useAppSetup";

import "react-native-reanimated";
import { AppProvider } from "@/context/AppContext";

export default function RootLayout() {
  const { loaded } = useAppSetup();

  if (!loaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(main)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
      </AppProvider>
    </QueryClientProvider>
  );
}
