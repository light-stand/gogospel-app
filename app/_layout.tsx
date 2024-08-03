import { QueryClient, QueryClientProvider } from "react-query";
import { Stack } from "expo-router";

import "@/utils/axios";
import "@/utils/i18n";

import "react-native-reanimated";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

import useAppSetup from "@/common/hooks/setup/useAppSetup";
import { queryClient } from "@/interface/queryClient";

export default function RootLayout() {
  const { loaded } = useAppSetup();

  if (!loaded) return null;

  return (
    <ActionSheetProvider>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ActionSheetProvider>
  );
}
