import { getServerAuthSession } from "@/server/auth";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import BackgroundCellCore from "@/components/background-cells";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <Navbar />
      <main
        className={`flex min-h-[100dvh] items-center justify-center bg-base-200 pt-24`}
      >
          <BackgroundCellCore />
        <div
          className={`pointer-events-none z-50 flex flex-col items-center justify-center md:flex-row`}
        >
          <div className="ml-6 flex flex-col items-center justify-center pb-20 pt-16">
            <h1 className="text-5xl font-bold text-white">
              Tech Project Discovery for
              <span className={`ml-2 text-accent`}>Passionate Innovators</span>.
            </h1>
            {session ? (
              <p className="pt-6 text-center">
                Welcome Back{" "}
                <span className={`font-bold`}>{session.user.name}</span>! <br />
                Start browsing projects below.
              </p>
            ) : (
              <p className="py-6">
                Unlock Your Coding Potential: Explore, Connect, and Contribute
                with Project Finder – Where Tech Dreams Find Their Code.
              </p>
            )}
            <Link
              href={`/api/auth/signin`}
              className="btn btn-outline btn-neutral btn-wide pointer-events-auto mt-6"
            >
              {session ? "Browse Projects" : "Get Started"}
            </Link>
          </div>
          <div className={`w-full px-8`}>
            <div className={`relative h-[40dvh] w-full`}>
              <Image
                src={`/people.jpg`}
                alt={``}
                fill
                className={`rounded-3xl object-cover`}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
