"use client";

import {AiOutlineLike} from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import {useState} from "react";

export default function LikeButton(){

    const [liked, setLiked] = useState(false);

    return (
        <button
            className={`btn btn-square btn-ghost btn-sm absolute bottom-4 right-4 z-50`}
            onClick={
                () => {
                    setLiked(!liked);
                }
            }
        >
            {liked ? <AiFillLike className={`text-xl`}/> : <AiOutlineLike className={`text-xl`}/>}
        </button>
    )
}
