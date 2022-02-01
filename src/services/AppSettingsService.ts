import axios from "axios";

import { AppSettingsModel } from "../models";

const getAppSettings = async () => {
  return await axios.get<AppSettingsModel>("appsettings");
};

export default {
  getAppSettings,
};
