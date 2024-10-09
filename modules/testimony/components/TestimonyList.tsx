import { ListTestimonyModes, Testimony } from "../domain/Testimony";
import { FlatList } from "react-native";
import { TestimonyItem } from "./TestimonyItem";

type TestimonyListProps = {
  testimonies: Testimony[];
  mode: ListTestimonyModes;
};

export const TestimonyList = ({ testimonies, mode }: TestimonyListProps) => {
  return (
    <FlatList
      renderItem={({ item }) => <TestimonyItem testimony={item} mode={mode} />}
      data={testimonies}
    />
  );
};
