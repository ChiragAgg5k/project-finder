import Image from "next/image";
import Link from "next/link";

export default function ProjectTile({
    id,
    title,
    description,
    image,
    tags,
                                    }:{
    id: string,
    title: string,
    description: string,
    image: string,
    tags: string[],
}) {
    return (
      <Link
        href={`/projects/${id}`}
        className={`flex h-full flex-col rounded-xl border border-base-content/10 px-5 pt-5 hover:border-base-content/20`}
      >
          <Image
            src={`/people.jpg`}
            alt={``}
            width={1024}
            height={1024}
            className={`rounded-lg object-cover`}
          />
        <div className={`py-4`}>
          <h3 className={`mb-2 text-xl font-bold`}>{title}</h3>
          <p className={`line-clamp-2 text-sm text-base-content/50`}>
            {description}
          </p>
          <ul className={`mt-4 flex items-center justify-end space-x-4`}>
            {tags.map((tag, index) => (
                <li
                key={index}
                >
                    <span className="badge">{tag}</span>
                </li>
                ))}
          </ul>
        </div>
      </Link>
    );
}
