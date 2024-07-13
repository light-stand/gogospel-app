import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { useAuthInit } from "@/auth/application/useAuthInit";
import { useUserInit } from "@/user/application/useUserInit";

SplashScreen.preventAutoHideAsync();

export default function useAppSetup() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useAuthInit();
  useUserInit();

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  return { loaded };
}
