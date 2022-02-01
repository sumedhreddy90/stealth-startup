import React from "react";
import { View } from "react-native";

type TProps = {
  vertical?: boolean;
  horizontal?: boolean;
  width?: number;
  height?: number;
};

export const Separator: React.FC<TProps> = ({
  vertical,
  horizontal,
  width,
  height,
}) => {
  return (
    <View
      style={[
        !vertical && !horizontal && { height: height ?? 16 },
        horizontal && { width: width ?? 16 },
      ]}
    />
  );
};
