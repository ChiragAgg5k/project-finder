"use client";

import ProjectTile from "@/components/project-tile";
import { CiSearch } from "react-icons/ci";
import { FaFilter} from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { api } from "@/trpc/react";
import { useState } from "react";

const filter = (selectedTags: string[], search: string, project: any) => {
  return (
    (selectedTags.length === 0 ||
      project.tags
        ?.split(",")
        .some((tag: any) => selectedTags.includes(tag))) &&
    (project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase()))
  );
};

export default function Projects() {
  const projects = api.project.fetchAll.useQuery();
  const [search, setSearch] = useState("");

  const [currentTag, setCurrentTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const removeTag = (index: number) => {
    setSelectedTags(selectedTags.filter((_, i) => i !== index));
  }

  return (
    <div
      className={`relative mt-20 flex min-h-[91dvh] flex-col bg-base-200 p-8 pb-32 sm:flex-row`}
    >
      <div
        className={`top-8 mb-8 mr-8 h-fit w-full rounded-xl border border-base-content/10 px-4 py-8 sm:sticky sm:w-fit`}
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
          className={`input input-bordered input-sm mb-4 w-full min-w-52`}
          placeholder={`e.g Web Application`}
        />

        <label className={`label text-sm`}>Technologies</label>
        <input
          className={`input input-bordered input-sm w-full min-w-52`}
          placeholder={`e.g React`}
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setSelectedTags([...selectedTags, currentTag]);
              setCurrentTag("");
            }
          }}
        />
        {selectedTags.length > 0 && (
          <ul
            className={`mt-4 flex flex-wrap items-center justify-end space-x-4`}
          >
            {selectedTags.map(
              (tag, index) =>
                tag != "" && (
                  <li key={index}>
                    <span className="badge text-nowrap">{tag}
                      <IoIosClose className={`text-lg ml-1 hover:bg-base-200 hover:cursor-pointer`} onClick={
                        () => removeTag(index)
                      } />
                    </span>
                  </li>
                ),
            )}
          </ul>
        )}
        <button className={`btn btn-neutral mt-8 w-full`}>Apply Filters</button>
      </div>
      <div className={`w-full`}>
        <div className={`w-full`}>
          <input
            className={`input input-bordered mb-8 w-full`}
            placeholder={`Search Projects`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={`btn btn-square btn-ghost absolute right-8`}>
            <CiSearch className={`text-xl`} />
          </button>
        </div>
        <div
          className={`grid grid-cols-1 gap-8 md:grid-cols-2  lg:grid-cols-3`}
        >
          {projects.fetchStatus === "fetching" ? (
            <p className={`col-span-3 mt-36 text-center text-base-content/70`}>
              Loading...
            </p>
          ) : (
            <>
              {projects.data
                ?.filter((project) => filter(selectedTags, search, project))
                .map(
                  (project, index) =>
                    project && (
                      <ProjectTile
                        id={project.id}
                        searchedQuery={search}
                        key={index}
                        title={project.name}
                        description={project.description ?? ""}
                        image={project.image ?? ""}
                        tags={project.tags?.split(",") ?? []}
                        searchedTags={selectedTags}
                      />
                    ),
                )}
            </>
          )}
        </div>
        {projects.isFetched && projects.data?.filter((project) => filter(selectedTags, search, project)).length === 0 ? (
            <p
                className={`flex font-bold items-center justify-center min-h-[60dvh] text-base-content/70`}
            >
              No projects found matching your search...
            </p>
        ) : (
            <></>
        )}
      </div>
      <div
        className={`absolute bottom-4 flex w-[90vw] items-center justify-center`}
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
