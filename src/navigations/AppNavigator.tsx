import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeTabNavigator from "./HomeTabNavigator";
import NavigationNames from "./NavigationNames";
import { useTheme } from "../theme";
import { StoryPreviewScreen } from "../screens";
import AuthNavigator from "./AuthNavigator";

const Stack = createStackNavigator();

function AppNavigator() {
  const { colors } = useTheme();
  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          background: colors.windowBackground,
          border: colors.borderColor,
          card: colors.windowBackground,
          primary: "rgb(0, 122, 255)",
          text: colors.primaryColor,
        },
      }}
    >
      <Stack.Navigator headerMode="screen" mode="modal">
        <Stack.Screen
          name={NavigationNames.HomeTabRootStack}
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationNames.StoryPreviewScreen}
          component={StoryPreviewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={NavigationNames.RootLoginScreen}
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
