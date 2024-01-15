import { api } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

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

  if (!project) {
    return (
      <div
        className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
      >
        <h1 className={`text-3xl font-bold`}>Project Not Found</h1>
      </div>
    );
  }

  return (
    <div
      className={`mt-20 flex min-h-[91dvh] flex-col-reverse items-center justify-center bg-base-200 p-8 md:flex-row`}
    >
      <div className={`w-full pr-8`}>
        <h1 className={`mb-4 text-center text-3xl font-bold`}>
          {project.name}
        </h1>
        {project.tags && project.tags.length > 0 && (
          <div className={`mb-8 flex items-center justify-center`}>
            {project.tags.split(",").map((tag, index) => (
              <span key={index} className={`badge`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <p
          className={`mb-8 rounded-2xl bg-base-300 p-6 text-center text-base-content/80`}
        >
          {project.description}
        </p>
        <div className={`flex items-center justify-center`}>
          <Link href={project.projectUrl ?? ""} className={`btn btn-outline btn-accent btn-wide`}>
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
          className={`mb-16 h-[40dvh] w-auto rounded-xl object-cover`}
        />
      )}
    </div>
  );
}
