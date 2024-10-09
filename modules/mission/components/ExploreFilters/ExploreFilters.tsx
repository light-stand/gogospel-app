import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Collapsable, Slider, TagCloud, Text } from "@/components";
import { useTranslation } from "react-i18next";
import { missionTypes } from "@/mission/domain/MissionType";
import { ministryTypes } from "@/user/domain/MinistryType";
import { UseFormReturn } from "react-hook-form";
import { ExploreFilters as IExploreFilters } from "@/mission/domain/ExploreFilters";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";

export interface ExploreFiltersProps {
  open: boolean;
  onClose: () => void;
  filters: UseFormReturn<IExploreFilters>;
}

const SNAP_POINTS = ["66%"];

const ExploreFilters: React.FC<ExploreFiltersProps> = ({ open, onClose, filters }) => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const onSheetChange = useCallback((index: number) => {
    if (index === -1) onClose();
  }, []);

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

  useEffect(() => {
    open ? bottomSheetRef.current?.expand() : bottomSheetRef.current?.close();
  }, [open]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      containerStyle={{ zIndex: 50 }}
      snapPoints={SNAP_POINTS}
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
      enablePanDownToClose
      onChange={onSheetChange}
    >
      <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 16 }}>
        <Text className="font-bold text-3xl mb-6">{t("mission.explore.filters.title")}</Text>
        <Collapsable className="mb-4">
          <TagCloud
            label={t("mission.explore.filters.interests")}
            name="interests"
            options={missionTypesOptions}
            control={filters.control}
          />
        </Collapsable>
        <Slider
          label={t("mission.explore.filters.distance")}
          value={0}
          labelFormat={(d) => (d === 0 ? t("mission.explore.filters.unlimited") : `${d} km`)}
          valuesMap={[10, 25, 50, 100, 200, 500, 0]}
          min={0}
          max={6}
          step={1}
          control={filters.control}
          name="distance"
          // onChange={v => onChange('distance', v)}
          // value={distance}
        />
        <Collapsable className="mb-4">
          <TagCloud
            label={t("mission.explore.filters.ministryType")}
            name="ministryType"
            options={ministryTypesOptions}
            control={filters.control}
          />
        </Collapsable>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};
export default ExploreFilters;
