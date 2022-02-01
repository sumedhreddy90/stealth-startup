import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, TextInput, PrimaryButton } from "../components";
import { useLocalization } from "../localization";
import { NewsService, NewsCommentService } from "../services";
import { useRoute, useNavigation } from "@react-navigation/native";

type TProps = {};

export const WriteCommentScreen: React.FC<TProps> = (props) => {
  const { params } = useRoute();
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const [commentText, setCommentText] = useState("");

  const newsId = (params as any)["newsId"];

  const sendCommend = () => {
    if (commentText === "") {
      alert(getString("empty_new_comment_alert"));
      return;
    }
    NewsCommentService.post(newsId, commentText)
      .then(() => navigation.goBack())
      .catch((err) => alert(err.message));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <TextInput
        inputProps={{
          placeholder: getString("write_something"),
          multiline: true,
          textAlignVertical: "top",
          style: {
            height: "auto",
            maxHeight: 300,
            minHeight: 140,
            paddingTop: 12,
            paddingBottom: 12,
          },
          value: commentText,
          onChangeText: setCommentText,
        }}
      />
      <PrimaryButton
        title={getString("send")}
        style={{ marginTop: 16 }}
        onPress={sendCommend}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainerStyle: { padding: 16 },
});
