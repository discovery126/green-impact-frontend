import $api from ".";

export default class AuthService {
  static async login(email, password) {
    return $api.post("/login", { email, password });
  }

  static async registration(email, display_name, password) {
    return $api.post("/register", { email, display_name, password });
  }

  static async logout() {
    return $api.post("/logout");
  }
}
