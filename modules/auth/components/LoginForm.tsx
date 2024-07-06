import { View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Text } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginFields, loginSchema } from "../domain/Login";
import { useLogin } from "../application/useLogin";

export const LoginForm = () => {
  const { error, mutate: login } = useLogin();

  const { control, handleSubmit } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => login(data);

  return (
    <>
      <View className="gap-y-2">
        <Input
          label="Email"
          name="email"
          inputMode="email"
          autoCapitalize="none"
          control={control}
          error={!!error}
        />
        <Input
          className="mb-3"
          label="Contraseña"
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={!!error}
        />
      </View>
      {error && (
        <Text className="text-red-500 my-4">
          {error.message || "Error desconocido"}
        </Text>
      )}
      <View />
      <Button
        className="mt-3"
        label={"Continuar"}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default LoginForm;
