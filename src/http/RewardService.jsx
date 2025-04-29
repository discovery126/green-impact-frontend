import { $api, $basicApi } from ".";

export default class RewardService {
  static async getRewards() {
    return $basicApi.get("/rewards");
  }
  static async claimReward(rewardId) {
    return $api.post(`/user/rewards/${rewardId}/exchange`);
  }
}
