"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { UploadDropzone } from "@/utils/uploadthing";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { IoIosClose } from "react-icons/io";
import { CiGlobe, CiHashtag } from "react-icons/ci";

type ProjectType =
  | "web"
  | "api"
  | "mobile"
  | "game"
  | "ai"
  | "ml"
  | "desktop"
  | "other";

export default function CreateProjectForm({ userId }: { userId: string }) {
  const githubConnected = false;
  const router = useRouter();
  const [imageName, setImageName] = useState("");

  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>();
  const [projectDescription, setProjectDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [imageURL, setImageURL] = useState("");

  const createProject = api.project.create.useMutation();

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (createProject.isSuccess) {
      const projectId = createProject.data;
      router.push(`/projects/${projectId}`);
    }
  }, [createProject.isSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectName || !projectDescription || !projectURL || !imageURL) return;

    setLoading(true);

    createProject.mutate({
      name: projectName,
      description: projectDescription,
      projectUrl: projectURL,
      image: imageURL,
      tags: tags.join(","),
      ownerId: userId,
      type: projectType || "other",
    });
  };

  return (
    <>
      {githubConnected ? (
        <div className={`mb-8`}>
          <label className={`label text-sm text-base-content/70`}>
            Upload from GitHub
          </label>
          <input
            className={`input input-bordered w-full text-sm`}
            placeholder={`Search for a GitHub Repository`}
          />
        </div>
      ) : (
        <div className={`mb-8 flex items-center justify-center`}>
          <button className={`btn btn-neutral btn-sm mr-2`}>
            <FaGithub className={`text-xl`} />
            Connect GitHub Account
          </button>
          <p className={`text-sm text-base-content/70`}>
            to upload projects from your GitHub repositories
          </p>
        </div>
      )}
      <hr className={`border-accent py-4`} />
      <form className={`space-y-6`} onSubmit={handleSubmit}>
        <div className={`flex w-full`}>
          <input
            className={`input input-bordered mr-2 w-full text-sm`}
            placeholder={`Project Name`}
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            type={`text`}
          />
          <select
            defaultValue={""}
            className={`select select-bordered text-sm`}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
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
        </div>
        <textarea
          className={`textarea textarea-bordered w-full`}
          placeholder={`Project Description`}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          rows={5}
        />
        <div className={`flex items-start`}>
          <div className={`relative mr-2 w-full`}>
            <input
              className={`input input-bordered w-full text-sm`}
              placeholder={`Project URL`}
              value={projectURL}
              type={`url`}
              onChange={(e) => setProjectURL(e.target.value)}
            />
            <CiGlobe
              className={`absolute right-3 top-[0.8rem] text-xl text-base-content/50`}
            />
          </div>
          <div className={`relative w-full`}>
            <input
              className={`input input-bordered w-full text-sm`}
              placeholder={`Tags (Press Enter to add)`}
              type={`text`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (currentTag === "") return;
                  setTags([...tags, currentTag]);
                  setCurrentTag("");
                }

                if (e.key === "Backspace") {
                  if (currentTag === "") {
                    const newTags = tags.slice(0, tags.length - 1);
                    setTags(newTags);
                  }
                }
              }}
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
            />
            <CiHashtag className={`absolute right-3 top-[0.8rem] text-xl`} />
            {tags.length > 0 && (
              <div className={`mt-4`}>
                {tags.map((tag, index) => {
                  return (
                    <span className="badge text-nowrap" key={index}>
                      {tag}
                      <IoIosClose
                        className={`ml-1 text-lg hover:cursor-pointer hover:bg-base-200`}
                        onClick={() => removeTag(index)}
                      />
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className={`flex flex-col items-center justify-around`}>
          <UploadDropzone
            className="ut-label:text-md w-full rounded-xl bg-base-300 ut-button:btn ut-button:btn-neutral ut-button:btn-sm ut-label:text-base-content ut-readying:bg-base-100 ut-uploading:border-base-content/50 ut-allowed-content:ut-uploading:text-error"
            endpoint="imageUploader"
            onUploadBegin={() => {
              setUploading(true);
            }}
            onClientUploadComplete={(res) => {
              setUploading(false);
              const imageFile = res[0];
              if (!imageFile) return;

              setImageName(imageFile.name);
              setImageURL(imageFile.url);
            }}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`);
            }}
          />
          {imageName !== "" ? (
            <div className={`mt-4`}>
              <p className={`text-sm text-base-content/70`}>
                Project Image{" "}
                <span className={`text-primary`}>{imageName}</span> uploaded
                successfully!{" "}
              </p>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className={`flex items-center justify-center px-4 pt-4`}>
          <button
            disabled={loading || uploading}
            className={`btn btn-accent w-full`}
          >
            Submit Project
            {loading ? <ImSpinner9 className={`ml-2 animate-spin`} /> : <></>}
          </button>
        </div>
      </form>
    </>
  );
}
