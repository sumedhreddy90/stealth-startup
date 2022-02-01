import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Box } from "../Box";
import { useTheme } from "../../theme";
import { Icon } from "../Icon";
import { NewsImageTagView } from "./NewsImageTagView";
import { NewsModel } from "../../models";
import moment from "moment";
import { useLocalization } from "../../localization";
import { FavoritedNewsContext, AuthenticationContext } from "../../context";
import { getImageUrl } from "../../helpers";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewsService } from "../../services";

type TProps = {
  item: NewsModel;
};

export const NewsListItemWideView: React.FC<TProps> = ({ item }) => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const { sizes, colors } = useTheme();
  const { getString } = useLocalization();
  const navigation = useNavigation();

  const { favoritedNews, favoriteNews } = useContext(FavoritedNewsContext);
  const isFavorited = favoritedNews.hasOwnProperty(item.id);

  const onClickFavorite = () => {
    if (!isLoggedIn) {
      navigation.navigate(NavigationNames.RootLoginScreen);
      return;
    }
    NewsService.favoriteNews(item.id, !isFavorited)
      .then((_) => {
        favoriteNews(item, !isFavorited);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <Box>
      <ImageBackground
        source={{
          uri: getImageUrl(item.imageName),
        }}
        imageStyle={{
          borderTopLeftRadius: sizes.boxRadius,
          borderTopRightRadius: sizes.boxRadius,
        }}
        style={[
          {
            borderTopLeftRadius: sizes.boxRadius,
            borderTopRightRadius: sizes.boxRadius,
          },
          styles.image,
        ]}
      >
        <NewsImageTagView
          title={item.category.name}
          color={item.category.color}
        />
        <TouchableOpacity
          style={styles.itemFavoriteButton}
          onPress={onClickFavorite}
        >
          <Icon
            group="MaterialIcons"
            name={isFavorited ? "bookmark" : "bookmark-border"}
            color="white"
            size={28}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={{ paddingHorizontal: 12, paddingVertical: 12 }}>
        <Text
          style={[styles.text, { color: colors.textColor }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <View style={styles.itemDescInfoView}>
          <Icon name="md-time" color={colors.gray} size={16} />
          <Text
            style={[
              { color: colors.gray, marginEnd: 12 },
              styles.itemDescInfoDate,
            ]}
          >
            {moment(item.createdAt).fromNow()}
          </Text>
          <Icon
            group="FontAwesome5"
            name="comment-alt"
            color={colors.gray}
            size={13}
          />
          <Text style={[{ color: colors.gray }, styles.itemDescInfoDate]}>
            {getString("comments_with_count", {
              count: item.commentsCount,
            })}
          </Text>
        </View>
      </View>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 16 / 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemFavoriteButton: {
    position: "absolute",
    end: 16,
    top: 14,
    shadowColor: "#00000050",
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  text: {
    fontFamily: "default-medium",
    marginTop: 4,
    fontSize: 16,
  },
  itemDescInfoView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  itemDescInfoDate: {
    fontSize: 13,
    fontFamily: "default-bold",
    marginStart: 6,
  },
});
