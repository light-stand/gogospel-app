import { View } from "react-native";
import { Button, Container, Input, Text } from "@/components";
import { useProfilingScreen } from "@/hooks";

export default function Name() {
  const { form, onNext } = useProfilingScreen("name");
  return (
    <Container showBack>
      <Text className="font-bold text-3xl mb-10">Mi nombre es</Text>
      <View className="gap-y-2">
        <Input label="Nombre" name="firstName" control={form.control} />
        <Input label="Apellidos" name="lastName" control={form.control} />
      </View>
      <Button label="Continuar" className="mt-auto" onPress={onNext} />
    </Container>
  );
}
