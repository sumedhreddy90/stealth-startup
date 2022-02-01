import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  StyleSheet,
  I18nManager,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NewsListItemWideView, Separator } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTheme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import { CategoryModel, NewsModel } from "../models";
import { NewsService } from "../services";
import NavigationNames from "../navigations/NavigationNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { getImageUrl } from "../helpers";

export const CategoryDetailScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { params } = useRoute();
  const { colors } = useTheme();

  const category = (params as any)["model"] as CategoryModel;

  const [news, setNews] = useState<NewsModel[]>([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: category.name,
      headerTintColor: "white",
      headerBackground: () => (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.windowBackground },
          ]}
        >
          <Image
            source={{
              uri: getImageUrl(category.imageName),
            }}
            style={[StyleSheet.absoluteFill, { opacity: 0.7 }]}
          />
          <LinearGradient
            colors={[category.color, "transparent"]}
            start={I18nManager.isRTL ? [1, 0] : [0, 1]}
            end={I18nManager.isRTL ? [0, 1] : [1, 0]}
            style={[StyleSheet.absoluteFill]}
            pointerEvents="none"
          />
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    NewsService.getAllByCategory(category)
      .then((res) => setNews(res.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={styles.newsListContainerStyle}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => `categoryItemKey${index}`}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  newsListContainerStyle: { padding: 16 },
});
