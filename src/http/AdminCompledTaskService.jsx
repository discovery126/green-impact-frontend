import { $api } from ".";

export default class AdminCompletedTaskService {
  static async getCompletedTasks() {
    return $api.get("/admin/completed-tasks");
  }

  static async acceptTask(taskId) {
    return $api.post(
      `/admin/completed-tasks/${taskId}/answer?status=CONFIRMED`
    );
  }
  static async rejectTask(taskId) {
    return $api.post(`/admin/completed-tasks/${taskId}/answer?status=REJECTED`);
  }
}
