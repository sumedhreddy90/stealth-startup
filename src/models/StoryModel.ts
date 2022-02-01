import { NewsModel } from "./NewsModel";

export type StoryModel = {
  thumbnailImageName: string;
  storyImageName: string;
  title: string;
  content: string;
  createdAt: Date;
  relatedNews: NewsModel;
};
