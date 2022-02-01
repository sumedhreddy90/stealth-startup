import { Octicons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  StyleProp,
} from "react-native";

import { useTheme } from "../theme";
import { Text } from "./Text";
import { Box } from "./Box";

type TProps = {
  isChecked: boolean;
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
};

export const CheckBox: React.FC<TProps> = (props) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      <Box style={[styles.box]}>
        <Octicons
          name="check"
          size={16}
          color={props.isChecked ? colors.primaryColor : colors.lightgray}
          style={styles.icon}
        />
      </Box>
      <Text
        style={[
          styles.text,
          {
            color: props.isChecked ? colors.primaryColor : colors.lightgray,
          },
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 248,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  icon: { marginTop: 2 },
  text: {
    marginStart: 12,
    fontSize: 15,
    marginTop: 2,
  },
});
