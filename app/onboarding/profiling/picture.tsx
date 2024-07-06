import { Container, ImagePicker, Text, Button } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";

export default function Picture() {
  const { form, onNext } = useProfilingScreen("name");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">Una foto</Text>
      <ImagePicker icon="camera" name="image" control={form.control} />
      <Button label="Continuar" className="mt-auto" onPress={onNext} />
    </Container>
  );
}
