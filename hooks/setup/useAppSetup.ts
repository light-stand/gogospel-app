import { useEffect, useState } from "react";
import { SplashScreen, useRootNavigationState, useRouter } from "expo-router";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

export default function useAppSetup() {
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  const router = useRouter();
  const navigationState = useRootNavigationState();
  const [tokenChecked, setTokenChecked] = useState(false);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    router.push(token ? "/(main)" : "/onboarding/welcome");
    setTokenChecked(true);
  };

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  useEffect(() => {
    !tokenChecked && navigationState.key && checkToken();
  }, [tokenChecked, navigationState]);

  return { loaded };
}
