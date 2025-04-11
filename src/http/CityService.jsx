import $api from ".";

export default class CityService {
  static async getCities() {
    return $api.get("/cities");
  }
}
