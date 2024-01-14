"use client";

import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { UploadDropzone } from "@/utils/uploadthing";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";

export default function CreateProjectForm({ userId }: { userId: string }) {
  const githubConnected = false;
  const router = useRouter();
  const [imageName, setImageName] = useState("");

  const [currentTag, setCurrentTag] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [imageURL, setImageURL] = useState("");

  const createProject = api.project.create.useMutation();

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
        <input
          className={`input input-bordered w-full`}
          placeholder={`Project Name`}
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          type={`text`}
        />
        <textarea
          className={`textarea textarea-bordered w-full`}
          placeholder={`Project Description`}
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          rows={5}
        />
        <div className={`flex items-start`}>
          <input
            className={`input input-bordered mr-2 w-full`}
            placeholder={`Project URL`}
            value={projectURL}
            type={`url`}
            onChange={(e) => setProjectURL(e.target.value)}
          />
          <div className={`w-full`}>
            <input
              className={`input input-bordered w-full`}
              placeholder={`Tags`}
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
            {tags.length > 0 && (
              <div className={`mt-4`}>
                {tags.map((tag) => {
                  return (
                    <span
                      className={`mr-2 rounded-full bg-base-100 px-2 py-1 text-sm text-base-content/70`}
                    >
                      {tag}
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
