import {api} from "@/trpc/server";

export default async function ProjectPage({
    params
                                    }:{
    params: {
        id: string;
    };
}){

    const project = await api.project.fetch.query({
        id: params.id
    });

    return(
        <div className={`mt-20 p-8 flex-col flex items-center justify-center min-h-[90dvh] bg-base-200`}>
            <pre className={`w-full overflow-hidden`}>
                {JSON.stringify(project, null, 2)}
            </pre>
        </div>
    )
}
