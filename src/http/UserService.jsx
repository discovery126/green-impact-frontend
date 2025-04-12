import $api from ".";

export default class UserService {
  static async getUser() {
    return $api.get("/user");
  }
  static async getUserEvents() {
    return $api.get("/user/events");
  }
  static async getUserRewards() {
    return $api.get("/user/rewards");
  }
  static async getUserCompletedTasks() {
    return $api.get("/user/completed-tasks");
  }
}
