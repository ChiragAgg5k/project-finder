import SignoutButton from "@/components/signout-button";
import { api } from "@/trpc/server";
import { getServerAuthSession } from "@/server/auth";

export default async function ProfilePage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerAuthSession();
  const users = await api.user.fetch.query({
    userId: params.id,
  });

  if (!users[0]) {
    return (
      <div
        className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
      >
        <h1 className={`text-3xl font-bold`}>User Not Found</h1>
      </div>
    );
  }

  const user = users[0];
  const isOwnProfile = session?.user.id === user.id;

  return (
    <div
      className={`mt-20 flex min-h-[91dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <h1 className={`mb-2 text-3xl font-bold`}>{user.name}</h1>
      <p className={`mb-4 text-base-content/70`}>{user.email}</p>
      {isOwnProfile ? (
        <SignoutButton className={`btn btn-neutral btn-wide mt-4`} />
      ) : (
        <></>
      )}
    </div>
  );
}
