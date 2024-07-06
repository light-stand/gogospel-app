import { Button, Container, Text, Select } from "@/components";
import { useProfilingScreen } from "@/profiling/hooks/useProfilingScreen";
import { Option } from "@/components/ui/forms/Select/Select";

export const profileTypeOptions: Option[] = [
  {
    title: "Misionero",
    value: "missionary",
    description: "Soy misionero y busco a un ministerio donde servir a Dios.",
    icon: "hand-heart",
  },
  {
    title: "Ministerio",
    value: "ministry",
    description:
      "Soy un ministerio que busca misioneros para llevar a cabo su misión.",
    icon: "church",
  },
];

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
