import { $basicApi } from ".";

export default class CityService {
  static async getCities() {
    return $basicApi.get("/cities");
  }
}
