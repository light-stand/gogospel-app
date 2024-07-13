import { View } from "react-native";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Input, Text } from "@/components";
import { LoginFields, loginSchema } from "../domain/Login";
import { useLogin } from "../application/useLogin";

export const LoginForm = () => {
  const { t } = useTranslation();
  const { error, mutate: login } = useLogin();

  const { control, handleSubmit } = useForm<LoginFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFields> = (data) => login(data);

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
          className="mb-3"
          label={t("auth.fields.password")}
          name="password"
          autoCapitalize="none"
          secureTextEntry
          control={control}
          error={!!error}
        />
      </View>
      {error && <Text className="text-red-500 my-4">{error.message || t("error.unknown")}</Text>}
      <View />
      <Button className="mt-3" label={t("action.next")} onPress={handleSubmit(onSubmit)} />
    </>
  );
};

export default LoginForm;
