import { NextRequest, NextResponse } from "next/server"

const posts = [
    {
        id: 1,
        title: 'Post 1',
        content: 'Content 1'
    },
    {
        id: 2,
        title: 'Post 2',
        content: 'Content 2'
    },
    {
        id: 3,
        title: 'Post 3',
        content: 'Content 3'
    }
]

export async function GET() {
    return NextResponse.json({
        status: 200,
        body: posts
    })
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    console.log("POST request body", body)
    
    posts.push({
        id: 100,
        ...body
    })

    return NextResponse.json({
        status: 200,
        body: posts
    })
}

export async function COMMENT(request: NextRequest) {
    const { postId, comment } = await request.json();
    console.log(`Comment on post ${postId}: ${comment}`);

const post = posts.find((p) => p.id === postId);
if (post) {
  post.comments.push(comment);
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



