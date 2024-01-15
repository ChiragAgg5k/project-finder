"use client";

import {AiOutlineLike} from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import {useState} from "react";
import {api} from "@/trpc/react";

export default function LikeButton({
    likes,
    isSignedIn
                                   }:{
    likes: number;
    isSignedIn: boolean;
}){

    const [liked, setLiked] = useState(false);

    return (
        <>
        <button
            className={`btn btn-ghost btn-sm absolute bottom-4 right-4 z-50`}
            disabled={!isSignedIn}
            onClick={
                () => {
                    setLiked(!liked);
                }
            }
        >
            {liked ? <AiFillLike className={`text-xl`}/> : <AiOutlineLike className={`text-xl`}/>}
            {likes > 0 ? <span>{likes}</span> : <></>}
        </button>
        </>
    )
}
