import { Bubble, GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import { useChatConnection } from "../application/useChatConnection";
import { useUserStore } from "@/user/store/useUserStore";
import { useEffect, useMemo } from "react";
import { indigo } from "tailwindcss/colors";

type ChatProps = {
  channelId: number;
};

export const Chat = ({ channelId }: ChatProps) => {
  const { messages, handleSend, isLoading } = useChatConnection(channelId);
  const { user } = useUserStore();

  const mappedMessages = useMemo(
    () =>
      messages?.map((msg) => ({
        _id: msg.id,
        user: { _id: msg.user_id },
        text: msg.text,
        createdAt: new Date(msg.created_at),
        pending: msg.pending,
      })),
    [messages]
  );

  const onSend = (messages: IMessage[]) => {
    const [{ text, user }] = messages;
    handleSend({
      text: text as string,
      user_id: user._id as string,
      created_at: new Date().toISOString(),
      connection_id: channelId,
    });
  };

  return (
    <GiftedChat
      messages={mappedMessages}
      isLoadingEarlier={isLoading}
      renderAvatar={null}
      alwaysShowSend
      onSend={onSend}
      user={{
        _id: user?.id as string,
      }}
      optionTintColor="#000"
      renderBubble={(props) => (
        <Bubble {...props} wrapperStyle={{ right: { backgroundColor: indigo[500] } }} />
      )}
      renderSend={(props) => <Send {...props} textStyle={{ color: indigo[500] }} />}
    />
  );
};
