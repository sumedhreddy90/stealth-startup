import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";
import { useTheme } from "../theme";

type TProps = {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const PrimaryButton: React.FC<TProps> = ({ title, onPress, style }) => {
  const { colors, sizes } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: colors.primaryColor,
          borderRadius: sizes.boxRadius,
        },
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 0,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },
  text: { color: "white", fontSize: 16, fontFamily: "default-medium" },
});
