import { useLocalSearchParams } from "expo-router";

import { Container, Text } from "@/components";
import { Chat } from "@/chat/components/Chat";
import { ChatHeader } from "@/chat/components/ChatHeader";

export default function Connection() {
  const { id } = useLocalSearchParams();
  const connectionId = parseInt(id as string);

  return (
    <Container className="p-0" avoidKeyboard={false}>
      <ChatHeader id={connectionId} />
      <Chat channelId={connectionId} />
    </Container>
  );
}
