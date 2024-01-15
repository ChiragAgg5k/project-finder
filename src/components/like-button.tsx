"use client";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function LikeButton({
  likes,
  isSignedIn,
  projectId,
}: {
  likes: number;
  isSignedIn: boolean;
  projectId: string | undefined;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const incrementLike = api.project.incrementLikes.useMutation();

  return (
    <>
      <button
        className={`btn btn-ghost btn-sm absolute bottom-4 right-4 z-50`}
        disabled={!isSignedIn}
        onClick={() => {
          setLiked(!liked);
          setLikeCount(likeCount + (liked ? -1 : 1));

          if (!projectId) return;

          if (!liked) {
            incrementLike.mutate({
              id: projectId,
              currentLikes: likeCount,
            });
          }
        }}
      >
        {liked ? (
          <AiFillLike className={`text-xl`} />
        ) : (
          <AiOutlineLike className={`text-xl`} />
        )}
        {likeCount > 0 ? <span>{likeCount}</span> : <></>}
      </button>
    </>
  );
}
