"use client";

import { FaFilter } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import ProjectTile from "@/components/project-tile";
import React, { useEffect, useState } from "react";
import { api } from "@/trpc/react";
import { useRouter, useSearchParams } from "next/navigation";
import Chat from "@/components/chatbot";
import { ScoringAlgorithm } from "@/utils/scoring-algorithm";

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

const sortingAlgo = (
  projectA: any,
  projectB: any,
  user: any,
  sort: "likes" | "views" | "comments" | "recent" | "score",
) => {
  if (ScoringAlgorithm(projectA, user) > ScoringAlgorithm(projectB, user)) {
    return -1;
  } else if (
    ScoringAlgorithm(projectA, user) < ScoringAlgorithm(projectB, user)
  ) {
    return 1;
  }

  if (sort === "likes") {
    if (projectA.likes.length > projectB.likes.length) {
      return -1;
    }
    if (projectA.likes.length < projectB.likes.length) {
      return 1;
    }
  }

  if(sort === "recent") {
    const dateA = new Date(projectA.createdAt).getTime();
    const dateB = new Date(projectB.createdAt).getTime();
    console.log(dateA, dateB);
    if (dateA < dateB) {
      return 1;
    }
    if (dateA > dateB) {
      return -1;
    }
  }

  return 0;
};

export default function ProjectFilterPage({
  isSignedIn,
  userId,
  user,
}: {
  isSignedIn: boolean;
  userId: string;
  user: any;
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
  // const [showGithubProjects, setShowGithubProjects] = useState(false);
  const [tab, setTab] = useState<"projects" | "github" | "chatbot">("projects");
  const [currentTag, setCurrentTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<
    "likes" | "views" | "comments" | "recent" | "score"
  >("score");

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
      className={`relative mt-20 flex min-h-[91dvh] flex-col bg-base-200 p-8 sm:flex-row`}
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
          <label className={`label mt-4 text-sm`}>Sort by</label>
          <select
            className={`select select-bordered select-sm w-full text-sm`}
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as any);
            }}
          >
            <option disabled={true} value="">
              Sort by
            </option>
            <option value="score">Recommended</option>
            <option value="likes">Most liked</option>
            <option value="recent">Most recent</option>
          </select>
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

        {tab === "github" ? (
          <button
            onClick={() => {
              setTab("projects");
            }}
            className={`btn btn-outline btn-neutral w-full border-base-content/30`}
          >
            Back to Projects
          </button>
        ) : (
          <button
            onClick={() => {
              setTab("github");
            }}
            className={`btn btn-outline btn-neutral w-full border-base-content/30`}
          >
            Trending Github Projects
          </button>
        )}

        <p className={`mt-6 text-sm font-semibold text-base-content/70`}>
          Having issues?
        </p>
        {tab === "chatbot" ? (
          <button
            onClick={() => {
              setTab("projects");
            }}
            className={`btn btn-accent mt-1 w-full`}
          >
            Ask Chatbot
          </button>
        ) : (
          <button
            onClick={() => {
              setTab("chatbot");
            }}
            className={`btn btn-outline btn-accent mt-1 w-full`}
          >
            Ask Chatbot
          </button>
        )}
      </div>
      <div className={`w-full`}>
        {tab !== "chatbot" && (
          <div className={`w-full`}>
            <input
              className={`input input-bordered mb-8 w-full`}
              placeholder={`Search Projects...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className={`btn btn-square btn-ghost absolute right-8`}>
              <CiSearch className={`text-xl`} />
            </button>
          </div>
        )}
        <div
          className={`grid grid-cols-1 gap-8 md:grid-cols-2  lg:grid-cols-3`}
        >
          {projects.data === undefined ? (
            <p
              className={`col-span-3 mt-36 text-center text-sm text-base-content/70`}
            >
              Loading...
            </p>
          ) : (
            <>
              {tab === "projects" &&
                projects.data
                  ?.filter((project) =>
                    filter(selectedTags, search, project, projectType),
                  )
                  .sort((a, b) => sortingAlgo(a, b, user, sort))
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
                          isSignedIn={isSignedIn}
                          selectedTags={selectedTags}
                          score={ScoringAlgorithm(project, user)}
                        />
                      ),
                  )}
              {tab !== "chatbot" &&
                githubSearchedProjects.data &&
                githubSearchedProjects.data.map((project, index) => (
                  <ProjectTile
                    id={undefined}
                    searchedQuery={search}
                    key={index}
                    title={project.name}
                    description={project.description ?? ""}
                    tags={project.topics ?? []}
                    searchedTags={selectedTags}
                    image={""}
                    isSignedIn={isSignedIn}
                    isGithubProject={true}
                    repoUrl={project.html_url}
                    // @ts-ignore
                    score={ScoringAlgorithm(project, user)}
                  />
                ))}
              {tab === "github" &&
                !search &&
                githubTrendingProjects.data &&
                githubTrendingProjects.data.map((project, index) => (
                  <ProjectTile
                    id={undefined}
                    searchedQuery={search}
                    key={index}
                    title={project.name}
                    description={project.description ?? ""}
                    tags={project.topics ?? []}
                    searchedTags={selectedTags}
                    image={""}
                    isSignedIn={isSignedIn}
                    isGithubProject={true}
                    repoUrl={project.html_url}
                    // @ts-ignore
                    score={ScoringAlgorithm(project, user)}
                  />
                ))}
            </>
          )}
        </div>

        {tab === "chatbot" && (
          <Chat userId={userId} projects={projects} isSignedIn={isSignedIn} />
        )}

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
