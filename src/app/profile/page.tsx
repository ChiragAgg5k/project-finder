import {getServerAuthSession} from "@/server/auth";
import {redirect} from "next/navigation";

export default async function ProfilePage(){
    const session = await getServerAuthSession();

    if(!session){
        redirect("/")
    }

    redirect(`/profile/${session.user.id}`);
}
