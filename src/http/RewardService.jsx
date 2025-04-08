import $api from ".";

export default class RewardService {
  static async getRewards() {
    return $api.get("/rewards");
  }
  static async claimReward(rewardId) {
    console.log(rewardId);
    return $api.post(`/user/rewards/${rewardId}/exchange`);
  }
}
