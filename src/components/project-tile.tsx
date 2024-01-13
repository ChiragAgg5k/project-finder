import Image from "next/image";

export default function ProjectTile({
    title,
    description,
    image,
    tags,
                                    }:{
    title: string,
    description: string,
    image: string,
    tags: string[],
}) {
    return (
      <div
        className={`flex h-full flex-col rounded-xl border border-base-content/10 px-6 pt-6 hover:border-base-content/20`}
      >
        <div className={`relative h-48 `}>
          <Image
            src={`/people.jpg`}
            alt={``}
            fill
            className={`rounded-lg object-cover`}
          />
        </div>
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
      </div>
    );
}
