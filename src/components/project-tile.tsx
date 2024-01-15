import Image from "next/image";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import LikeButton from "@/components/like-button";
import {FaGithub} from "react-icons/fa";

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
    isGithubProject
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
}) {
  return (
    <div
      className={`relative flex h-full overflow-auto flex-col rounded-xl border border-base-content/10 px-5 pb-10 pt-5 hover:border-base-content/20`}
    >
      <Link href={`/projects/${id}`}>
        {image && <Image
          src={image}
          alt={``}
          width={1024}
          height={1024}
          placeholder={`blur`}
          blurDataURL={image}
          className={`rounded-lg object-cover`}
        />}
      </Link>
      <div className={`py-4`}>
        <Link href={`/projects/${id}`}>
          <h3 className={`mb-2 text-xl font-bold`}>
            <Highlighter
              searchWords={[searchedQuery]}
              autoEscape={true}
              textToHighlight={title}
            />
          </h3>
            {
              isGithubProject && (
                <FaGithub className={`text-2xl text-base-content/50 absolute top-4 right-4`}/>
              )
            }
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
                    <span
                      className={`badge text-nowrap
                    ${searchedTags.includes(tag) ? `badge-accent badge-outline` : ``}
                    `}
                    >
                      {tag}
                    </span>
                  </li>
                ),
            )}
          </ul>
        )}

        <LikeButton likes={likes} isSignedIn={isSignedIn} />
      </div>
    </div>
  );
}
