import { View } from "react-native";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";

export default function Bio() {
  const { form, onNext } = useProfilingScreen("bio");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">Un poco más sobre ti</Text>
      <Input
        label="Sobre mi"
        name="bio"
        type="textarea"
        className="min-h-32"
        control={form.control}
      />
      <Button label="Continuar" className="mt-auto" onPress={onNext} />
    </Container>
  );
}
