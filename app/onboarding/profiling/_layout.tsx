import { Stack } from "expo-router";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profilingSchema } from "@/modules/profiling/domain/ProfilingForm";

export default function ProfilingLayout() {
  const form = useForm({
    resolver: zodResolver(profilingSchema),
    mode: "all",
  });

  return (
    <FormProvider {...form}>
      <Stack screenOptions={{ headerShown: false }} />
    </FormProvider>
  );
}
