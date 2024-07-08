import { Option } from "@/components/ui/forms/Select/Select";

export enum UserType {
  Missionary = "missionary",
  Ministry = "ministry",
}

export const profilingFlow: { [key in UserType]: string[] } = {
  missionary: ["type", "name", "bio", "picture", "interests"],
  ministry: ["type", "name", "bio", "picture"],
};

export const fieldsByScreen: {
  [key in UserType]: { [key: string]: string[] };
} = {
  missionary: {
    type: ["type"],
    name: ["firstName", "lastName"],
    bio: ["bio"],
    picture: ["image"],
    interests: ["interests"],
  },
  ministry: {
    type: ["type"],
    name: ["firstName", "lastName"],
    bio: ["bio"],
    picture: ["image"],
    interests: ["interests"],
  },
};
