import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Separator,
  SectionHeader,
  HomeHeaderView,
  Divider,
  HomeHighlightedNewsView,
  NewsListItemWideView,
  HomeCategoriesItemView,
  ScrollableTabBarLayout,
} from "../components";
import { useLocalization } from "../localization";
import { useNavigation } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { useTheme } from "../theme";
import { DashboardService } from "../services";
import {
  DashboardModel,
  StoryModel,
  NewsModel,
  CategoryModel,
} from "../models";
import NavigationNames from "../navigations/NavigationNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { getImageUrl } from "../helpers";

export const HomeScreen = () => {
  const { getString } = useLocalization();
  const { colors, sizes } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [dashboardModel, setDashboardModel] = useState<DashboardModel>({
    categories: [],
    highlightedNews: [],
    topCategories: [],
    news: [],
    stories: [],
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchDashboardItems = () => {
    DashboardService.getDashboardItems()
      .then((res) => {
        setDashboardModel(res.data);
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => fetchDashboardItems(), []);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => fetchDashboardItems()}
          />
        }
      >
        {/* toolbar */}
        <HomeHeaderView />

        <Divider mh16 style={{ marginTop: 12 }} />

        {/* Stories */}
        <FlatList<StoryModel>
          data={dashboardModel.stories}
          horizontal
          ItemSeparatorComponent={() => <Separator horizontal width={8} />}
          contentContainerStyle={styles.flatListDefaultContainerStyle}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `storyItemKey${index}`}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(NavigationNames.StoryPreviewScreen, {
                  stories: [...dashboardModel.stories],
                  selectedIndex: index,
                })
              }
            >
              <Image
                source={{
                  uri: getImageUrl(item.thumbnailImageName),
                }}
                style={[
                  styles.storiesItemImage,
                  {
                    borderColor: item.relatedNews.category.color,
                  },
                ]}
              />
            </TouchableOpacity>
          )}
        />

        <Divider mh16 />

        {/* Highlighted News */}
        <HomeHighlightedNewsView
          news={dashboardModel.highlightedNews}
          onClickItem={(news) =>
            navigation.push(NavigationNames.NewsDetailScreen, {
              model: { ...news },
            })
          }
        />

        {/* Categories */}
        <SectionHeader title={getString("top_categories")} mTop={16} />

        <FlatList
          data={dashboardModel.topCategories}
          horizontal
          ItemSeparatorComponent={() => <Separator horizontal width={12} />}
          contentContainerStyle={styles.flatListDefaultContainerStyle}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => `topCategoryItemKey${index}`}
          renderItem={({ item }) => (
            <HomeCategoriesItemView
              item={item}
              onSelectedCategory={(category: CategoryModel) => {
                navigation.navigate(NavigationNames.SearchTab, {
                  screen: NavigationNames.SearchScreen,
                  params: { category: { ...category } },
                });
              }}
            />
          )}
        />

        {/* Latest News */}
        <SectionHeader title={getString("latest_news")} mTop={16} />

        <ScrollableTabBarLayout
          items={[
            { title: getString("today_upper"), color: colors.primaryColor },
            ...dashboardModel.categories.map((item) => {
              return { title: item.name, color: item.color };
            }),
          ]}
          selectedIndex={selectedCategoryIndex}
          onChangeSelected={setSelectedCategoryIndex}
        />

        <FlatList<NewsModel>
          data={
            selectedCategoryIndex === 0
              ? dashboardModel.news.slice(0, 5)
              : dashboardModel.news.filter(
                (item) =>
                  item.category.name ===
                  dashboardModel.categories[selectedCategoryIndex - 1].name
              )
          }
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={styles.flatListDefaultContainerStyle}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => `newsItemKey${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.push(NavigationNames.NewsDetailScreen, {
                  model: { ...item },
                })
              }
            >
              <NewsListItemWideView item={item} />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  storiesItemImage: {
    width: 60,
    height: 60,
    backgroundColor: "white",
    borderRadius: 80,
    borderWidth: 1.5,
  },
  flatListDefaultContainerStyle: { paddingHorizontal: 16, paddingVertical: 12 },
});
