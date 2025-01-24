import { getPost, getPostById, updatePost } from "@/actions/blog";
import { checkAuth } from "@/auth/auth";
import { createClientServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) {
        return auth;
    }
    const { title, content, slug } = await request.json();
    const { post } = await getPost(params.id);
    if(post === undefined) return NextResponse.json({}, {status: 404})
    const newPost = {
        ...post,
        title,
        content,
        slug
    }
    await updatePost(newPost);
    return NextResponse.json(newPost);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) {
        return auth;
    }
    await supabase.from("blog").delete().eq("id", params.id);
    return new Response(null, {status: 204});
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) return auth;
    const { post } = await getPostById(params.id)
    return NextResponse.json(post)
}