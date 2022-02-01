import React, { useState, useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { NewsCommentModel } from "../models";
import { NewsCommentItemView, Divider, Text } from "../components";
import { useTheme } from "../theme";
import NavigationNames from "../navigations/NavigationNames";
import { NewsCommentService } from "../services";
import { useLocalization } from "../localization";
import { AuthenticationContext } from "../context";

export const NewsCommentsScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { colors, sizes } = useTheme();
  const { getString } = useLocalization();
  const [comments, setComments] = useState<NewsCommentModel[]>([]);
  const authContext = useContext(AuthenticationContext);

  const newsId = (params as any)["newsId"];

  useFocusEffect(
    React.useCallback(() => {
      NewsCommentService.getAll(newsId).then((res) => {
        setComments(res.data);
      });
    }, [newsId])
  );

  return (
    <View style={styles.container}>
      <FlatList<NewsCommentModel>
        data={comments}
        keyExtractor={(_, index) => `commentItemKey${index}`}
        renderItem={({ item }) => <NewsCommentItemView item={item} />}
        ItemSeparatorComponent={() => <Divider mh16 />}
        contentContainerStyle={{ paddingVertical: 4 }}
        style={{ flex: 1 }}
      />
      <Divider />
      <TouchableOpacity
        style={{ paddingVertical: 16, paddingHorizontal: 16 }}
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
        <Text style={{ color: colors.gray }}>{getString("write_comment")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
