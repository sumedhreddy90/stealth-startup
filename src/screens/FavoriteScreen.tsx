import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, NewsListItemWideView, Separator } from "../components";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../navigations/NavigationNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { FavoritedNewsContext } from "../context";
import { useLocalization } from "../localization";

export const FavoriteScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { getString } = useLocalization();
  const { favoritedNews } = useContext(FavoritedNewsContext);

  const news = Object.keys(favoritedNews).map((a) => favoritedNews[a]);

  if (news.length == 0) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text>{getString("empty_favorites")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(_, index) => `newsItemKey${index}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push(NavigationNames.NewsDetailScreen, {
                model: { ...item },
              })
            }
          >
            <NewsListItemWideView item={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Separator />}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
