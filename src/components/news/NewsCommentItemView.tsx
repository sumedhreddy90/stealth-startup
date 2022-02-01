import React from "react";
import { View, StyleSheet, Image } from "react-native";
import moment from "moment";
import { Text } from "../Text";
import { Box } from "../Box";
import { NewsCommentModel } from "../../models";
import { useTheme } from "../../theme";
import { getImageUrl } from "../../helpers";

type TProps = {
  item: NewsCommentModel;
};

export const NewsCommentItemView: React.FC<TProps> = ({ item }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Box style={{ alignSelf: "flex-start" }}>
        <Image
          source={{ uri: getImageUrl(item.user.imageName) }}
          style={styles.image}
        />
      </Box>
      <View style={styles.rowsContent}>
        <Text
          style={[styles.fullnameText, { color: colors.gray }]}
        >{`${item.user.firstName} ${item.user.lastName}`}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={[styles.timeText, { color: colors.gray }]}>
          {moment(item.createdAt).fromNow()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
  },
  image: { width: 48, aspectRatio: 1, borderRadius: 12 },
  rowsContent: { flex: 1, paddingHorizontal: 12 },
  fullnameText: {
    fontFamily: "default-bold",
    fontSize: 13,
  },
  messageText: { fontSize: 15 },
  timeText: {
    fontFamily: "default-medium",
    fontSize: 12,
  },
});
