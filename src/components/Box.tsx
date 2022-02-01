import React from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  I18nManager,
} from "react-native";
import { useTheme } from "../theme";

type TProps = {
  style?: StyleProp<ViewStyle>;
};

export const Box: React.FC<TProps> = ({ children, style }) => {
  const { isDark, colors, sizes } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.windowBackground,
          borderRadius: sizes.boxRadius,
          borderColor: colors.borderColor,
          borderWidth: isDark ? 0.5 : StyleSheet.hairlineWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#00000020",
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
});
