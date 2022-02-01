import {
  CategoryModel,
  NewsModel,
  StoryModel,
  NewsCommentModel,
} from "../models";

var incrementedId = 1;

const categories: CategoryModel[] = [
  {
    name: "SPORTS",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    color: "#787ffe",
    newsCount: 24,
  },
  {
    name: "HEALTH",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    color: "#f96d93",
    newsCount: 18,
  },
  {
    name: "TECHNOLOGY",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    color: "#79b3fc",
    newsCount: 55,
  },
  {
    name: "SOCIETY",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    color: "#42bafe",
    newsCount: 64,
  },
  {
    name: "LIFE",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    color: "#f871cf",
    newsCount: 11,
  },
];

const getNewsComments = (commentCounts: number): NewsCommentModel[] => {
  return new Array(commentCounts).fill(0).map((a) => {
    return {
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet",
      user: {
        id: 1,
        firstName: "John",
        lastName: "Publ",
        username: "",
        email: "",
        imageName: "https://picsum.photos/100?random=" + Math.random(),
      },
    };
  });
};

const news: NewsModel[] = new Array(30).fill(0).map((a) => {
  const commentCounts = Math.floor(Math.random() * 30);
  return {
    id: incrementedId++,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    category: categories[Math.floor(Math.random() * categories.length)],
    comments: getNewsComments(commentCounts),
    commentsCount: commentCounts,
    createdAt: new Date(),
  };
});

const highlightedNews: NewsModel[] = new Array(5).fill(0).map((a) => {
  const commentCounts = Math.floor(Math.random() * 30);
  return {
    id: incrementedId++,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    imageName: "https://picsum.photos/300?random=" + Math.random(),
    category: categories[Math.floor(Math.random() * categories.length)],
    comments: getNewsComments(commentCounts),
    commentsCount: commentCounts,
    createdAt: new Date(),
  };
});

const stories: StoryModel[] = new Array(10).fill(0).map((a) => {
  return {
    thumbnailImageName: "https://picsum.photos/200?random=" + Math.random(),
    storyImageName: "https://picsum.photos/700/1300?random=" + Math.random(),
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit amet",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    relatedNews: news[Math.floor(Math.random() * news.length)],
    createdAt: new Date(),
  };
});

export default {
  categories,
  news,
  highlightedNews,
  topCategories: categories,
  stories,
};
