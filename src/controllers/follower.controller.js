import { Follower } from "../models/Follower.model.js";
import { User } from "../models/User.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const follow = async (req, res) => {
  const id = req.id;
  const { name } = req.params;
  const user = await User.findOne({ name: name }).select("_id");
  if (!user) {
    return res.json(new ApiResponse(404, "", "User Not Found"));
  }
  const follower = await new Follower({
    username: user._id,
    follower: id,
  }).save();
  if (!follower) {
    return res.json(new ApiResponse(405, "", "Failed to follow"));
  }
  res.json(new ApiResponse(200, follower, "Followed Successfully"));
};
