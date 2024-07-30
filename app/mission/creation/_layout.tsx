import { useMissionCreation } from "@/mission/application/useMissionCreation";
import { MissionCreationProvider } from "@/mission/context/MissionCreationContext";
import { Stack } from "expo-router";

export default function MissionCreationLayout() {
  const { form, onSubmit } = useMissionCreation();

  return (
    <MissionCreationProvider form={form} onSubmit={onSubmit}>
      <Stack screenOptions={{ headerShown: false }} />
    </MissionCreationProvider>
  );
}
