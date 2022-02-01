import React from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Separator } from "./Separator";
import { useTheme } from "../theme";
import { Text } from "./Text";

type TProps = {
  items: {
    title: string;
    color: string;
  }[];
  selectedIndex: number;
  onChangeSelected: (index: number) => void;
};

export const ScrollableTabBarLayout: React.FC<TProps> = ({
  items,
  selectedIndex = 0,
  onChangeSelected,
}) => {
  const { colors } = useTheme();
  return (
    <FlatList
      data={items}
      horizontal
      ItemSeparatorComponent={() => <Separator horizontal width={12} />}
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => `scrollableItemKey${index}`}
      renderItem={({ index, item }) => {
        const isSelected = index == selectedIndex;

        const shadow = isSelected && {
          shadowColor: "#00000020",
          shadowOffset: {
            height: 2,
            width: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 2,
        };

        return (
          <TouchableOpacity
            style={{
              backgroundColor: isSelected ? item.color : "transparent",
              paddingVertical: 4,
              paddingHorizontal: isSelected ? 16 : 8,
              borderRadius: 6,
              ...shadow,
            }}
            onPress={() => onChangeSelected(index)}
          >
            <Text
              style={{
                marginTop: 2,
                fontFamily: "default-bold",
                color: isSelected ? "white" : colors.lightgray,
              }}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 4,
  },
});
