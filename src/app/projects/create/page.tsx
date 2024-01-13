import CreateProjectForm from "@/components/create-project-form";
import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export default async  function CreateProject() {

    const session = await getServerAuthSession();

    if(!session){
        redirect("/api/auth/signin")
    }

  return (
      <div className={`relative mt-20 flex items-center justify-center min-h-[91dvh] bg-base-200 p-8 pb-32`}>
          <div className={`border mt-8 rounded-2xl w-fit p-6 sm:p-8 md:p-10 border-base-content/10`}>
              <h1
              className={`text-3xl mb-4 font-bold text-center `}
              >
                    Upload Project
              </h1>
              <p
              className={`text-center text-md text-base-content/80 mb-8`}
              >
                  We're excited to see what you've been working on! Please fill out the form below to submit your project.
              </p>
              <CreateProjectForm />
          </div>
      </div>
  );
}
