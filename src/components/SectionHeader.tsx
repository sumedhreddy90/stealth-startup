import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";
import { Text } from "./Text";

type TProps = {
  title: string;
  mTop?: number;
  endTitle?: string;
  endAction?: () => void;
  titleStyle?: StyleProp<TextStyle>;
};

export const SectionHeader: React.FC<TProps> = ({
  title,
  mTop,
  endTitle,
  endAction,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, mTop ? { marginTop: mTop } : null]}>
      <Text style={[styles.titleText, titleStyle]}>{title}</Text>
      <TouchableOpacity onPress={endAction}>
        <Text style={styles.endTitleText}>{endTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontFamily: "default-bold",
    fontSize: 20,
  },
  endTitleText: {
    fontFamily: "default-medium",
    fontSize: 16,
  },
});
