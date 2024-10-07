import { useCallback, useEffect, useRef } from "react";
import { Alert, View, ViewProps } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";

import { Button, Input, Text } from "@/components";
import { useVerifyCode } from "../application/useVerifyCode";

interface VerifyCodeSheetProps extends ViewProps {
  open: boolean;
  onClose: VoidFunction;
}

export const VerifyCodeSheet = ({ open, onClose }: VerifyCodeSheetProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const onSheetChange = useCallback((index: number) => {
    if (index === -1) onClose();
  }, []);

  const onValidationSuccess = () => {
    Alert.alert(t("user.verificationCode.success"), t("user.verificationCode.successText"));
    onClose();
  };

  const { form, onSubmit } = useVerifyCode(onValidationSuccess);

  useEffect(() => {
    open ? bottomSheetRef.current?.expand() : bottomSheetRef.current?.close();
  }, [open]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enableDynamicSizing
      backdropComponent={(props) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
      )}
      enablePanDownToClose
      onChange={onSheetChange}
    >
      <BottomSheetView>
        <View className="px-4 gap-y-2 pb-4">
          <Text className="font-bold text-xl">{t("user.verificationCode.title")}</Text>
          <Text className="font-bold text-neutral-500">{t("user.verificationCode.text")}</Text>
          <Input
            className="mb-4"
            name="code"
            label={t("user.verificationCode.label")}
            control={form.control}
          />
          <Button label={t("action.send")} onPress={onSubmit} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default VerifyCodeSheet;
