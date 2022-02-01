import { NewsModel } from "./NewsModel";
import { CategoryModel } from "./CategoryModel";
import { StoryModel } from "./StoryModel";

export type DashboardModel = {
  highlightedNews: NewsModel[];
  news: NewsModel[];
  categories: CategoryModel[];
  topCategories: CategoryModel[];
  stories: StoryModel[];
};
