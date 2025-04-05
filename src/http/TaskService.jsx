import $api from ".";

export default class TaskService {
  static async getAllTaskCategories() {
    return $api.get("/tasks/categories");
  }
}
