import React, { ForwardedRef, forwardRef } from "react";
import { View, Text } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, Icon, Image } from "@/components";
import { useRouter } from "expo-router";

type AuthModalProps = {
  closeModal: () => void;
};

export const AuthModal = forwardRef(
  ({ closeModal }: AuthModalProps, ref: ForwardedRef<BottomSheetModal>) => {
    const { t } = useTranslation();
    const { bottom } = useSafeAreaInsets();
    const router = useRouter();

    const onLogin = () => {
      router.push("/onboarding/auth/login");
      closeModal();
    };

    return (
      <BottomSheetModal
        ref={ref}
        name="auth"
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
        )}
        animateOnMount
        enablePanDownToClose
        enableDynamicSizing
      >
        <BottomSheetView className="items-center" style={{ paddingBottom: bottom }}>
          <View className="px-4 gap-y-4 pb">
            <Text className="font-bold text-2xl">{t("auth.modal.title")}</Text>
            <View className="flex-row">
              <View className="w-[60%] gap-y-3">
                <Text className="font-semibold">{t("auth.modal.text")}</Text>
                {["connect", "serve", "mission", "grow"].map((item) => (
                  <View className="flex-row" key={item}>
                    <Icon name="check" className="mr-1 text-indigo-500" />
                    <Text className="flex-1">{t(`auth.modal.items.${item}`)}</Text>
                  </View>
                ))}
              </View>
              <Image
                source={require("@/assets/images/illustration/auth.png")}
                className="aspect-[1] mt-8 w-[40%] my-auto"
                resizeMode="contain"
              />
            </View>

            <Button label={t("auth.modal.button")} className="my-4" onPress={onLogin} />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AuthModal;
