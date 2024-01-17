import SignoutButton from "@/components/signout-button";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <div
      className={`mt-20 flex min-h-[91dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <h1 className={`mb-2 text-3xl font-bold`}>{session.user.name}</h1>
      <p className={`mb-4 text-base-content/70`}>{session.user.email}</p>
      <SignoutButton className={`btn btn-neutral btn-wide mt-4`} />
    </div>
  );
}
