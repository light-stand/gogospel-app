import { useFormContext } from "react-hook-form";
import { Button, Container, Text, Select } from "@/components";
import { profileTypeOptions } from "@/constants/profiling";

export default function Type() {
  const { control } = useFormContext();
  return (
    <Container>
      <Text className="font-bold text-3xl mb-10">Soy...</Text>
      <Select name="type" control={control} options={profileTypeOptions} />
      <Button label="Continuar" className="mt-auto" />
    </Container>
  );
}
