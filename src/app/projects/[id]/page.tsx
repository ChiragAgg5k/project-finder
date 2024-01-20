import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import Comments from "@/app/projects/[id]/comments";
import { getServerAuthSession } from "@/server/auth";

const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.toLocaleString("default", {
    month: "short",
  })} ${d.getDate()}, ${d.getFullYear()}`;
};

export default async function ProjectPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const project = await api.project.fetch.query({
    id: params.id,
  });
  const session = await getServerAuthSession();

  if (!project) {
    return (
      <div
        className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
      >
        <h1 className={`text-3xl font-bold`}>Project Not Found</h1>
      </div>
    );
  }

  const user = await api.user.fetch.query({
    userId: project.ownerId,
  });

  return (
    <div
      className={`relative mt-20 flex min-h-[90dvh] flex-col justify-center bg-base-200 p-8`}
    >
      <div className={`mt-12 flex items-center w-full flex-col-reverse md:flex-row`}>
        <Link
          href={`/projects`}
          className={`btn btn-neutral absolute left-4 top-4`}
        >
          <IoMdArrowRoundBack className={`text-xl`} />
        </Link>
        <div className={`w-full pr-8`}>
          <div className={`mb-8 flex w-full items-center justify-center`}>
            <div>
              <Link
                href={user ? `/users/${user.id}` : "#"}
                className={`tooltip tooltip-bottom`}
                data-tip={user?.name ?? "User"}
              >
                <Image
                  src={user?.image ? user.image : "/default-pfp.jpg"}
                  alt={`user image`}
                  width={60}
                  height={60}
                  className={`mr-4 rounded-full`}
                />
              </Link>
            </div>
            <div className={`flex flex-col items-center justify-center`}>
              <h1 className={`mb-4 text-center text-3xl font-bold`}>
                {project.name}
              </h1>
              {project.tags && project.tags.length > 0 && (
                <div className={`flex items-center justify-center`}>
                  <>
                    {project.tags.split(",").map((tag, index) => (
                      <Link
                        href={`/projects?tags=${tag}`}
                        key={index}
                        className={`badge hover:badge-outline`}
                      >
                        {tag}
                      </Link>
                    ))}
                    {project.type !== undefined && (
                      <Link
                        href={`/projects?type=${project.type}`}
                        className={`badge badge-primary badge-outline ml-2`}
                      >
                        {project.type}
                      </Link>
                    )}
                  </>
                </div>
              )}
            </div>
          </div>
          <p
            className={`mb-8 rounded-2xl bg-base-300 p-6 text-center text-base-content/80`}
          >
            {project.description}

            <span
              className={`mt-4 block text-right text-sm text-base-content/60`}
            >
              -{" "}
              {project.createdAt
                ? formatDate(project.createdAt)
                : "Unknown Date"}
            </span>
          </p>
          <div className={`flex items-center justify-center`}>
            <Link
              href={project.projectUrl ?? ""}
              className={`btn btn-outline btn-accent btn-wide`}
            >
              View Project
            </Link>
          </div>
        </div>
        {project.image && (
          <Image
            src={project.image}
            alt={`project image`}
            width={400}
            height={400}
            className={`mb-16 h-[40dvh] w-auto rounded-xl object-cover md:max-w-[40dvw]`}
          />
        )}
      </div>
      <Comments projectId={params.id} isSignedIn={session !== null} />
    </div>
  );
}
