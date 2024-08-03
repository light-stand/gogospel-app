import { useLocalSearchParams, useRouter } from "expo-router";

import { Container, Text } from "@/components";
import { Chat } from "@/chat/components/Chat";

export default function Connection() {
  const { id } = useLocalSearchParams();

  return (
    <Container showBack className="p-0">
      <Text>Connection</Text>
      <Chat channelId={parseInt(id as string)} />
    </Container>
  );
}
