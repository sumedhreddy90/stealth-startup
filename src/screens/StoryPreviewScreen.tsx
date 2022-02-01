import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Text, NewsImageTagView, Box, Icon, HtmlView } from "../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import SafeAreaView from "react-native-safe-area-view";
import { LinearGradient } from "expo-linear-gradient";
import { StoryModel } from "../models";
import ViewPager from "@react-native-community/viewpager";
import { Pagination } from "react-native-snap-carousel";
import { useTheme } from "../theme";
import moment from "moment";
import { StackNavigationProp } from "@react-navigation/stack";
import NavigationNames from "../navigations/NavigationNames";
import { getImageUrl } from "../helpers";

const WIDTH = Dimensions.get("window").width;

export const StoryPreviewScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { params } = useRoute();
  const { colors, sizes } = useTheme();

  const [selectedIndex, setSelectedIndex] = useState(
    (params as any)["selectedIndex"] as number
  );
  const stories = (params as any)["stories"] as StoryModel[];

  navigation.setOptions({
    cardStyle: {
      backgroundColor: "black",
    },
  });
  return (
    <>
      <ViewPager
        style={styles.flex1}
        initialPage={selectedIndex}
        onPageSelected={(e) => setSelectedIndex(e.nativeEvent.position)}
      >
        {stories.map((story, index) => (
          <ImageBackground
            key={index}
            source={{ uri: getImageUrl(story.storyImageName) }}
            style={styles.container}
          >
            <LinearGradient
              colors={["transparent", "black"]}
              style={styles.flex1}
            >
              <SafeAreaView
                style={styles.flex1}
                forceInset={{ bottom: "always", top: "always" }}
              >
                <ScrollView
                  style={styles.flex1}
                  contentContainerStyle={styles.itemScrollViewContainer}
                >
                  <NewsImageTagView
                    color={story.relatedNews.category.color}
                    title={story.relatedNews.category.name}
                    style={styles.itemTag}
                  />
                  <Text style={styles.itemTitle}>{story.title}</Text>
                  <HtmlView
                    fontStyle={styles.itemContent}
                    imagesMaxWidthOffset={WIDTH - 32}
                    htmlContent={story.content}
                  />
                  <View style={styles.itemDescInfoView}>
                    <Icon name="md-time" color="white" size={16} />
                    <Text
                      style={[
                        { color: colors.lightgray, marginEnd: 12 },
                        styles.itemDescInfoDate,
                      ]}
                    >
                      {moment(story.createdAt).fromNow()}
                    </Text>
                  </View>
                  <Text style={styles.itemReleatedNews}>Releated News</Text>
                  <TouchableOpacity
                    style={styles.itemReleatedNewsContainer}
                    onPress={() => {
                      const goDetail = () => {
                        navigation.navigate(
                          NavigationNames.NewsDetailForStoryScreen,
                          {
                            model: { ...story.relatedNews },
                          }
                        );
                        navigation.removeListener("transitionEnd", goDetail);
                      };
                      navigation.addListener("transitionEnd", goDetail);
                      navigation.goBack();
                    }}
                  >
                    <Image
                      source={{ uri: getImageUrl(story.relatedNews.imageName) }}
                      style={styles.itemReleatedNewsImage}
                    />
                    <View style={{ flex: 1, paddingHorizontal: 12 }}>
                      <Text
                        style={styles.itemReleatedNewsTitle}
                        numberOfLines={3}
                      >
                        {story.relatedNews.title}
                      </Text>
                    </View>
                    <Icon
                      name="ios-arrow-forward"
                      color="white"
                      style={styles.itemReleatedNewsEndIcon}
                    />
                  </TouchableOpacity>
                </ScrollView>
              </SafeAreaView>
            </LinearGradient>
          </ImageBackground>
        ))}
      </ViewPager>
      <SafeAreaView
        style={styles.headerSafeArea}
        forceInset={{ top: "always" }}
      >
        <View style={styles.topButton} />
        <Pagination
          activeDotIndex={selectedIndex}
          dotsLength={stories.length}
          dotColor={colors.primaryColor}
          inactiveDotColor={colors.lightgray}
          inactiveDotScale={0.8}
          inactiveDotOpacity={0.8}
          containerStyle={styles.paginationContainerStyle}
          dotStyle={styles.paginationDotStyle}
        />
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="md-close" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex1: { flex: 1 },
  itemScrollViewContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTag: { position: "relative", top: 0, start: 0 },
  itemTitle: { fontSize: 26, color: "white", marginTop: 12 },
  itemContent: {
    fontSize: 16,
    color: "white",
    opacity: 0.6,
    marginTop: 8,
  },
  itemDescInfoView: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.7,
  },
  itemDescInfoDate: {
    fontSize: 13,
    fontFamily: "default-medium",
    marginStart: 6,
  },
  itemReleatedNews: {
    color: "white",
    opacity: 0.8,
    marginTop: 12,
    marginBottom: 8,
  },
  itemReleatedNewsContainer: {
    backgroundColor: "#000000AA",
    borderColor: "#FFFFFF20",
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  itemReleatedNewsImage: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF30",
  },
  itemReleatedNewsTitle: { color: "white", opacity: 0.7 },
  itemReleatedNewsEndIcon: { opacity: 0.7 },
  paginationContainerStyle: {
    paddingVertical: 0,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  paginationDotStyle: { marginHorizontal: -20 },
  topButton: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  headerSafeArea: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    start: 0,
    end: 0,
    top: 0,
  },
});
