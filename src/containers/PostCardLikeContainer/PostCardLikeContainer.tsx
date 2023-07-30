// @ts-nocheck
import React, { FC, useState, useEffect, useContext } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {
  selectRecentLikeds,
  selectRecentRemoveds,
  removeLikedByPostId,
  addNewLikedByPostId,
} from "app/postLikes/postLikes";
import axios from 'axios';
import { AuthContext } from "../../context/auth";

import { PostDataType } from "data/types";
import PostCardLikeAction, {
  PostCardLikeActionProps,
} from "components/PostCardLikeAction/PostCardLikeAction";

export interface PostCardLikeContainerProps
  extends Omit<PostCardLikeActionProps, "isLiked" | "likeCount"> {
  like: PostDataType["like"];
}

const PostCardLikeContainer: FC<PostCardLikeContainerProps> = ({
  like,
  postId,
  onClickLike,
  count,
  likesIds,
  ...args
}) => {
  const { user, token } = useContext(AuthContext);

  const [liked, setLiked] = useState(false);
  const [postLikes, setPostLikes] = useState(count);

  useEffect(() => {
    if (likesIds && user) {
      setLiked(likesIds.includes(user._id));
    }
  }, [likesIds, user]);

  const handleClickLike = async () => {
    if (!user) {
      console.log("You are not logged in.");
      return;
    }

    try {
      const res = await axios.put(`/api/posts/${postId}/like`, {
        userId: user._id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedLikeCount = res.data;

      console.log(updatedLikeCount.liked, updatedLikeCount.count, "likes");

      setLiked(updatedLikeCount.liked);
      setPostLikes(updatedLikeCount.count);

      // Update the UI with the updated like count
      // ...
    } catch (err) {
      console.log("Error liking post:", err);
    }
  };

  return (
    <PostCardLikeAction
      {...args}
      isLiked={liked}
      count={postLikes}
      postId={postId}
      onClickLike={handleClickLike}
    />
  );
};

export default PostCardLikeContainer;
