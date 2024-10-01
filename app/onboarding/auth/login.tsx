import { Button, Container, Text } from "@/components";
import LoginForm from "@/auth/components/LoginForm";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  return (
    <Container showBack scroll>
      <Text className="font-bold text-3xl mb-6">{t("auth.titles.login")}</Text>
      <LoginForm />
    </Container>
  );
}
