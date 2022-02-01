import { CategoryModel, NewsModel, NewsCommentModel } from "../models";
import { DATAS } from "../datas";
import axios from "axios";

const getAll = async (newsId: number) =>
  await axios.get<NewsCommentModel[]>("news/" + newsId + "/comments");

const post = async (newsId: number, comment: string) =>
  await axios.post("news/" + newsId + "/comments", {
    comment: comment,
  });

export default {
  getAll,
  post,
};
