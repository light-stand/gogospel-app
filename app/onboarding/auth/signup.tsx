import { View } from "react-native";
import { Container, Text, Button, Input } from "@/components";
import { useSignup } from "@/hooks/onboarding/auth/useSignup";

export default function Signup() {
  const {
    form: { control },
    onSubmit,
  } = useSignup();

  return (
    <Container showBack scroll>
      <Text className="font-bold text-3xl mb-6">Registrarse</Text>
      <View className="gap-y-2">
        <Input
          label="Email"
          name="email"
          inputMode="email"
          autoCapitalize="none"
          control={control}
        />
        <Input
          label="Contraseña"
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
        />
        <Input
          label="Confirmar contraseña"
          name="confirmPassword"
          autoCapitalize="none"
          secureTextEntry
          control={control}
        />
      </View>
      <View />
      <Button className="mt-6" label={"Continuar"} onPress={onSubmit} />
    </Container>
  );
}
