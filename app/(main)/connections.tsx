import { Container } from "@/components";
import { ConnectionList } from "@/connections/components/ConnectionList";
import { useTranslation } from "react-i18next";
import { ScrollView, Text } from "react-native";

export default function Connections() {
  const { t } = useTranslation();
  return (
    <Container className="p-0">
      <Text className="font-bold text-3xl m-4 ">{t("screen.connections")}</Text>
      <ConnectionList />
    </Container>
  );
}
