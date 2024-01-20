import { api } from "@/trpc/server";
import Image from "next/image";
import ProjectTile from "@/components/project-tile";
import { getServerAuthSession } from "@/server/auth";
import SignoutButton from "@/components/signout-button";
import LikedProjectsTab from "@/app/users/[id]/liked-projects-tab";

export default async function UsersPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const user = await api.user.fetch.query({
    userId: params.id,
  });
  const session = await getServerAuthSession();

  if (!user) {
    return (
      <div
        className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
      >
        <h1 className={`text-3xl font-bold`}>User Not Found</h1>
      </div>
    );
  }

  const projects = await api.project.fetchUserProjects.query({
    userId: user.id,
  });

  return (
    <div
      className={`mt-20 flex min-h-[91dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <div className={`flex min-h-[60dvh] w-full flex-col md:flex-row`}>
        <div
          className={`flex h-full min-h-[60dvh] flex-col items-center justify-center`}
        >
          <div
            className={`flex flex-col items-center justify-center text-nowrap pr-8 text-center`}
          >
            <Image
              src={user.image ? user.image : "/default-pfp.jpg"}
              alt={`user image`}
              width={100}
              height={100}
              className={`mb-4 mr-4 rounded-full object-cover`}
            />
            <div>
              <h1 className={`mb-2 text-3xl font-bold`}>{user.name}</h1>
              <p className={`mb-4 text-base-content/70`}>{user.email}</p>
            </div>
            {session && session.user.id === user.id && (
              <>
                <SignoutButton className={`btn btn-neutral btn-wide`} />
              </>
            )}
          </div>
        </div>

        <LikedProjectsTab projects={projects} />
      </div>
    </div>
  );
}
