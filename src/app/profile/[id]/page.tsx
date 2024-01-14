import SignoutButton from "@/components/signout-button";
import {api} from "@/trpc/server";
import {getServerAuthSession} from "@/server/auth";

export default async function ProfilePage({
    params,
                                    }:{
    params: {
        id: string,
    }
}){

    const session = await getServerAuthSession();
    const users = await api.user.fetch.query({
        userId: params.id,
    });

    if(!users[0]){
        return(
            <div className={`mt-20 p-8 flex-col flex items-center justify-center min-h-[90dvh] bg-base-200`}>
                <h1 className={`text-3xl font-bold`}>
                    User Not Found
                </h1>
            </div>
        )
    }

    const user = users[0];
    const isOwnProfile = session?.user.id === user.id;

    return(
        <div className={`mt-20 p-8 flex-col flex items-center justify-center min-h-[90dvh] bg-base-200`}>
            <h1 className={`text-3xl font-bold mb-2`}>
                {user.name}
            </h1>
            <p className={`text-base-content/70 mb-4`}>
                {user.email}
            </p>
            {isOwnProfile ?
            <SignoutButton className={`btn btn-wide btn-neutral mt-4`}/>
            : <></>}
        </div>
    )
}
