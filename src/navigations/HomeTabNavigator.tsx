import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from "@react-navigation/bottom-tabs";
import NavigationNames from "./NavigationNames";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useTheme } from "../theme";
import { View, StyleSheet } from "react-native";
import { Text } from "../components";
import {
  HomeScreen,
  SearchScreen,
  FavoriteScreen,
  ProfileScreen,
  MenuScreen,
  NewsDetailScreen,
  NewsCommentsScreen,
  WriteCommentScreen,
  CategoryDetailScreen,
  AboutUsScreen,
  PrivacyPolicyScreen,
} from "../screens";
import { useLocalization } from "../localization";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationContext } from "../context";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const defaultNavigatorScreenOptions = {
  headerTitleStyle: {
    fontFamily: "default-bold",
    fontSize: 18,
  },
  headerTintColor: "#41bafe",
  headerBackTitleVisible: false,
};

const HomeStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator
      screenOptions={defaultNavigatorScreenOptions}
      headerMode="screen"
    >
      <Stack.Screen name={NavigationNames.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={NavigationNames.NewsDetailScreen}
        component={NewsDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewsDetailForStoryScreen}
        component={NewsDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewsCommentsScreen}
        options={{ title: getString("comments") }}
        component={NewsCommentsScreen}
      />
      <Stack.Screen
        name={NavigationNames.WriteCommentScreen}
        options={{ title: getString("write_comment") }}
        component={WriteCommentScreen}
      />
    </Stack.Navigator>
  );
};

const SearchStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator
      screenOptions={defaultNavigatorScreenOptions}
      headerMode="screen"
    >
      <Stack.Screen
        name={NavigationNames.SearchScreen}
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NavigationNames.CategoryDetailScreen}
        component={CategoryDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewsDetailScreen}
        component={NewsDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewsCommentsScreen}
        options={{ title: getString("comments") }}
        component={NewsCommentsScreen}
      />
      <Stack.Screen
        name={NavigationNames.WriteCommentScreen}
        options={{ title: getString("write_comment") }}
        component={WriteCommentScreen}
      />
    </Stack.Navigator>
  );
};

const FavoriteStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator
      screenOptions={defaultNavigatorScreenOptions}
      headerMode="screen"
    >
      <Stack.Screen
        name={NavigationNames.FavoriteScreen}
        component={FavoriteScreen}
        options={{ title: getString("favorites") }}
      />
      <Stack.Screen
        name={NavigationNames.NewsDetailScreen}
        component={NewsDetailScreen}
      />
      <Stack.Screen
        name={NavigationNames.NewsCommentsScreen}
        options={{ title: getString("comments") }}
        component={NewsCommentsScreen}
      />
      <Stack.Screen
        name={NavigationNames.WriteCommentScreen}
        options={{ title: getString("write_comment") }}
        component={WriteCommentScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={defaultNavigatorScreenOptions}
      headerMode="screen"
    >
      <Stack.Screen
        name={NavigationNames.ProfileScreen}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MenuStack = () => {
  const { getString } = useLocalization();
  return (
    <Stack.Navigator
      screenOptions={defaultNavigatorScreenOptions}
      headerMode="screen"
    >
      <Stack.Screen
        name={NavigationNames.MenuScreen}
        component={MenuScreen}
        options={{ title: getString("menu") }}
      />
      <Stack.Screen
        name={NavigationNames.AboutUsScreen}
        component={AboutUsScreen}
        options={{ title: getString("about_us") }}
      />
      <Stack.Screen
        name={NavigationNames.PrivacyPolicyScreen}
        component={PrivacyPolicyScreen}
        options={{ title: getString("privacy_policy") }}
      />
    </Stack.Navigator>
  );
};

export default function HomeTabNavigator() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const authContext = React.useContext(AuthenticationContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          size = 26;
          if (route.name === NavigationNames.HomeTab) {
            icon = <AntDesign name={"home"} size={size} color={color} />;
          } else if (route.name === NavigationNames.SearchTab) {
            icon = <Feather name={"search"} size={size} color={color} />;
          } else if (route.name === NavigationNames.FavoriteTab) {
            icon = <Feather name={"bookmark"} size={size} color={color} />;
          } else if (route.name === NavigationNames.ProfileTab) {
            icon = <Feather name={"user"} size={size} color={color} />;
          } else if (route.name === NavigationNames.MenuTab) {
            icon = <Feather name={"menu"} size={size} color={color} />;
          }
          return (
            <View
              style={{
                backgroundColor: focused
                  ? colors.primaryColor + "10"
                  : "transparent",
                borderRadius: 100,
                padding: 8,
                aspectRatio: 1,
                alignItems: "center",
              }}
            >
              {icon}
            </View>
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.tabBarActive,
        inactiveTintColor: colors.tabBarInactive,
        showLabel: false,
      }}
    >
      <Tab.Screen name={NavigationNames.HomeTab} component={HomeStack} />
      <Tab.Screen name={NavigationNames.SearchTab} component={SearchStack} />
      <Tab.Screen
        name={NavigationNames.FavoriteTab}
        component={FavoriteStack}
        listeners={{
          tabPress: (e) => {
            if (authContext.isLoggedIn) {
              return;
            }
            e.preventDefault();
            navigation.navigate(NavigationNames.RootLoginScreen);
          },
        }}
      />
      <Tab.Screen
        name={NavigationNames.ProfileTab}
        component={ProfileStack}
        listeners={{
          tabPress: (e) => {
            if (authContext.isLoggedIn) {
              return;
            }
            e.preventDefault();
            navigation.navigate(NavigationNames.RootLoginScreen);
          },
        }}
      />
      <Tab.Screen name={NavigationNames.MenuTab} component={MenuStack} />
    </Tab.Navigator>
  );
}
