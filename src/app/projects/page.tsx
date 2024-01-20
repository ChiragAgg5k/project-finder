import { getServerAuthSession } from "@/server/auth";
import ProjectFilterPage from "@/components/project-filter-page";
import {api} from "@/trpc/server";

export default async function Projects() {
  const session = await getServerAuthSession();
  const user = await api.user.fetch.query({
    userId: session ? session.user.id : "",
  });

  return (
    <ProjectFilterPage
      isSignedIn={session !== null}
      userId={session ? session.user.id : ""}
      user={user}
    />
  );
}
