import $api from ".";

export default class TaskService {
  static async getAllTasks() {
    return $api.get("/tasks");
  }
  static async getUserTasks() {
    return $api.get("/user/tasks");
  }
  static async getAllTaskCategories() {
    return $api.get("/tasks/categories");
  }
}
