"use client";

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { FaGithub } from "react-icons/fa";

const fileTypes = ["JPG", "PNG"];

export default function CreateProjectForm() {
  const githubConnected = false;
  const [image, setImage] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setImage(file);
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
      <form className={`space-y-6`}>
        <input
          className={`input input-bordered w-full`}
          placeholder={`Project Name`}
        />
        <textarea
          className={`textarea textarea-bordered w-full`}
          placeholder={`Project Description`}
          rows={5}
        />
        <input
          className={`input input-bordered w-full`}
          placeholder={`Project URL`}
        />
        <div className={`flex items-center justify-around`}>
          <p className={`text-base text-base-content/70`}>
            Project Image <span className={`underline`}>(Optional)</span>
          </p>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            label="Drag & Drop Project Image Here"
          />
        </div>

        <div className={`flex items-center justify-center px-4 pt-4`}>
          <button className={`btn btn-accent w-full`}>Submit Project</button>
        </div>
      </form>
    </>
  );
}
