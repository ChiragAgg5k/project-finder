import Image from "next/image";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import LikeButton from "@/components/like-button";
import { FaGithub } from "react-icons/fa";

export default function ProjectTile({
  id,
  title,
  description,
  image,
  tags,
  likes,
  searchedQuery,
  searchedTags,
  isSignedIn,
  isGithubProject,
  repoUrl,
  type,
}: {
  id: string | undefined;
  title: string;
  description: string;
  image: string;
  tags: string[];
  likes: number;
  searchedQuery: string;
  searchedTags: string[];
  isSignedIn: boolean;
  isGithubProject?: boolean;
  repoUrl?: string;
  selectedTags?: string[];
  type?: string | undefined;
}) {
  return (
    <div
      className={`relative flex h-full flex-col overflow-auto rounded-xl border border-base-content/10 px-5 pb-10 pt-5 hover:border-base-content/20`}
    >
      <Link href={isGithubProject ? repoUrl! : `/projects/${id}`}>
        {image && (
          <Image
            src={image}
            alt={``}
            width={1024}
            height={1024}
            placeholder={`blur`}
            blurDataURL={image}
            className={`rounded-lg object-cover`}
          />
        )}
      </Link>
      <div className={`py-4`}>
        <Link href={isGithubProject ? repoUrl! : `/projects/${id}`}>
          <h3 className={`mb-2 text-xl font-bold`}>
            <Highlighter
              searchWords={[searchedQuery]}
              autoEscape={true}
              textToHighlight={title}
            />
          </h3>
          {isGithubProject && (
            <FaGithub
              className={`absolute right-4 top-4 text-2xl text-base-content/50`}
            />
          )}
          <p className={`line-clamp-2 text-sm text-base-content/50`}>
            <Highlighter
              searchWords={[searchedQuery]}
              autoEscape={true}
              textToHighlight={description}
            />
          </p>
        </Link>
        {tags.length > 0 && (
          <ul
            className={`mt-4 flex flex-wrap items-center justify-start gap-x-4`}
          >
            {tags.map(
              (tag, index) =>
                tag != "" && (
                  <li key={index}>
                    <Link
                      href={`/projects?search=${searchedQuery}&tags=${searchedTags.includes(tag) ? searchedTags.filter((t) => t !== tag).join(",") : searchedTags.concat(tag).join(",")}`}
                      className={`badge text-nowrap hover:badge-outline
                    ${searchedTags.includes(tag) ? `badge-accent badge-outline` : ``}
                    `}
                    >
                      {tag}
                    </Link>
                  </li>
                ),
            )}
            {type !== undefined && (
              <Link
                href={`/projects?type=${type}`}
                className={`badge badge-primary badge-outline ml-2 mt-2`}
              >
                {type}
              </Link>
            )}
          </ul>
        )}

        <LikeButton likes={likes} isSignedIn={isSignedIn} projectId={id} />
      </div>
    </div>
  );
}
