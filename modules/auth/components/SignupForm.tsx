import { View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Text } from "@/components";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSignup } from "../application/useSignup";
import { SignupFields, signupSchema } from "../domain/Signup";

export const SignupForm = () => {
  const { error, mutate: signup } = useSignup();

  const { control, handleSubmit } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFields> = (data) => signup(data);

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
          label="Contraseña"
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={!!error}
        />
        <Input
          className="mb-3"
          label="Confirmar contraseña"
          name="confirmPassword"
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
      <Button
        className="mt-3"
        label={"Continuar"}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default SignupForm;
