import { $api } from ".";

export default class AdminTaskService {
  static async getAllTasks() {
    return $api.get("/admin/tasks");
  }
  static async createTask(task) {
    return $api.post("/admin/tasks", task);
  }
  static async editTask(task) {
    return $api.post(`/admin/tasks/${task.id}`, task);
  }
  static async removeTask(taskId) {
    return $api.delete(`/admin/tasks/${taskId}`);
  }
}
