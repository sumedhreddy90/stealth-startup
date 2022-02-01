import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  TextInput,
  SectionHeader,
  Separator,
  SearchCategoryItemView,
  NewsListItemWideView,
  Text,
} from "../components";
import SafeAreaView from "react-native-safe-area-view";
import { CategoryModel, NewsModel } from "../models";
import { CategoryService, NewsService } from "../services";
import { useNavigation, useRoute } from "@react-navigation/native";
import NavigationNames from "../navigations/NavigationNames";
import { useLocalization } from "../localization";
import { StackNavigationProp } from "@react-navigation/stack";

export const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { getString } = useLocalization();
  const { params } = useRoute();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedNews, setSearchedNews] = useState<NewsModel[]>([]);

  const searchNews = () => {
    if (searchText === "") {
      setSearchedNews([]);
      return;
    }
    NewsService.search(searchText)
      .then((res) => setSearchedNews(res.data))
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    CategoryService.getCategories().then((res) => setCategories(res.data));

    if (params) {
      const category = (params as any)["category"];
      if (category) {
        navigation.navigate(NavigationNames.CategoryDetailScreen, {
          model: { ...category },
        });
      }
    }
  }, [params]);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <TextInput
        inputProps={{
          placeholder: getString("search"),
          value: searchText,
          returnKeyType: "search",
          onChangeText: setSearchText,
          onSubmitEditing: searchNews,
        }}
        style={styles.searchInput}
      />

      {searchText === "" ? (
        <FlatList<CategoryModel>
          data={categories}
          ListHeaderComponent={() => (
            <SectionHeader title={getString("all_categories")} />
          )}
          ListHeaderComponentStyle={{
            paddingBottom: 12,
          }}
          contentContainerStyle={{ paddingVertical: 12 }}
          ItemSeparatorComponent={() => <Separator />}
          keyExtractor={(_, index) => `categoryItemKey${index}`}
          renderItem={({ item }) => (
            <SearchCategoryItemView
              item={item}
              onSelectedCategory={(category: CategoryModel) =>
                navigation.navigate(NavigationNames.CategoryDetailScreen, {
                  model: { ...category },
                })
              }
            />
          )}
        />
      ) : (
        <FlatList
          data={searchedNews}
          ItemSeparatorComponent={() => <Separator />}
          contentContainerStyle={styles.newsListContainerStyle}
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
          ListEmptyComponent={() => <Text>{getString("not_found_news")}</Text>}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 16,
  },
  newsListContainerStyle: { padding: 16 },
});
