import { getServerAuthSession } from "@/server/auth";
import ProjectFilterPage from "@/components/project-filter-page";
import {api} from "@/trpc/server";

export default async function Projects() {
  const session = await getServerAuthSession();

  return (
    <ProjectFilterPage isSignedIn = {session !== null}/>
  );
}
