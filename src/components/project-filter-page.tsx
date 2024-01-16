"use client";

import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import ProjectTile from "@/components/project-tile";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const filter = (
  selectedTags: string[],
  search: string,
  project: any,
  type?: string,
) => {
  return (
    (selectedTags.length === 0 ||
      project.tags
        ?.split(",")
        .some((tag: any) => selectedTags.includes(tag))) &&
    (project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.description?.toLowerCase().includes(search.toLowerCase())) &&
    (type === undefined ||
      type === "" ||
      type === "other" ||
      project.type === type)
  );
};

export default function ProjectFilterPage({
  isSignedIn,
}: {
  isSignedIn: boolean;
}) {
  const projects = api.project.fetchAll.useQuery();
  const githubTrendingProjects = api.project.fetchGithubTrending.useQuery();
  const [search, setSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const searchTags = searchParams.get("tags");
  const searchType = searchParams.get("type");

  const [projectType, setProjectType] = useState<string | undefined>("");
  const [showGithubProjects, setShowGithubProjects] = useState(false);
  const [currentTag, setCurrentTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const githubSearchedProjects = api.project.fetchGithubSearch.useQuery({
    query: search,
  });

  const removeTag = (index: number) => {
    setSelectedTags(selectedTags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (searchTags) {
      setSelectedTags(searchTags.split(","));
    }
  }, [searchTags]);

  useEffect(() => {
    if (searchType) {
      setProjectType(searchType);
    }
  }, [searchType]);

  useEffect(() => {
    if (searchQuery) {
      setSearch(searchQuery);
    }
  }, [searchQuery]);

  return (
    <div
      className={`relative mt-20 flex min-h-[91dvh] flex-col bg-base-200 p-8 pb-32 sm:flex-row`}
    >
      <div className={`top-8 mb-8 mr-8 h-fit w-full sm:sticky sm:w-fit`}>
        <div className={`rounded-xl border border-base-content/10 px-4 py-8`}>
          <h3 className={`mb-6 text-center text-xl font-bold`}>
            <FaFilter
              className={`mr-2 inline-block text-lg text-base-content/50`}
            />
            Filter Projects
          </h3>

          <hr className={`mb-4 border-base-content/10`} />

          <label className={`label text-sm`}>Project Type</label>
          <select
            className={`select select-bordered select-sm mb-4 w-full text-sm`}
            defaultValue={""}
            value={projectType}
            onChange={(e) => {
              setProjectType(e.target.value);
            }}
          >
            <option disabled={true} value="">
              Select project type
            </option>
            <option value="web">Web App</option>
            <option value="api">API</option>
            <option value="mobile">Mobile App</option>
            <option value="game">Game</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="ml">Machine Learning</option>
            <option value="desktop">Desktop App</option>
            <option value="other">Other</option>
          </select>

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
                      <span className="badge text-nowrap">
                        {tag}
                        <IoIosClose
                          className={`ml-1 text-lg hover:cursor-pointer hover:bg-base-200`}
                          onClick={() => removeTag(index)}
                        />
                      </span>
                    </li>
                  ),
              )}
            </ul>
          )}
          <button
            className={`btn btn-neutral mt-8 w-full`}
            onClick={() => {
              setSelectedTags([]);
              setCurrentTag("");
              setProjectType("");
              router.replace("/projects");
            }}
          >
            Clear Filters
          </button>
        </div>
        <hr className={`mb-4 border-base-content/10`} />

        {showGithubProjects ? (
          <button
            onClick={() => {
              setShowGithubProjects(false);
            }}
            className={`btn btn-outline btn-neutral w-full border-base-content/30`}
          >
            Back to Projects
          </button>
        ) : (
          <button
            onClick={() => {
              setShowGithubProjects(true);
            }}
            className={`btn btn-outline btn-neutral w-full border-base-content/30`}
          >
            Trending Github Projects
          </button>
        )}

        <Link href={`/projects/create`} className={`btn btn-accent w-full mt-6 btn-outline`}>
          Upload Project
        </Link>
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
          {projects.data === undefined ? (
            <p className={`col-span-3 mt-36 text-center text-base-content/70`}>
              Loading...
            </p>
          ) : (
            <>
              {!showGithubProjects &&
                projects.data
                  ?.filter((project) =>
                    filter(selectedTags, search, project, projectType),
                  )
                  .map(
                    (project, index) =>
                      project && (
                        <ProjectTile
                          id={project.id}
                          searchedQuery={search}
                          key={index}
                          type={project.type ?? undefined}
                          title={project.name}
                          description={project.description ?? ""}
                          image={project.image ?? ""}
                          tags={project.tags?.split(",") ?? []}
                          searchedTags={selectedTags}
                          likes={project.likes ?? 0}
                          isSignedIn={isSignedIn}
                          selectedTags={selectedTags}
                        />
                      ),
                  )}
              {githubSearchedProjects.data &&
                githubSearchedProjects.data.map((project, index) => (
                  <ProjectTile
                    id={undefined}
                    searchedQuery={search}
                    key={index}
                    title={project.name}
                    description={project.description ?? ""}
                    tags={[]}
                    searchedTags={selectedTags}
                    likes={project.stargazers_count ?? 0}
                    image={""}
                    isSignedIn={isSignedIn}
                    isGithubProject={true}
                    repoUrl={project.html_url}
                  />
                ))}
              {showGithubProjects &&
                !search &&
                githubTrendingProjects.data &&
                githubTrendingProjects.data.map((project, index) => (
                  <ProjectTile
                    id={undefined}
                    searchedQuery={search}
                    key={index}
                    title={project.name}
                    description={project.description ?? ""}
                    tags={[]}
                    searchedTags={selectedTags}
                    likes={project.stargazers_count ?? 0}
                    image={""}
                    isSignedIn={isSignedIn}
                    isGithubProject={true}
                    repoUrl={project.html_url}
                  />
                ))}
            </>
          )}
        </div>
        {projects.data &&
        projects.data.filter((project) => filter(selectedTags, search, project))
          .length === 0 &&
        !githubSearchedProjects.data ? (
          <p
            className={`flex min-h-[60dvh] items-center justify-center text-base-content/70`}
          >
            Loading projects from other sources...
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
