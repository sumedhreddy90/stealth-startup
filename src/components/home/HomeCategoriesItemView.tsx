import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Box } from "../Box";
import { useTheme } from "../../theme";
import { CategoryModel } from "../../models";
import { getImageUrl } from "../../helpers";

type TProps = {
  item: CategoryModel;
  onSelectedCategory: (category: CategoryModel) => void;
};

export const HomeCategoriesItemView: React.FC<TProps> = ({
  item,
  onSelectedCategory,
}) => {
  const { sizes } = useTheme();
  return (
    <TouchableOpacity onPress={() => onSelectedCategory(item)}>
      <Box>
        <ImageBackground
          source={{
            uri: getImageUrl(item.imageName),
          }}
          imageStyle={[{ borderRadius: sizes.boxRadius }, styles.image]}
          style={[{ borderRadius: sizes.boxRadius }, styles.container]}
        >
          <Text style={styles.text} numberOfLines={1}>
            {item.name}
          </Text>
        </ImageBackground>
      </Box>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    opacity: 0.8,
  },
  text: {
    fontFamily: "default-medium",
    color: "white",
    marginTop: 4,
    fontSize: 18,
  },
});
