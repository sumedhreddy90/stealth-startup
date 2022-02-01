import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Share,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import {
  Text,
  Divider,
  NewsImageTagView,
  Box,
  Icon,
  HtmlView,
  SectionHeader,
  Separator,
  NewsCommentItemView,
  NewsListItemSquareView,
} from "../components";
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import { NewsModel, NewsCommentModel } from "../models";
import {
  HeaderButton,
  HeaderButtons,
  Item,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";
import moment from "moment";
import { useLocalization } from "../localization";
import NavigationNames from "../navigations/NavigationNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { FavoritedNewsContext, AuthenticationContext } from "../context";
import { getImageUrl } from "../helpers";
import { NewsService } from "../services";

const WIDTH = Dimensions.get("window").width;

const IoniconsHeaderButton = (props: any) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={24}
    color={"white"}
  />
);

const EmptyCommentsView: React.FC<{ newsId: number }> = ({ newsId }) => {
  const authContext = useContext(AuthenticationContext);
  const { colors } = useTheme();
  const { getString } = useLocalization();
  const navigation = useNavigation();

  return (
    <View style={styles.emptyCommentsViewContainer}>
      <Icon
        group="FontAwesome5"
        name="comment-alt"
        color={colors.gray}
        size={18}
      />
      <Text style={[styles.emptyCommentsViewText, { color: colors.gray }]}>
        {getString("no_comments_yet")}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (authContext.isLoggedIn) {
            navigation.navigate(NavigationNames.WriteCommentScreen, {
              newsId: newsId,
            });
          } else {
            navigation.navigate(NavigationNames.RootLoginScreen);
          }
        }}
      >
        <Box style={{ paddingVertical: 4, paddingHorizontal: 12 }}>
          <Text>{getString("write_comment")}</Text>
        </Box>
      </TouchableOpacity>
    </View>
  );
};

export const NewsDetailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { isLoggedIn } = useContext(AuthenticationContext);

  const { params } = useRoute();
  const { colors } = useTheme();
  const { getString } = useLocalization();

  const [model, setModel] = useState<NewsModel>(
    (params as any)["model"] as NewsModel
  );
  const [otherNews, setOtherNews] = useState<NewsModel[]>([]);
  const refOtherNewsCount = useRef(0);

  const { favoriteNews, favoritedNews } = useContext(FavoritedNewsContext);
  const isFavorited = favoritedNews.hasOwnProperty(model.id);

  const animation = useMemo(() => new Animated.Value(0), []);

  const opacity = animation.interpolate({
    inputRange: [0, 1, 200],
    outputRange: [0, 0, 1],
    extrapolate: "clamp",
  });

  const opacityReverse = animation.interpolate({
    inputRange: [1, 1, 100],
    outputRange: [1, 1, 0],
    extrapolate: "clamp",
  });

  useEffect(() => {
    navigation.setOptions({
      title: model.title,
      headerTransparent: true,
      headerTintColor: "white",
      headerTitleStyle: { opacity },
      headerBackground: () => (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            styles.headerView,
            { backgroundColor: model.category.color, opacity },
          ]}
        ></Animated.View>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title=""
            iconName="md-share"
            onPress={() =>
              Share.share({
                title: model.title,
                message: model.content,
              })
            }
          />
        </HeaderButtons>
      ),
    });
  }, [opacity])

  useFocusEffect(
    React.useCallback(() => {
      NewsService.get(model.id).then((res) => {
        setModel(res.data.news);
        if (refOtherNewsCount.current === 0) {
          setOtherNews(res.data.otherNews);
          refOtherNewsCount.current = res.data.otherNews.length;
        }
      });
    }, [model.id])
  );

  const onClickFavorite = () => {
    if (!isLoggedIn) {
      navigation.navigate(NavigationNames.RootLoginScreen);
      return;
    }
    NewsService.favoriteNews(model.id, !isFavorited)
      .then((_) => {
        favoriteNews(model, !isFavorited);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animation } } },
        ], { useNativeDriver: false })}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        {/* Header Start */}
        <View>
          <Image
            source={{ uri: getImageUrl(model.imageName) }}
            style={styles.previewImage}
          />
          <NewsImageTagView
            title={model.category.name}
            color={model.category.color}
            style={styles.newsTagView}
            titleStyle={styles.newsTagTitle}
          />
          <TouchableOpacity
            style={styles.bookmarkButtonContainer}
            onPress={onClickFavorite}
          >
            <Box style={styles.bookmarkButtonBox}>
              <Icon
                group="MaterialIcons"
                name={isFavorited ? "bookmark" : "bookmark-border"}
                color={model.category.color}
                size={21}
              />
            </Box>
          </TouchableOpacity>
        </View>
        {/* Header End */}

        {/* Desc Start */}
        <View style={styles.newsContentContainer}>
          <Text style={styles.newsTitle}>{model.title}</Text>
          <View style={{ marginTop: 8 }}>
            <HtmlView
              htmlContent={model.content}
              imagesMaxWidthOffset={WIDTH - 32}
            />
          </View>
        </View>
        {/* Desc End */}
        <Divider />
        {/* Comments Start */}
        <View style={{ paddingVertical: 16 }}>
          <SectionHeader
            title={getString("comments")}
            endTitle={getString("more")}
            endAction={() => {
              navigation.navigate(NavigationNames.NewsCommentsScreen, {
                newsId: model.id,
              });
            }}
            titleStyle={{ fontSize: 18 }}
          />
          {model.commentsCount === 0 || model.topComments?.length === 0 ? (
            <EmptyCommentsView newsId={model.id} />
          ) : (
              <FlatList<NewsCommentModel>
                data={model.topComments}
                keyExtractor={(_, index) => `keyNewsItem${index}`}
                ItemSeparatorComponent={() => <Divider mh16 />}
                renderItem={({ item }) => <NewsCommentItemView item={item} />}
              />
            )}
        </View>
        {/* Comments End */}
        <Divider />
        {/* Other News Start */}
        <View style={{ paddingVertical: 16 }}>
          <SectionHeader
            title={getString("other_news")}
            titleStyle={{ fontSize: 18 }}
          />
          <FlatList
            data={otherNews}
            horizontal
            ItemSeparatorComponent={() => <Separator horizontal />}
            keyExtractor={(_, index) => `otherNewsItemKey${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.push(NavigationNames.NewsDetailScreen, {
                    model: { ...item },
                  });
                }}
              >
                <NewsListItemSquareView item={item} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        {/* Other News End */}
      </ScrollView>

      {/* InfoBar Start */}
      <Animated.View
        pointerEvents={"none"}
        style={[
          styles.bottomInfoContainer,
          {
            backgroundColor: colors.windowBackground,
            opacity: opacityReverse,
          },
        ]}
      >
        <Divider />
        <View style={styles.itemDescInfoView}>
          <Icon name="md-time" color={colors.gray} size={16} />
          <Text
            style={[
              { color: colors.gray, marginEnd: 12 },
              styles.itemDescInfoDate,
            ]}
          >
            {moment(model.createdAt).fromNow()}
          </Text>
          <Icon
            group="FontAwesome5"
            name="comment-alt"
            color={colors.gray}
            size={13}
          />
          <Text style={[{ color: colors.gray }, styles.itemDescInfoDate]}>
            {getString("comments_with_count", {
              count: model.commentsCount,
            })}
          </Text>
        </View>
      </Animated.View>
      {/* InfoBar End */}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollViewContainer: { paddingBottom: 42 },
  headerView: { backgroundColor: "white" },
  headerDivider: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  itemDescInfoView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#00000005",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  itemDescInfoDate: {
    fontSize: 13,
    fontFamily: "default-bold",
    marginStart: 6,
  },
  previewImage: {
    aspectRatio: 1,
  },
  newsTagView: { bottom: -13, top: undefined, start: 16 },
  newsTagTitle: { fontSize: 13 },
  bookmarkButtonContainer: {
    position: "absolute",
    end: 16,
    bottom: -17,
    flexDirection: "row",
  },
  bookmarkButtonBox: {
    width: 36,
    borderRadius: 100,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  newsContentContainer: { paddingHorizontal: 16, paddingVertical: 16 },
  newsTitle: {
    fontFamily: "default-medium",
    marginTop: 14,
    fontSize: 22,
  },
  bottomInfoContainer: {
    position: "absolute",
    bottom: 0,
    start: 0,
    end: 0,
  },
  emptyCommentsViewContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  emptyCommentsViewText: {
    flex: 1,
    marginStart: 8,
    fontFamily: "default-medium",
    fontSize: 15,
  },
});
