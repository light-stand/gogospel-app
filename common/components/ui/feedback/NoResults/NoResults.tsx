import { View, ViewProps } from "react-native";
import { Image, Text } from "@/components";
import { useTranslation } from "react-i18next";

type NoResultsType = "myMissions" | "favorites" | "involved";

type NoResultsProps = ViewProps & {
  type: NoResultsType;
};

const noResultsIllustration = {
  myMissions: require("@/assets/images/illustration/fitting.png"),
  favorites: require("@/assets/images/illustration/favorite.png"),
  involved: require("@/assets/images/illustration/collab.png"),
};

export const NoResults = ({ type, ...props }: NoResultsProps) => {
  const { t } = useTranslation();

  return (
    <View {...props}>
      <Image
        source={noResultsIllustration[type]}
        className="w-full aspect-[1.6] mt-8"
        resizeMode="contain"
      />
      <Text className="text-neutral-800 text-xl font-bold mt-2 mb-auto text-center">
        {t(`noResults.${type}.title`)}
      </Text>
      <Text className="text-neutral-500 font-bold mt-2 mb-auto text-center">
        {t(`noResults.${type}.text`)}
      </Text>
    </View>
  );
};

export default NoResults;
