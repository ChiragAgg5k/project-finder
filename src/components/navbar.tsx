import {getServerAuthSession} from "@/server/auth";
import Link from "next/link";

export default async function Navbar() {

  const session = await getServerAuthSession();

  return (
    <div className={`absolute bg-base-200 top-0 z-50 w-full pt-4 px-4`}>
      <div className="navbar rounded-xl bg-base-100">
        <div className="flex-1">
          <Link href={`/`} className="btn btn-ghost text-xl">Project Finder</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <Link href={`/projects`} className={`btn btn-sm btn-ghost font-normal`}>Find Projects</Link>
            </li>
            {session ? <li>
              <Link href={`/profile`} className={`btn btn-sm btn-ghost font-normal`}>Profile</Link>
            </li> : <li>
                <Link href={`/auth/signin`} className={`text-nowrap`}>
                    Sign In
                </Link>
            </li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
