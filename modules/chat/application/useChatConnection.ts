import { useEffect, useMemo, useState } from "react";
import { subscribe, unsubscribe, sendMessage, getMessages } from "../interface/chatApi";
import { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import { useMutation, useQuery } from "react-query";
import { useUserStore } from "@/user/store/useUserStore";
import { Message } from "../domain/Message";
import { Message as IMessage } from "../domain/Message";

export const useChatConnection = (channelId: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();

  const { mutate: sendMessageMutation } = useMutation({
    mutationKey: "sendMessage",
    mutationFn: sendMessage,
    onSuccess: (data, variables) => {
      // TODO: Check optimization and necesity of this
      setMessages((prev) =>
        prev.map((msg) => (msg.text === variables.text ? { ...msg, pending: false } : msg))
      );
    },
  });

  const onMessage = (payload: RealtimePostgresInsertPayload<Message>) => {
    if (payload.new.user_id === user.id) return;
    setMessages((prev) => [payload.new, ...prev]);
  };

  const handleSend = (message: Omit<Message, "id">) => {
    setMessages((prev) => [{ ...message, id: Date.now(), pending: true }, ...prev]);
    sendMessageMutation({ ...message, connection_id: channelId });
  };

  const fetchMessages = async () => {
    const messages = await getMessages(channelId);
    setMessages(messages);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    const channel = subscribe(channelId, user.id as string, onMessage);
    console.log(channel, user.id);
    return () => unsubscribe(channel);
  }, []);

  return { messages, handleSend, isLoading };
};
