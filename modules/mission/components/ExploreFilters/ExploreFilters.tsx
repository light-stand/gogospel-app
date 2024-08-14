import React, { useMemo } from "react";
import { Modal, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Collapsable, Container, IconButton, Tag, TagCloud, Text } from "@/components";
import { useTranslation } from "react-i18next";
import { missionTypes } from "@/mission/domain/MissionType";
import { ministryTypes } from "@/ministry/domain/MinistryType";
import { UseFormReturn } from "react-hook-form";
import { ExploreFilters as IExploreFilters } from "@/mission/domain/ExploreFilters";

export interface ExploreFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: UseFormReturn<IExploreFilters>;
}

const ExploreFilters: React.FC<ExploreFiltersProps> = ({ open, onClose, filters }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  const missionTypesOptions = useMemo(
    () =>
      Object.entries(missionTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`mission.types.${key}`),
      })),
    [t]
  );

  const ministryTypesOptions = useMemo(
    () =>
      Object.entries(ministryTypes).map(([key, value]) => ({
        ...value,
        value: key,
        label: t(`ministry.types.${key}`),
      })),
    [t]
  );

  return (
    <Modal visible={open} animationType="slide">
      <IconButton
        icon="close"
        variant="primary"
        className="absolute top-4 right-4 z-10 shadow-md"
        style={[{ marginTop: top }]}
        onPress={onClose}
      />
      <Container showBack={false} scroll>
        <Text className="font-bold text-3xl mb-6">{t("mission.explore.filters.title")}</Text>
        <Collapsable className="mb-4">
          <TagCloud
            label={"Tipos de misión"}
            name="interests"
            options={missionTypesOptions}
            control={filters.control}
          />
        </Collapsable>
        <Collapsable className="mb-4">
          <TagCloud
            label={"Tipos de ministerio"}
            name="ministryType"
            options={ministryTypesOptions}
            control={filters.control}
          />
        </Collapsable>
      </Container>
    </Modal>
  );
};
export default ExploreFilters;
