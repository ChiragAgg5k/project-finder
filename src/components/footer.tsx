import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer bg-neutral p-10 text-neutral-content">
      <aside>
        <h4 className={`text-xl font-bold`}>Team Obsidian</h4>
        <p>
          Bennett University{" "}
          <span className={`text-accent`}>Industry Project</span> Hackathon
        </p>
      </aside>
      <nav>
        <header className="footer-title">Social</header>
        <div className="grid grid-flow-col gap-4">
          <Link href={`https://github.com/ChiragAgg5k`} target={"_blank"} rel={"noopener noreferrer"}>
            <FaGithub
              className={`text-3xl transition-all ease-in-out hover:text-base-content`}
            />
          </Link>
          <Link href={`https://www.linkedin.com/in/chiragagg5k/`} target={"_blank"} rel={"noopener noreferrer"}>
            <FaLinkedin
              className={`text-3xl transition-all ease-in-out hover:text-base-content`}
            />
          </Link>
          <Link href={`https://twitter.com/ChiragAgg5k`} target={"_blank"} rel={"noopener noreferrer"}>
            <FaXTwitter
              className={`text-3xl transition-all ease-in-out hover:text-base-content`}
            />
          </Link>
        </div>
      </nav>
    </footer>
  );
}
