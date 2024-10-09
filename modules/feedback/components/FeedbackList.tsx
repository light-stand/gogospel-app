import { ListFeedbackModes, Feedback } from "../domain/Feedback";
import { FlatList } from "react-native";
import { FeedbackItem } from "./FeedbackItem";

type FeedbackListProps = {
  data: Feedback[];
  mode: ListFeedbackModes;
};

export const FeedbackList = ({ data, mode }: FeedbackListProps) => {
  return (
    <FlatList renderItem={({ item }) => <FeedbackItem feedback={item} mode={mode} />} data={data} />
  );
};
