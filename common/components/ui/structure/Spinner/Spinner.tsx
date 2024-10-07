import React, { useEffect, useRef } from "react";
import { ActivityIndicator, Animated, Modal, View } from "react-native";
import clsx from "clsx";

export interface SpinnerProps {
  visible: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ visible }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className={clsx("h-full w-full bg-[#00000099] absolute z-10")}>
        <ActivityIndicator className="m-auto" color="white" size="large" />
      </View>
    </Modal>
  );
};

export default Spinner;
