import SignoutButton from "@/components/signout-button";

export default function ProfilePage({
    params,
                                    }:{
    params: {
        id: string,
    }
}){
    return(
        <div className={`mt-24`}>
            Profile Page {params.id}
            <SignoutButton className={`btn btn-ghost`} />
        </div>
    )
}
