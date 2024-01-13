import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
      <main>
        {session ? (
            <div>
                <h1>Welcome {session.user.name}</h1>
                <a href="/api/auth/signout">Signout</a>
            </div>
        ) : (
            <div>
                <h1>Not logged in</h1>
                <a href="/api/auth/signin">Login</a>
            </div>
        )}
      </main>
  );
  }
