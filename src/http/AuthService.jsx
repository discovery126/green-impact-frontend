import { $api, $basicApi } from ".";

export default class AuthService {
  static async login(email, password) {
    return $basicApi.post("/login", { email, password });
  }

  static async registration(email, display_name, password) {
    return $api.post("/register", { email, display_name, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
