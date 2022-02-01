import { LanguageModel } from "../models";

export const BASE_URL = "http://publnews.polydesign3d.com/";
export const API_URL = BASE_URL + "api/v1/";
export const IMAGES_URL = BASE_URL + "uploadfiles/images/";

export const LANGUAGES: LanguageModel[] = [
  {
    lang: "en",
    isRTL: false,
  },
  {
    lang: "ar",
    isRTL: true,
  },
];

export const getLang = (lang: string) => {
  const foundLang = LANGUAGES.find((a) => a.lang === lang);
  if (foundLang) {
    return foundLang;
  }
  return {
    lang: "en",
    isRTL: false,
  };
};
