import { UserModel } from "./UserModel";

export type NewsCommentModel = {
  message: string;
  user: UserModel;
  createdAt: Date;
};
