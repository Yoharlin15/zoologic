import { Endpoints } from "../core";
import { IDashboard } from "../interfaces";

import API from "./api";

interface Api<T> {
  getDashboardData: () => Promise<T>;
}

const DashboardApi: Api<IDashboard> = {
  getDashboardData: async () => {
    const result = await API().get(Endpoints.DASHBOARD_GET);
    return result.data;
  },
};

export default DashboardApi;
