import { Tabs, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { indigo } from "tailwindcss/colors";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { TouchableOpacity } from "react-native";
import { useUserStore } from "@/user/store/useUserStore";
import { useAuthModal } from "@/auth/context/AuthModalContext";

export default function TabLayout() {
  const { t } = useTranslation();
  const { user } = useUserStore();
  const router = useRouter();
  const { openModal: openAuthModal } = useAuthModal();

  const handleNavigation = (route: "" | "connections" | "my-profile") => {
    if (!user.id) return openAuthModal();
    router.push(`/(main)/${route}`);
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: indigo[500],
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("screen.explore"),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => handleNavigation("")} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "compass" : "compass-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="connections"
        options={{
          title: t("screen.connections"),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => handleNavigation("connections")} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "chatbubbles" : "chatbubbles-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-profile"
        options={{
          title: t("screen.profile"),
          tabBarButton: (props) => (
            <TouchableOpacity {...props} onPress={() => handleNavigation("my-profile")} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
