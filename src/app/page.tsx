import { getServerAuthSession } from "@/server/auth";
import Footer from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import BackgroundCellCore from "@/components/background-cells";
import { IoCloudUploadOutline } from "react-icons/io5";
import StaggeredText from "@/components/staggered-text";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <>
      <main
        className={`flex min-h-[100dvh] items-center justify-center bg-base-200 pb-16 pt-24`}
      >
        <BackgroundCellCore />
        <div
          className={`pointer-events-none z-50 flex flex-col items-center justify-center md:flex-row`}
        >
          <div className="flex flex-col items-center justify-center pb-20 pt-16">
            <h1 className="ml-6 text-5xl font-bold text-base-content">
              Tech Project Discovery for
              <span className={`ml-2 text-accent`}>Passionate Innovators</span>.
            </h1>
            <StaggeredText
              className={`ml-6 py-6`}
              fontSize={`1rem`}
              text={
                "Unlock Your Coding Potential: Explore, Connect, and Contribute with Project Finder – Where Tech Dreams Find Their Code."
              }
            />
            <div className={`flex flex-col sm:flex-row`}>
              {session ? (
                <Link
                  href={`/projects/create`}
                  className="btn btn-outline btn-primary  pointer-events-auto mr-0 mt-6 sm:mr-4"
                >
                  Upload Project
                  <IoCloudUploadOutline className={`ml-1 text-xl`} />
                </Link>
              ) : (
                <></>
              )}
              <Link
                href={session ? `/projects` : `/auth/signin`}
                className="btn btn-outline btn-neutral btn-wide pointer-events-auto mt-6"
              >
                {session ? "Browse Projects" : "Get Started"}
              </Link>
            </div>
          </div>
          <div className={`w-full px-8`}>
            <div className={`relative h-[40dvh] w-full`}>
              <Image
                src={`/people.jpg`}
                alt={``}
                fill
                priority={true}
                placeholder={`blur`}
                blurDataURL={`/people.jpg`}
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
