import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  redirect(`/profile/${session.user.id}`);

  return (
    <div
      className={`mt-20 flex min-h-[91dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <h1 className={`text-3xl font-bold`}>Loading...</h1>
    </div>
  );
}
