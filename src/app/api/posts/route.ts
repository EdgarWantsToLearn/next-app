import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const posts = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    comments: [],
  },
  {
    id: 2,
    title: "Post 2",
    content: "Content 2",
    comments: [],
  },
  {
    id: 3,
    title: "Post 3",
    content: "Content 3",
    comments: [],
  },
];

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log("POST request body", body);
  
    const newPost = {
      id: posts.length + 1,
      ...body,
      comments: [],
    };
  
    posts.push(newPost);
  
    return NextResponse.json({
      status: 200,
      body: posts,
    });
  }
  

export async function GET(request: NextRequest) {
    const posts = await prisma.post.findMany();

    return NextResponse.json({
        status: 200,
        data: posts,
    })
}

export async function GET_ALL(request: NextRequest) {
    const posts = await prisma.post.findMany();
    const categories = await prisma.category.findMany();

    return NextResponse.json({
        status: 200,
        data: {
            posts: posts,
            categories: categories,
        },
    });
}

export async function GET_ONE(request: NextRequest) {
    const { type, id } = request.query;

    if (!id || !type) {
        return NextResponse.json({
            status: 400,
            body: { error: "Missing type or id parameter" },
        });
    }

    if (type === "post") {
        const post = await prisma.post.findUnique({
            where: { id: Number(id) },
        });

        if (!post) {
            return NextResponse.json({
                status: 404,
                body: { error: "Post not found" },
            });
        }

        return NextResponse.json({
            status: 200,
            body: post,
        });
    } else if (type === "category") {
        const category = await prisma.category.findUnique({
            where: { id: Number(id) },
        });

        if (!category) {
            return NextResponse.json({
                status: 404,
                body: { error: "Category not found" },
            });
        }

        return NextResponse.json({
            status: 200,
            body: category,
        });
    } else {
        return NextResponse.json({
            status: 400,
            body: { error: "Invalid type parameter" },
        });
    }
}

export async function CREATE(request: NextRequest) {
    const body = await request.json();
    console.log("CREATE request body", body);

    if (body.type === "post") {
        const newPost = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
            },
        });

        return NextResponse.json({
            status: 200,
            body: newPost,
        });
    } else if (body.type === "category") {
        const newCategory = await prisma.category.create({
            data: {
                name: body.name,
            },
        });

        return NextResponse.json({
            status: 200,
            body: newCategory,
        });
    } else {
        return NextResponse.json({
            status: 400,
            body: { error: "Invalid request type" },
        });
    }
}

export async function DELETE(request: NextRequest) {
    const { type, id } = request.query;

    if (!id || !type) {
        return NextResponse.json({
            status: 400,
            body: { error: "Missing type or id parameter" },
        });
    }

    if (type === "post") {
        const deletedPost = await prisma.post.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({
            status: 200,
            body: deletedPost,
        });
    } else if (type === "category") {
        const deletedCategory = await prisma.category.delete({
            where: { id: Number(id) },
        });

        return NextResponse.json({
            status: 200,
            body: deletedCategory,
        });
    } else {
        return NextResponse.json({
            status: 400,
            body: { error: "Invalid type parameter" },
        });
    }
}