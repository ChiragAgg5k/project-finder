import { getServerAuthSession } from "@/server/auth";
import ProjectFilterPage from "@/components/project-filter-page";

export default async function Projects() {
  const session = await getServerAuthSession();

  return (
    <ProjectFilterPage
      isSignedIn={session !== null}
      userId={session ? session.user.id : ""}
    />
  );
}
