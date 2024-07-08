import { View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Text } from "@/components";
import { useSignup } from "../application/useSignup";
import { SignupFields, signupSchema } from "../domain/Signup";

export const SignupForm = () => {
  const { t } = useTranslation();
  const { error, mutate: signup } = useSignup();

  const { control, handleSubmit } = useForm<SignupFields>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFields> = (data) => signup(data);

  return (
    <>
      <View className="gap-y-2">
        <Input
          label={t("auth.fields.email")}
          name="email"
          inputMode="email"
          autoCapitalize="none"
          control={control}
          error={!!error}
        />
        <Input
          label={t("auth.fields.password")}
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={!!error}
        />
        <Input
          className="mb-3"
          label={t("auth.fields.confirmPassword")}
          name="confirmPassword"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={!!error}
        />
      </View>
      {error && (
        <Text className="text-red-500 my-4">
          {error.message || t("error.unknown")}
        </Text>
      )}
      <Button
        className="mt-3"
        label={t("action.next")}
        onPress={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default SignupForm;
