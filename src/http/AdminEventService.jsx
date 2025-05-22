import { $api } from ".";

export default class AdminEventService {
  static async getAllEvents() {
    return $api.get("/admin/events");
  }
  static async createEvent(event) {
    return $api.post("/admin/events", event);
  }
  static async editEvent(event) {
    return $api.post(`/admin/events/${event.id}`, event);
  }
  static async removeEvent(eventId) {
    return $api.delete(`/admin/events/${eventId}`);
  }
}
