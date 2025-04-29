import { $basicApi } from ".";

export default class RatingService {
  static async getRating(sortBy) {
    return $basicApi.get(`/rating/${sortBy}`);
  }
}
