import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../theme";

type TProps = {
  style?: ViewStyle;
  mh16?: boolean;
};

export const Divider: React.FC<TProps> = ({ style, mh16 }) => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        {
          height: StyleSheet.hairlineWidth,
          backgroundColor: colors.borderColor,
        },
        style,
        mh16 && { marginHorizontal: 16 },
      ]}
    />
  );
};
