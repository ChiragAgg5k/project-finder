"use client";

import { signOut } from "next-auth/react";

export default function SignoutButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      className={className}
      onClick={() => {
        void signOut({
          callbackUrl: "/",
        });
      }}
    >
      Sign Out
    </button>
  );
}
