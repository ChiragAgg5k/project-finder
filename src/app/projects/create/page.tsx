import CreateProjectForm from "@/components/create-project-form";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function CreateProject() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div
      className={`relative mt-20 flex min-h-[91dvh] items-center justify-center bg-base-200 p-8 pb-32`}
    >
      <div
        className={`mt-8 w-fit rounded-2xl border border-base-content/10 p-6 sm:p-8 md:p-10`}
      >
        <h1 className={`mb-4 text-center text-3xl font-bold `}>
          Upload Project
        </h1>
        <p className={`text-md mb-8 text-center text-base-content/80`}>
          {
            "We're excited to see what you've been working on! Please fill out the form below to submit your project."
          }
        </p>
        <CreateProjectForm userId={session.user.id} />
      </div>
    </div>
  );
}
