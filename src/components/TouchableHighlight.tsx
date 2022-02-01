import React from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { TouchableHighlight as RCTouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "../theme";

type TProps = {
  underlayColor?: string;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
};

export const TouchableHighlight: React.FC<TProps> = (props) => {
  const { colors } = useTheme();
  return (
    <RCTouchableHighlight
      underlayColor={
        props.underlayColor || colors.touchableHighlightUnderlayColor
      }
      onPress={props.onPress}
      style={props.style}
    >
      {props.children}
    </RCTouchableHighlight>
  );
};
