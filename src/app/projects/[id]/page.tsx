import { api } from "@/trpc/server";

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

  return (
    <div
      className={`mt-20 flex min-h-[90dvh] flex-col items-center justify-center bg-base-200 p-8`}
    >
      <pre className={`w-full overflow-hidden`}>
        {JSON.stringify(project, null, 2)}
      </pre>
    </div>
  );
}
