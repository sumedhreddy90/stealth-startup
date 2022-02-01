import React from "react";
import { StyleSheet, Image, I18nManager, TouchableOpacity } from "react-native";
import { Box } from "../Box";
import { CategoryModel } from "../../models";
import { useTheme } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import { Text } from "../Text";
import { getImageUrl } from "../../helpers";

type TProps = {
  item: CategoryModel;
  onSelectedCategory: (category: CategoryModel) => void;
};

export const SearchCategoryItemView: React.FC<TProps> = ({
  item,
  onSelectedCategory,
}) => {
  const { sizes } = useTheme();
  return (
    <TouchableOpacity onPress={() => onSelectedCategory(item)}>
      <Box style={styles.container}>
        <Image
          source={{
            uri: getImageUrl(item.imageName),
          }}
          style={[
            StyleSheet.absoluteFill,
            { borderRadius: sizes.boxRadius, opacity: 0.7 },
          ]}
        />
        <LinearGradient
          colors={[item.color, "transparent"]}
          start={I18nManager.isRTL ? [1, 0] : [0, 1]}
          end={I18nManager.isRTL ? [0, 1] : [1, 0]}
          style={[StyleSheet.absoluteFill, { borderRadius: sizes.boxRadius }]}
          pointerEvents="none"
        />
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.countText}>{item.newsCount} news about this</Text>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  nameText: {
    fontSize: 28,
    fontFamily: "default-regular",
    color: "white",
    elevation: 2,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  countText: {
    fontSize: 15,
    fontFamily: "default-bold",
    color: "white",
    opacity: 0.8,
    elevation: 2,
    shadowColor: "#00000020",
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
});
