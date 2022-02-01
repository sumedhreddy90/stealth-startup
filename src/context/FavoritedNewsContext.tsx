import React, { useState, Children, useContext, useEffect } from "react";

import { NewsModel } from "../models";
import { AuthenticationContext } from "./AuthenticationContext";
import { NewsService } from "../services";
import { Alert } from "react-native";

export type FavoritedNewsContextType = {
  favoritedNews: { [id: string]: NewsModel };
  favoriteNews: (news: NewsModel, isFavorite: boolean) => void;
};

export const FavoritedNewsContext = React.createContext<
  FavoritedNewsContextType
>({
  favoritedNews: {},
  favoriteNews: () => {},
});

export const FavoritedNewsProvider: React.FC<object> = (props) => {
  const [favoritedNews, setFavoritedNews] = useState<any>({});
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (authContext.isLoggedIn) {
      NewsService.getFavoritedNews()
        .then((res) => {
          var newsList: { [id: string]: NewsModel } = {};
          (res.data as NewsModel[]).forEach((item) => {
            newsList[item.id] = item;
          });
          setFavoritedNews(newsList);
        })
        .catch((err) => {
          if (err.response && err.response.status === 401) {
            authContext.logout();
          } else {
            Alert.alert(err.message);
          }
        });
    } else {
      setFavoritedNews({});
    }
  }, [authContext.isLoggedIn]);

  const favoriteNews = (news: NewsModel, isFavorite: boolean) => {
    if (isFavorite) {
      favoritedNews[news.id] = news;
    } else {
      delete favoritedNews[news.id];
    }
    setFavoritedNews({ ...favoritedNews });
  };

  return (
    <FavoritedNewsContext.Provider value={{ favoritedNews, favoriteNews }}>
      {Children.only(props.children)}
    </FavoritedNewsContext.Provider>
  );
};
