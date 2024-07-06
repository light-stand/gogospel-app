import { Container, Text } from "@/components";
import SignupForm from "@/modules/auth/components/SignupForm";

export default function Signup() {
  return (
    <Container showBack scroll>
      <Text className="font-bold text-3xl mb-6">Registrarse</Text>
      <SignupForm />
    </Container>
  );
}
