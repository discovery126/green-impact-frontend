import { $api, $basicApi } from ".";

export default class TaskService {
  static async getAllTasks() {
    return $basicApi.get("/tasks");
  }
  static async getAllTaskCategories() {
    return $basicApi.get("/tasks/categories");
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
  static async submitTaskFiles(taskId, formData) {
    return $api.post(`user/tasks/${taskId}/submit`, formData);
  }
}
