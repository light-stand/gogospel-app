import { View } from "react-native";
import { Container, Text, Button, Input } from "@/components";
import { useSignup } from "@/hooks/onboarding/auth/useSignup";

export default function Signup() {
  const {
    form: { control },
    onSubmit,
    error,
  } = useSignup();

  console.log("error", error);

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
          error={error}
        />
        <Input
          label="Contraseña"
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={error}
        />
        <Input
          className="mb-3"
          label="Confirmar contraseña"
          name="confirmPassword"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={error}
        />
      </View>
      {error && (
        <Text className="text-red-500 my-4">
          {error || "Error desconocido"}
        </Text>
      )}
      <Button className="mt-3" label={"Continuar"} onPress={onSubmit} />
    </Container>
  );
}
