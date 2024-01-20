import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import GoogleSigninButton from "@/components/google-signin-button";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/");
  }

  return (
      <div className="flex min-h-screen flex-col items-center justify-center py-2 ">
        <main className=" flex w-full flex-1 flex-col items-center justify-center bg-base-200 px-20 text-center">
          <div className="flex w-2/3 max-w-4xl rounded-2xl shadow-2xl ">
            <div className="w-3/5 rounded-l-2xl bg-base-content/10 p-5">
              <div className="text-left font-bold">
                <span className="mr-1 font-bold text-accent">Project</span>Finder
              </div>

              <div className="py-10">
                <h2 className="mb text-3xl font-bold text-accent">
                  Sign in to Account
                </h2>
                <div className="mb-2 inline-block w-12 border-2 border-accent"></div>
                <GoogleSigninButton />

                <p className="my-3 text-white">Sign-up with Google.</p>
                <p className=" mb-3"> <span className="text-accent">Already signed-in? </span> Login with email</p>
                <div className="flex flex-col items-center">
                  <div className="mb-3 flex w-64 items-center bg-gray-600 p-2 ">
                    <FaRegEnvelope className="mr-2 text-white" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>

                  <div className="mb-3 flex w-64 items-center bg-gray-600 p-2">
                    <MdLockOutline className="mr-2 text-white" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="flex-1 bg-transparent text-sm outline-none"
                    />
                  </div>

                  <div className="mb-5 flex w-64 justify-between">
                    <label className="flex items-center text-xs">
                      <input type="checkbox" name="remember" className="mr-1" />
                      Remember me
                    </label>
                    <a href="#" className="text-xs">
                      Forgot Password?
                    </a>
                  </div>
                  <a href="#" className="btn btn-outline btn-accent btn-wide">
                    Sign In
                  </a>
                </div>
              </div>
            </div>
            {/*sign in section*/}

            <div className="w-2/5 rounded-br-2xl rounded-tr-2xl bg-base-100 px-12 py-36">
              <h2 className="mb-2 text-2xl font-bold">Hello Innovator!</h2>
              <div className="mb-2 inline-block w-12 border-2 border-white"></div>
              <p className="mb-10 text-accent">Fill up the Details.</p>
              <p className="mb-10">Find, Learn, and Innovate with <span className="text-accent">Project Finder</span>.</p>

            </div>
          </div>
        </main>
      </div>
  );
}
