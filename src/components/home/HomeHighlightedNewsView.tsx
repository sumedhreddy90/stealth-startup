import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient";
import { Box } from "../Box";
import { Text } from "../Text";
import { Icon } from "../Icon";
import { useTheme } from "../../theme";
import { NewsImageTagView } from "../news/NewsImageTagView";
import { NewsModel } from "../../models";
import moment from "moment";
import { useLocalization } from "../../localization";
import { getImageUrl } from "../../helpers";
import { FavoritedNewsContext, AuthenticationContext } from "../../context";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import { NewsService } from "../../services";

const WIDTH = Dimensions.get("screen").width;

type TProps = {
  news: NewsModel[];
  onClickItem: (item: NewsModel) => void;
};

export const HomeHighlightedNewsView: React.FC<TProps> = ({
  news,
  onClickItem,
}) => {
  const { isLoggedIn } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { getString } = useLocalization();
  const [paginationIndex, setPaginationIndex] = useState(0);

  const { favoriteNews, favoritedNews } = useContext(FavoritedNewsContext);

  const onClickFavorite = (item: NewsModel, isFavorited: boolean) => {
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
    <>
      <Carousel<NewsModel>
        data={news}
        renderItem={({ item }) => {
          const isFavorited = favoritedNews.hasOwnProperty(item.id);
          return (
            <TouchableOpacity
              onPress={() => onClickItem(item)}
              activeOpacity={1}
            >
              <Box>
                <ImageBackground
                  source={{
                    uri: getImageUrl(item.imageName),
                  }}
                  style={styles.itemImageBackgroundStyle}
                  imageStyle={styles.itemImageBackgroundImageStyle}
                >
                  <NewsImageTagView
                    title={item.category.name}
                    color={item.category.color}
                  />

                  <TouchableOpacity
                    style={styles.itemFavoriteButton}
                    onPress={() => onClickFavorite(item, isFavorited)}
                  >
                    <Icon
                      group="MaterialIcons"
                      name={isFavorited ? "bookmark" : "bookmark-border"}
                      color="white"
                      size={28}
                    />
                  </TouchableOpacity>

                  <LinearGradient
                    colors={["transparent", "black"]}
                    style={styles.itemDescContent}
                    pointerEvents="none"
                  >
                    <Text style={styles.itemDescTitle} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <View style={styles.itemDescInfoView}>
                      <Icon name="md-time" color="white" size={16} />
                      <Text
                        style={[
                          { color: colors.lightgray, marginEnd: 12 },
                          styles.itemDescInfoDate,
                        ]}
                      >
                        {moment(item.createdAt).fromNow()}
                      </Text>
                      <Icon
                        group="FontAwesome5"
                        name="comment-alt"
                        color="white"
                        size={13}
                      />
                      <Text
                        style={[
                          { color: colors.lightgray },
                          styles.itemDescInfoDate,
                        ]}
                      >
                        {getString("comments_with_count", {
                          count: item.commentsCount,
                        })}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </Box>
            </TouchableOpacity>
          );
        }}
        layout={"tinder"}
        layoutCardOffset={8}
        sliderWidth={WIDTH}
        itemWidth={WIDTH - 32}
        contentContainerCustomStyle={styles.carouselContentStyle}
        onSnapToItem={setPaginationIndex}
      />
      <Pagination
        activeDotIndex={paginationIndex}
        dotsLength={news.length}
        dotColor={colors.primaryColor}
        inactiveDotColor={colors.lightgray}
        inactiveDotScale={0.8}
        inactiveDotOpacity={0.8}
        containerStyle={styles.paginationContainerStyle}
        dotStyle={styles.paginationDotStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  carouselContentStyle: { paddingVertical: 12 },
  paginationContainerStyle: { paddingVertical: 0, marginTop: 6 },
  paginationDotStyle: { marginHorizontal: -20 },
  itemImageBackgroundStyle: {
    aspectRatio: 12 / 9,
  },
  itemImageBackgroundImageStyle: { borderRadius: 12 },
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
  itemDescContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  itemDescTitle: {
    color: "white",
    fontSize: 26,
    marginTop: 12,
    fontFamily: "default-medium",
  },
  itemDescInfoView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  itemDescInfoDate: {
    fontSize: 13,
    fontFamily: "default-medium",
    marginStart: 6,
  },
});
