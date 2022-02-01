import { CategoryModel } from "./CategoryModel";
import { NewsCommentModel } from "./NewsCommentModel";
import { UserModel } from "./UserModel";

export type NewsModel = {
  id: number;
  title: string;
  content: string;
  imageName: string;
  createdAt: Date;
  category: CategoryModel;
  user: UserModel;

  commentsCount: number;
  topComments: NewsCommentModel[];
  comments: NewsCommentModel[];
};
