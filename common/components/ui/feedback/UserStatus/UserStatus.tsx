import React from "react";
import { View } from "react-native";
import Text from "../../foundation/Text/Text";
import clsx from "clsx";

export interface UserStatusProps {
  onlineLabel?: string;
  offlineLabel?: string;
  showLabel?: boolean;
  isOnline?: boolean;
  style?: object[];
  className?: string;
}
const UserStatus: React.FC<UserStatusProps> = ({
  showLabel = false,
  isOnline = true,
  onlineLabel = "Online",
  offlineLabel = "Offline",
  style,
}) => {
  return (
    <View style={style} className="flex flex-row self-start">
      <View
        className={clsx(
          "self-center w-[6] h-[6] rounded-full",
          isOnline ? "bg-success" : "bg-danger"
        )}
      ></View>
      {showLabel && (
        <Text className="text-gray-4 self-start ml-1 text-xs">
          {isOnline ? onlineLabel : offlineLabel}
        </Text>
      )}
    </View>
  );
};

export default UserStatus;
