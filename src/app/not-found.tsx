export default function NotFound(){
    return (
        <div className={`mt-20 p-8 flex-col flex items-center justify-center min-h-[90dvh] bg-base-200`}>
            <h1
                className={`text-3xl mb-2 font-bold text-center `}
            >
                404: Page Not Found
            </h1>
            <p
                className={`text-center`}
            >
                This page does not exist. Please check the URL.
            </p>
        </div>
    )
}
