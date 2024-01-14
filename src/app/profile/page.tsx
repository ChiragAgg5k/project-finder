import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export default async function ProfilePage(){
    const session = await getServerAuthSession();

    if(!session){
        redirect("/")
    }

    redirect(`/profile/${session.user.id}`);

    return(
        <div className={`mt-20 p-8 flex-col flex items-center justify-center min-h-[90dvh] bg-base-200`}>
            <h1 className={`text-3xl font-bold`}>
                Loading...
            </h1>
        </div>
    )
}
