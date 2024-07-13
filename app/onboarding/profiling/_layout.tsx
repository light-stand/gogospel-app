import { Stack } from "expo-router";
import { useProfiling } from "@/profiling/hooks/useProfiling";
import { ProfilingProvider } from "@/profiling/context/ProfilingContext";

export default function ProfilingLayout() {
  const { form, onSubmit } = useProfiling();

  return (
    <ProfilingProvider form={form} onSubmit={onSubmit}>
      <Stack screenOptions={{ headerShown: false }} />
    </ProfilingProvider>
  );
}
