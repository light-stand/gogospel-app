import { QueryClientProvider } from "react-query";
import { Stack } from "expo-router";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";

import "@/utils/axios";
import "@/utils/i18n";

import useAppSetup from "@/common/hooks/setup/useAppSetup";
import { queryClient } from "@/interface/queryClient";
import { AuthModalProvider } from "@/auth/context/AuthModalContext";

export default function RootLayout() {
  const { loaded } = useAppSetup();
  if (!loaded) return null;

  return (
    <GestureHandlerRootView>
      <ActionSheetProvider>
        <AuthModalProvider>
          <QueryClientProvider client={queryClient}>
            <Stack screenOptions={{ headerShown: false }} />
          </QueryClientProvider>
        </AuthModalProvider>
      </ActionSheetProvider>
    </GestureHandlerRootView>
  );
}
