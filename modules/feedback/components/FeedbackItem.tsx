import { TouchableOpacity, View } from "react-native";

import { ListFeedbackModes, Feedback } from "../domain/Feedback";
import { Text, UserPhoto } from "@/components";

type FeedbackListProps = {
  feedback: Feedback;
  mode: ListFeedbackModes;
};

export const FeedbackItem = ({ feedback, mode }: FeedbackListProps) => {
  const { title, description, mission } = feedback;

  const userData = mode === "received" ? feedback.user : feedback.target_user;

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <View className="bg-white p-3 w-full border-b border-neutral-300">
        <View className="flex-row justify-between w-full gap-x-3">
          <View className="flex w-full gap-y-1">
            <Text className="text-lg font-bold" numberOfLines={1}>
              {title}
            </Text>
            <View className="flex flex-row items-center">
              <UserPhoto source={{ uri: userData?.images[0] }} className="h-6 w-6 mr-2" />
              <Text bold className="text-neutral-600 font-bold w-full" numberOfLines={1}>
                {userData?.name}
              </Text>
            </View>
            <Text bold className="text-neutral-400 font-bold w-full" numberOfLines={1}>
              {mission?.title}
            </Text>
            <Text className="font-regular text-neutral-500" numberOfLines={3}>
              {description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
