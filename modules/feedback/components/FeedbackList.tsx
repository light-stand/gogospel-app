import { ListFeedbackModes, Feedback } from "../domain/Feedback";
import { ActivityIndicator, FlatList } from "react-native";
import { FeedbackItem } from "./FeedbackItem";
import { NoResults } from "@/components/ui/feedback";

type FeedbackListProps = {
  data: Feedback[];
  mode: ListFeedbackModes;
  isFetching: boolean;
};

export const FeedbackList = ({ data, mode, isFetching }: FeedbackListProps) => {
  return (
    <FlatList
      renderItem={({ item }) => <FeedbackItem feedback={item} mode={mode} />}
      data={data}
      ListEmptyComponent={
        isFetching ? (
          <ActivityIndicator />
        ) : (
          <NoResults type={mode === "given" ? "feedbackGiven" : "feedbackReceived"} />
        )
      }
    />
  );
};
