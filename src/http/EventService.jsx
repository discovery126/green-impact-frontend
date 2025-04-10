import $api from ".";

export default class EventService {
  static async getAllEvents() {
    return $api.get(`/events`);
  }
  static async registerEvent(eventId) {
    return $api.post(`user/events/${eventId}/register`)
  }
  static async checkRegistered(eventId) {
    return $api.post(`user/events/${eventId}/registered`)
  }
}
