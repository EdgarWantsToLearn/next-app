import { NextRequest, NextResponse } from "next/server";
import { posts } from "./route";


export async function GET(request: NextRequest) {
    const { postId, comment } = await request.json();
    console.log(`Comment on post ${postId}: ${comment}`);
    

    const post = posts.find((p) => p.id === postId);
    if (post) {
        post.comments.push();
        return NextResponse.json({
            status: 200,
            body: posts, 
        });
    } else {
        return NextResponse.json({
            status: 404,
            body: { error: "Post not found" },
        });
    }
}




