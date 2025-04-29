import { $api, $basicApi } from ".";

export default class EventService {
  static async getAllEvents() {
    return $basicApi.get(`/events`);
  }
  static async registerEvent(eventId) {
    return $api.post(`user/events/${eventId}/register`);
  }
  static async confirmEvent(eventId, eventCode) {
    return $api.post(`user/events/${eventId}/confirm?eventCode=${eventCode}`);
  }
  static async checkRegistered(eventId) {
    return $api.post(`user/events/${eventId}/registered`);
  }
  static async checkConfirmed(eventId) {
    return $api.post(`user/events/${eventId}/confirmed`);
  }
}
