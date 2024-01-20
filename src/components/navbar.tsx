import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <div className={`absolute top-0 z-50 w-full bg-base-200 px-4 pt-4`}>
      <div className="navbar rounded-xl bg-base-100">
        <div className="flex-1">
          <Link href={`/`} className="btn btn-ghost text-xl">
            <span className={`text-accent`}>Project</span> Finder
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal flex items-center justify-center space-x-2 px-1">
            <li>
              <Link
                href={`/projects`}
                className={`btn btn-ghost btn-sm font-normal`}
              >
                Find Projects
              </Link>
            </li>
            {session ? (
              <li>
                <Link
                  href={`/users/${session.user.id}`}
                  className={`btn btn-ghost btn-sm font-normal`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href={`/auth/signin`}
                  className={`btn btn-ghost btn-sm text-nowrap font-normal`}
                >
                  Sign In
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
