import { useMemo } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button, Collapsable, Container, ImagePicker, Input, TagCloud, Text } from "@/components";
import { missionTypes } from "@/mission/domain/MissionType";
import { useEditProfile } from "@/user/application/useEditProfile";
import { ministryTypes } from "@/ministry/domain/MinistryType";

export default function EditProfile() {
  const { t } = useTranslation();
  const { form, onSubmit } = useEditProfile();
  const { bottom } = useSafeAreaInsets();

  const options = useMemo(
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
    <Container showBack scroll>
      <View className="gap-y-6" style={{ paddingBottom: bottom }}>
        <Text className="font-bold text-3xl mb-4">{t("profiling.titles.edit")}</Text>
        <ImagePicker icon="camera" name="picture" control={form.control} />
        <Input label={t(`profiling.fields.name.label`)} name="name" control={form.control} />
        <Collapsable className="flex-1">
          <TagCloud
            label={t(`profiling.fields.ministryType.label`)}
            name="ministryType"
            max={1}
            options={ministryTypesOptions}
            control={form.control}
          />
        </Collapsable>
        <Input
          label={t(`profiling.fields.bio.label`)}
          name="bio"
          type="textarea"
          className="min-h-32"
          control={form.control}
        />
        <Collapsable className="flex-1 mb-4">
          <TagCloud
            label={t(`profiling.fields.interests.label`)}
            name="interests"
            control={form.control}
            options={options}
          />
        </Collapsable>

        <Button label={t("action.save")} onPress={onSubmit} />
      </View>
    </Container>
  );
}
