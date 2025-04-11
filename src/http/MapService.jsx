import axios from "axios";

export default class MapSerivce {
  static async getRoute(profile, start, end) {
    const port = profile === "foot" ? 5000 : 5001;
    const url = `http://localhost:${port}/route/v1/${profile}/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`;
    return axios.get(url);
  }
}
