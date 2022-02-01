import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Box } from "../Box";
import { useTheme } from "../../theme";

type TProps = {
  title: string;
  color: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const NewsImageTagView: React.FC<TProps> = ({
  title,
  style,
  color,
  titleStyle,
}) => {
  return (
    <Box
      style={[
        styles.itemTagBox,
        {
          backgroundColor: color,
        },
        style,
      ]}
    >
      <Text style={[styles.itemTagTitle, titleStyle]}>{title}</Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  itemTagBox: {
    borderWidth: 0,
    alignSelf: "flex-start",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    position: "absolute",
    start: 16,
    top: 16,
  },
  itemTagTitle: {
    color: "white",
    fontFamily: "default-bold",
    fontSize: 12,
    paddingTop: 2,
  },
});
