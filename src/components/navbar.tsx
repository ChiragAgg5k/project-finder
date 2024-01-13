import {getServerAuthSession} from "@/server/auth";
import Link from "next/link";

export default async function Navbar() {

  const session = await getServerAuthSession();

  return (
    <div className={`absolute top-0 bg-base-200 z-50 w-full pt-4 px-4`}>
      <div className="navbar rounded-xl bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Project Finder</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Find Projects</a>
            </li>
            <li>
              <details>
                <summary>Menu</summary>
                <ul className="rounded-t-none bg-base-100 p-2">
                  {session && <li>
                    <Link href={`/api/auth/signout`} className={`text-nowrap`}>
                        Sign Out
                    </Link>
                  </li>}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
