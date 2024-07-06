import { Container, Text } from "@/components";
import LoginForm from "@/auth/components/LoginForm";

export default function Login() {
  return (
    <Container showBack scroll>
      <Text className="font-bold text-3xl mb-6">Acceder</Text>
      <LoginForm />
    </Container>
  );
}
