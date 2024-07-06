import { useProfiling } from "@/hooks";
import { Stack } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";

export default function ProfilingLayout() {
  const { form } = useProfiling();

  return (
    <FormProvider {...form}>
      <Stack screenOptions={{ headerShown: false }} />
    </FormProvider>
  );
}
