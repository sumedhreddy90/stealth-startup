import { DashboardModel } from "../models";
import { DATAS } from "../datas";
import axios from "axios";

const getDashboardItems = async () => {
  return await axios.get<DashboardModel>("dashboard");
};

export default {
  getDashboardItems,
};
