'use client'

import { IPost } from "@/types"
import { useEffect, useState } from "react";

const PostsListComponent = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const fetchAllPosts = async () => {
        const response = await fetch("http://localhost:3000/api/posts");
        const responseJson = await response.json();
        setPosts(responseJson.data);
    };


    return (
        <div>
            List posts

            {posts.map((post: IPost) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                </div>
            ))}
        </div>
    );
}

export default PostsListComponent;