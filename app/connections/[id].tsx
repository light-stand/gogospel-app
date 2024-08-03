import { useLocalSearchParams, useRouter } from "expo-router";

import { Container, Text } from "@/components";

export default function Connection() {
  const { id } = useLocalSearchParams();

  return (
    <Container showBack>
      <Text>Connection</Text>
    </Container>
  );
}
