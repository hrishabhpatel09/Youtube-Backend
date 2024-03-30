import Like from "../models/Like.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const likePost = async (req, res) => {
  const id = req.id;
  const { postId } = req.params;
  const likedPost = new Like({
    postId,
    whoLiked: id,
  });
  if (!likePost)
    return res.json(
      new ApiResponse(
        400,
        {
          data: "Failed to generate Like Model",
        },
        "Failed To like a Post"
      )
    );

  const savedLikedPost = await likedPost.save();
  if (!savedLikedPost) return res.send("Failed");
  else {
    return res.json(
      new ApiResponse(
        200,
        {
          data: savedLikedPost,
          success: true,
        },
        "Success"
      )
    );
  }
};

export default likePost;
