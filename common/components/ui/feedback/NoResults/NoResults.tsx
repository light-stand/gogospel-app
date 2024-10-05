import { View, ViewProps } from "react-native";
import { Button, Image, Text } from "@/components";
import { useTranslation } from "react-i18next";
import { Href, Link } from "expo-router";

type NoResultsType = "myMissions" | "favorites" | "involved" | "connections";

type NoResultsProps = ViewProps & {
  type: NoResultsType;
};

const noResultsIllustration = {
  myMissions: require("@/assets/images/illustration/fitting.png"),
  favorites: require("@/assets/images/illustration/favorite.png"),
  involved: require("@/assets/images/illustration/collab.png"),
  connections: require("@/assets/images/illustration/chatting.png"),
};

const noResultsLinks: Partial<Record<NoResultsType, Href>> = {
  myMissions: "/mission/creation",
};

export const NoResults = ({ type, ...props }: NoResultsProps) => {
  const { t } = useTranslation();

  return (
    <View className="px-2" {...props}>
      <Image
        source={noResultsIllustration[type]}
        className="w-full aspect-[1.6] mt-8"
        resizeMode="contain"
      />
      <View className="px-4">
        <Text className="text-neutral-800 text-xl font-bold mt-2 mb-auto text-center">
          {t(`noResults.${type}.title`)}
        </Text>
        <Text className="text-neutral-500 font-bold mt-2 mb-auto text-center">
          {t(`noResults.${type}.text`)}
        </Text>
        {noResultsLinks[type] && (
          <View className="px-4 mt-4">
            <Link href={noResultsLinks[type]} asChild>
              <Button label={t(`noResults.${type}.button`)} block={false} />
            </Link>
          </View>
        )}
      </View>
    </View>
  );
};

export default NoResults;
