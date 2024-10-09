import { Testimony } from "../domain/Testimony";
import { FlatList } from "react-native";
import { TestimonyItem } from "./TestimonyItem";

type TestimonyListProps = {
  testimonies: Testimony[];
};

export const TestimonyList = ({ testimonies }: TestimonyListProps) => {
  return (
    <FlatList renderItem={({ item }) => <TestimonyItem testimony={item} />} data={testimonies} />
  );
};
