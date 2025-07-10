import AppDataService from "./AppDataService";

const COMMON_BASE = "home";

export default class HomeDataService {
  static async getHomeData() {
    return await AppDataService.get(`${COMMON_BASE}/data`);
  }

  static async getHomeDetails(id) {
    return await AppDataService.get(`${COMMON_BASE}/details/${id}`);
  }
} 