import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as ExpoLocalization from "expo-localization";
import {
  AppNavigator,
  configureGlobalTypography,
  initLocalization,
  ThemeContext,
  Themes,
} from "./src";
import { StatusBar, AsyncStorage, LogBox } from "react-native";
import { FavoritedNewsProvider, AuthenticationProvider } from "./src/context";
import { LoadingLayout, LoadingManager } from "./src/presentation";
import axios from "axios";
import { API_URL, getLang } from "./src/constants";
import { UserModel } from "./src/models";

LogBox.ignoreAllLogs()

axios.defaults.baseURL = API_URL;
axios.interceptors.request.use(
  (config) => {
    LoadingManager.showLoading();
    return config;
  },
  (err) => {
    LoadingManager.hideLoading();
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  (config) => {
    LoadingManager.hideLoading();
    return config;
  },
  (err) => {
    LoadingManager.hideLoading();
    return Promise.reject(err);
  }
);

const App = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const [user, setUser] = useState<UserModel>();
  const [theme, setTheme] = useState(Themes.light);

  useEffect(() => {
    AsyncStorage.multiGet(["APP_LANGUAGE", "THEME"]).then((response) => {
      var _appLang = response[0][1];
      const _theme = response[1][1];

      if (_theme === undefined || _theme === null) {
        setTheme(Themes.light);
      } else {
        setTheme(_theme === "dark" ? Themes.dark : Themes.light);
      }

      if (_appLang === undefined || _appLang === null) {
        _appLang = ExpoLocalization.locale.split("-")[0];
      }
      const availableLang = getLang(_appLang);
      initLocalization(availableLang);

      Font.loadAsync({
        "default-thin": require("./assets/fonts/mada-thin.ttf"),
        "default-light": require("./assets/fonts/mada-light.ttf"),
        "default-regular": require("./assets/fonts/mada-regular.ttf"),
        "default-medium": require("./assets/fonts/mada-medium.ttf"),
        "default-bold": require("./assets/fonts/mada-bold.ttf"),
        "default-black": require("./assets/fonts/mada-black.ttf"),
      }).then(() => setIsFontLoaded(true));
    });

    AsyncStorage.multiGet(["AccessToken", "User"]).then((response) => {
      const _accessToken = response[0][1];
      const _user = response[1][1];

      if (_accessToken && _user) {
        axios.defaults.headers["Authorization"] = "Bearer " + _accessToken;
        setUser(JSON.parse(_user));
      }
    });
  }, []);

  if (!isFontLoaded) {
    return null;
  }

  configureGlobalTypography();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <AuthenticationProvider user={user}>
        <ThemeContext.Provider
          value={{
            ...theme,
            changeTheme: (isDark: boolean) => {
              AsyncStorage.setItem("THEME", isDark ? "dark" : "light");
              setTheme(isDark ? Themes.dark : Themes.light);
            },
          }}
        >
          <FavoritedNewsProvider>
            <AppNavigator />
          </FavoritedNewsProvider>
          <LoadingLayout ref={(ref) => LoadingManager.setLoadingView(ref!!)} />
        </ThemeContext.Provider>
      </AuthenticationProvider>
    </>
  );
};

export default App;
