"use client";

import ProjectTile from "@/components/project-tile";
import { useState } from "react";
import { api } from "@/trpc/react";

export default function LikedProjectsTab({
  projects,
}: {
  projects: Array<{
    image: string | null;
    id: string;
    description: string | null;
    tags: string | null;
    name: string;
    type: string | null;
    projectUrl: string | null;
    ownerId: string;
    createdAt: Date | null;
  }>;
}) {
  const [tab, setTab] = useState<"projects" | "liked-projects">("projects");
  const likedProjects = api.project.fetchUserLikedProjects.useQuery();

  return (
    <div
      className={`w-full border-t border-base-content/25 p-8 md:border-l md:border-t-0`}
    >
      <div className={`mb-8 flex w-full`}>
        <button
          className={`btn btn-neutral mr-2 ${tab === "projects" ? "" : "btn-outline border-base-content/25"}`}
          onClick={() => setTab("projects")}
        >
          Projects Posted
        </button>
        <button
          className={`btn btn-neutral ${tab === "liked-projects" ? "" : "btn-outline border-base-content/25"}`}
          onClick={() => setTab("liked-projects")}
        >
          Liked Projects
        </button>
      </div>
      {projects.length === 0 ? (
        <p className={`text-base-content/70`}>No projects posted yet.</p>
      ) : (
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3`}>
          {tab === "projects" &&
            projects.map((project) => (
              <ProjectTile
                key={project.id}
                id={project.id}
                title={project.name}
                description={project.description ?? ""}
                image={project.image ?? ""}
                tags={project.tags?.split(",") ?? []}
                searchedQuery={""}
                searchedTags={[]}
                isSignedIn={false}
                score={0}
              />
            ))}
        </div>
      )}

      {likedProjects.data && likedProjects.data.length === 0 ? (
        <p className={`text-base-content/70`}>No projects liked yet.</p>
      ) : (
        <div className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3`}>
          {tab === "liked-projects" &&
            likedProjects.data &&
            likedProjects.data.map(
              (project) =>
                project !== undefined && (
                  <ProjectTile
                    key={project.id}
                    id={project.id}
                    title={project.name}
                    description={project.description ?? ""}
                    image={project.image ?? ""}
                    tags={project.tags?.split(",") ?? []}
                    searchedQuery={""}
                    searchedTags={[]}
                    isSignedIn={false}
                    score={0}
                  />
                ),
            )}
        </div>
      )}
    </div>
  );
}
