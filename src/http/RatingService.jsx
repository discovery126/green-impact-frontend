import $api from ".";

export default class RatingService {
  static async getRating(sortBy) {
    return $api.get(`/rating/${sortBy}`);
  }
}
