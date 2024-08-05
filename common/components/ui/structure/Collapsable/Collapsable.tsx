import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";

import { IconButton } from "@/components/ui/actions/IconButton";

export interface CollapsableProps extends ViewProps {
  children: React.ReactNode;
  height?: number;
}

const Collapsable: React.FC<CollapsableProps> = ({ children, height = 200, style, ...props }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <View
      className="overflow-hidden"
      style={[{ maxHeight: collapsed ? height : undefined }, style]}
      {...props}
    >
      {children}
      <LinearGradient
        colors={collapsed ? ["#ffffff00", "#ffffff99", "#fff"] : []}
        className={clsx(collapsed && "absolute bottom-0", "w-full h-8")}
      >
        <IconButton
          icon={collapsed ? "chevron-down" : "chevron-up"}
          className="text-neutral-500 mt-auto"
          size="medium"
          onPress={() => setCollapsed((p) => !p)}
        />
      </LinearGradient>
    </View>
  );
};

export default Collapsable;
