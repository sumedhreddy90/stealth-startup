import React, { useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalization } from "../../localization";
import moment from "moment";
import { Icon } from "../Icon";
import { Avatar } from "../Avatar";
import { Text } from "../Text";
import { useTheme } from "../../theme";
import { AuthenticationContext } from "../../context";
import { getImageUrl } from "../../helpers";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";

type TProps = {};

export const HomeHeaderView: React.FC<TProps> = (props) => {
  const { colors } = useTheme();
  const { getString } = useLocalization();
  const navigation = useNavigation();
  const authContext = useContext(AuthenticationContext);

  return (
    <View style={styles.container}>
      <View style={styles.flex1}>
        <Text style={styles.headerTitleText}>{getString("today")}</Text>
        <Text style={styles.headerDateText}>
          {moment(new Date()).format("LL")}
        </Text>
      </View>
      <TouchableOpacity
        style={{ marginEnd: 16 }}
        onPress={() => navigation.navigate(NavigationNames.SearchTab)}
      >
        <Icon name="ios-search" size={25} ignoreRTL color={colors.gray} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          if (authContext.isLoggedIn) {
            navigation.navigate(NavigationNames.ProfileTab);
          } else {
            navigation.navigate(NavigationNames.RootLoginScreen);
          }
        }}
      >
        <Avatar
          imageStyle={styles.profileAvatarImage}
          style={[
            styles.profileAvatar,
            {
              borderColor: colors.lightgray,
              backgroundColor: colors.lightgray,
            },
          ]}
          source={{
            uri: getImageUrl(authContext.user?.imageName),
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  container: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
    paddingTop: 16,
  },
  headerTitleText: {
    fontSize: 38,
    fontFamily: "default-bold",
  },
  headerDateText: {
    fontSize: 14,
    fontFamily: "default-bold",
    marginTop: -2,
    color: "gray",
  },
  profileAvatar: {
    borderWidth: 1,
    borderRadius: 100,
  },
  profileAvatarImage: {
    width: 36,
    height: 36,
    borderRadius: 100,
  },
});
