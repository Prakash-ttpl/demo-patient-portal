import AppDataService from "./AppDataService";

const COMMON_BASE = "auth";

export default class AuthDataService {
  static async login(data) {
    return await AppDataService.post(`${COMMON_BASE}/login`, data);
  }
}
