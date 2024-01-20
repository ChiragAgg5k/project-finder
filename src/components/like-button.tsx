"use client";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useEffect } from "react";
import { api } from "@/trpc/react";

export default function LikeButton({
  isSignedIn,
  projectId,
}: {
  isSignedIn: boolean;
  projectId: string | undefined;
}) {
  const likes = api.likes.likes.useQuery({
    projectId: projectId,
  });
  const liked = api.likes.liked.useQuery({
    projectId: projectId,
  });

  const createLike = api.likes.create.useMutation();
  const deleteLike = api.likes.delete.useMutation();

  useEffect(() => {
    if (createLike.isSuccess || deleteLike.isSuccess) {
      void likes.refetch();
      void liked.refetch();
    }
  }, [createLike.isSuccess, deleteLike.isSuccess]);

  return (
    <>
      <button
        className={`btn btn-ghost btn-sm absolute bottom-4 right-4 z-50`}
        disabled={!isSignedIn}
        onClick={() => {
          if (!projectId) return;

          if (!liked.data) {
            createLike.mutate({
              projectId: projectId,
            });
          } else {
            deleteLike.mutate({
              projectId: projectId,
            });
          }
        }}
      >
        {liked.data ? (
          <AiFillLike className={`text-xl`} />
        ) : (
          <AiOutlineLike className={`text-xl`} />
        )}
        {likes.data && likes.data.length > 0 && (
          <span>{likes.data.length}</span>
        )}
      </button>
    </>
  );
}
