import $api from ".";

export default class UserService {
  static async getUser() {
    return $api.get("/user");
  }
  static async getUserEvents() {
    return $api.get("/user/events");
  }
}
