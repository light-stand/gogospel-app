import { ProfilingFields } from "./ProfilingForm";

export enum UserType {
  Missionary = "missionary",
  Ministry = "ministry",
}

export type ProfilingScreen = "type" | "name" | "bio" | "picture" | "interests";

export type ProfilingField = keyof ProfilingFields;

export const profilingFlow: { [key in UserType]: ProfilingScreen[] } = {
  missionary: ["type", "name", "bio", "picture", "interests"],
  ministry: ["type", "name", "bio", "picture"],
};

export const fieldsByScreen: {
  [key in UserType]: { [key: string]: ProfilingField[] };
} = {
  missionary: {
    type: ["type"],
    name: ["firstName", "lastName"],
    bio: ["bio"],
    picture: ["picture"],
    interests: ["interests"],
  },
  ministry: {
    type: ["type"],
    name: ["firstName", "lastName"],
    bio: ["bio"],
    picture: ["picture"],
    interests: ["interests"],
  },
};
