import React, { useState } from "react";
import { View, ViewProps } from "react-native";
import { IconButton } from "@/components/ui/actions/IconButton";

import { LinearGradient } from "expo-linear-gradient";

export interface CollapsableProps extends ViewProps {
  children: React.ReactNode;
  height?: number;
}

const Collapsable: React.FC<CollapsableProps> = ({ children, height = 200, ...props }) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <View
      className="overflow-hidden"
      style={{ maxHeight: collapsed ? height : undefined }}
      {...props}
    >
      {children}
      <LinearGradient
        colors={collapsed ? ["#ffffff00", "#ffffff99", "#fff"] : []}
        className="absolute bottom-0 w-full h-8"
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
