import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Box } from "../Box";
import { NewsModel } from "../../models";
import { Text } from "../Text";
import { getImageUrl } from "../../helpers";

type TProps = {
  item: NewsModel;
};

export const NewsListItemSquareView: React.FC<TProps> = ({ item }) => {
  return (
    <Box style={styles.container}>
      <Image
        source={{ uri: getImageUrl(item.imageName) }}
        style={styles.image}
      />
      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: { width: 140, marginVertical: 12 },
  image: {
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontFamily: "default-medium",
  },
});
