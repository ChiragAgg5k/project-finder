"use client";

import {FaGoogle} from "react-icons/fa";
import {signIn} from "next-auth/react";

export default function GoogleSigninButton(){

    return(
        <div className="my-2 flex justify-center">
            <button
                onClick={
                    async () => {
                        await signIn("google", {
                            callbackUrl: "/",
                        });
                    }
                }
                className="mx-1 rounded-full border-2 border-white p-3 hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
                <FaGoogle className="text-sm" />
            </button>
        </div>
    )
}
