import { Button, Container, Text, Select } from "@/components";
import { profileTypeOptions } from "@/constants/profiling";
import { useProfilingScreen } from "@/hooks";

export default function Type() {
  const { form, onNext } = useProfilingScreen("type");
  return (
    <Container>
      <Text className="font-bold text-3xl mb-10">Soy...</Text>
      <Select name="type" control={form.control} options={profileTypeOptions} />
      <Button label="Continuar" className="mt-auto" onPress={onNext} />
    </Container>
  );
}
