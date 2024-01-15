"use client";

import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function LikeButton({
  likes,
  isSignedIn,
}: {
  likes: number;
  isSignedIn: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  return (
    <>
      <button
        className={`btn btn-ghost btn-sm absolute bottom-4 right-4 z-50`}
        disabled={!isSignedIn}
        onClick={() => {
          setLiked(!liked);
            setLikeCount(likeCount + (liked ? -1 : 1));
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
