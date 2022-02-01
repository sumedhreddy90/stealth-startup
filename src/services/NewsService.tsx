import { CategoryModel, NewsModel, NewsCommentModel } from "../models";
import { DATAS } from "../datas";
import axios from "axios";

const get = async (newsId: number) =>
  await axios.get<{ news: NewsModel; otherNews: NewsModel[] }>(
    "news/" + newsId
  );

const getAllByCategory = async (category: CategoryModel) =>
  await axios.get("news_categories/" + category.id + "/news");

const search = async (searchText: string) =>
  await axios.post("news/search", {
    searchText: searchText,
  });

const getFavoritedNews = async () => await axios.get("news_favorited");

const favoriteNews = async (newsId: number, isFavorited: boolean) =>
  await axios.post("news/favorite", {
    newsId,
    isFavorited,
  });

export default {
  get,
  getAllByCategory,
  search,
  getFavoritedNews,
  favoriteNews,
};
