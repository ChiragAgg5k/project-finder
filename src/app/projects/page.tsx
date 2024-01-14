import ProjectTile from "@/components/project-tile";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import {api} from "@/trpc/server";

export default async function Projects() {

    const projects = await api.project.fetchAll.query();

  return (
    <div className={`relative mt-20 flex flex-col sm:flex-row min-h-[91dvh] bg-base-200 p-8 pb-32`}>
      <div
        className={`sm:sticky mb-8 w-full sm:w-fit top-8 mr-8 h-fit rounded-xl border border-base-content/10 px-4 py-8`}
      >
        <h3 className={`mb-6 text-center text-xl font-bold`}>
          <FaFilter
            className={`mr-2 inline-block text-lg text-base-content/50`}
          />
          Filter Projects
        </h3>
        <div className={`mb-4 flex items-center justify-center`}>
          <input type={`checkbox`} className={`checkbox mr-2`} />
          <p className={`text-sm `}>As per my preferences</p>
        </div>

        <hr className={`mb-4 border-base-content/10`} />

        <label className={`label text-sm`}>Project Type</label>
        <input
          className={`input input-bordered input-sm w-full min-w-52 mb-4`}
          placeholder={`e.g Web Application`}
        />

        <label className={`label text-sm`}>Technologies</label>
        <input
          className={`input input-bordered input-sm w-full min-w-52`}
          placeholder={`e.g React`}
        />
        <button className={`btn btn-neutral mt-8 w-full`}>Apply Filters</button>
      </div>
      <div className={`w-full`}>
        <div className={`w-full`}>
          <input
            className={`input input-bordered mb-8 w-full`}
            placeholder={`Search Projects`}
          />
          <button className={`btn btn-square btn-ghost absolute right-8`}>
            <CiSearch className={`text-xl`} />
          </button>
        </div>
        <div
          className={`grid grid-cols-1 gap-8 md:grid-cols-2  lg:grid-cols-3`}
        >
          {projects.map((project, index) => (
            <ProjectTile
                id={project.id}
              key={index}
              title={project.name}
              description={project.description ?? ""}
              image={project.image ?? ""}
              tags={[]}
            />
          ))}
          {projects.length === 0 ? (
            <p className={`col-span-3 mt-24 text-center text-base-content/50`}>
              No projects found
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        className={`absolute bottom-4 w-[90vw] flex items-center justify-center`}
      >
        <div className="join border border-base-content/10">
          <button className="btn join-item btn-active">1</button>
          <button className="btn join-item">2</button>
          <button className="btn join-item">3</button>
          <button className="btn join-item">4</button>
        </div>
      </div>
    </div>
  );
}
