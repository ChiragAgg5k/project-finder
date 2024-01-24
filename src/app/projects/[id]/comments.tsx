"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import Image from "next/image";
import Link from "next/link";

export default function Comments({
  projectId,
  isSignedIn,
}: {
  projectId: string;
  isSignedIn: boolean;
}) {
  const [comment, setComment] = useState<string>("");
  const addComment = api.comment.create.useMutation();
  const comments = api.comment.fetchAll.useQuery({
    projectId: projectId,
  });

  useEffect(() => {
    if (addComment.isSuccess) {
      void comments.refetch();
    }
  }, [addComment.isSuccess]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isSignedIn) return;

    addComment.mutate({
      projectId: projectId,
      comment: comment,
    });

    setComment("");
  };

  return (
    <div className={`mt-12`}>
      <h2 className={`mb-4 text-3xl font-bold`}>Comments</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={`input input-bordered mb-8 w-full ${isSignedIn ? "" : "cursor-not-allowed"}`}
          placeholder={
            isSignedIn ? "Add a comment..." : "Sign in to comment..."
          }
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
      {comments.data && comments.data.length > 0 ? (
        comments.data.map((comment) => (
            comment.user &&
          <div className={`flex items-center p-4`} key={comment.id}>
            <Link href={`/users/${comment.user.id}`}>
              <Image
                src={
                  comment.user.image ? comment.user.image : "/default-pfp.jpg"
                }
                alt={``}
                width={50}
                height={50}
                className={`mr-4 rounded-full`}
              />
            </Link>
            <p>
              <span className={`font-bold`}>@ {comment.user.name}</span>
              <br />
              <span className={`text-[0.9rem] text-base-content/70`}>
                {comment.content}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p
          className={`flex min-h-32 items-center justify-center text-base-content/70`}
        >
          No comments yet. Be the first to comment on this project!
        </p>
      )}
    </div>
  );
}
