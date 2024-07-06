import { QueryClient, QueryClientProvider } from "react-query";
import { Stack } from "expo-router";

import "@/utils/axios";
import useAppSetup from "@/common/hooks/setup/useAppSetup";

import "react-native-reanimated";
import { UserProvider } from "@/modules/user/context/UserContext";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

export const queryClient = new QueryClient();

export default function RootLayout() {
  const { loaded } = useAppSetup();

  if (!loaded) return null;

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          </Stack>
        </UserProvider>
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}
