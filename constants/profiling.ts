import { Option } from "@/components/ui/forms/Select/Select";

export const profilingFlow = {
  missionary: ["type", "name", "bio", "picture", "interests"],
  ministry: ["type", "name", "bio", "picture"],
};

export const profileTypeOptions: Option[] = [
  {
    title: "Misionero",
    value: "missionary",
    description: "Soy misionero y busco a un ministerio donde servir a Dios.",
    icon: "hand-heart",
  },
  {
    title: "Ministerio",
    value: "ministry",
    description:
      "Soy un ministerio que busca misioneros para llevar a cabo su misión.",
    icon: "church",
  },
];
