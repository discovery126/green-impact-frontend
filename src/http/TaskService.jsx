import $api from ".";

export default class TaskService {
  static async getAllTasks() {
    return $api.get("/tasks");
  }
  static async getAllTaskCategories() {
    return $api.get("/tasks/categories");
  }
  static async getUserTasks() {
    return $api.get("/user/tasks");
  }
  static async getActiveTasks() {
    return $api.get("/user/active-tasks");
  }
  static async takeTaskUser(id) {
    return $api.post(`user/tasks/${id}/take`);
  }
}
