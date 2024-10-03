import React from "react";
import { StyleSheet, View, Text } from "react-native";

const Style = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
  },
  count: {
    color: "#fff",
    fontSize: 13,
  },
});

const ClusterMarker = ({ count }: { count: number }) => (
  <View style={Style.container}>
    <View className="bg-red-500 p-2 rounded-full">
      <Text style={Style.count}>{count}</Text>
    </View>
  </View>
);

export default ClusterMarker;
