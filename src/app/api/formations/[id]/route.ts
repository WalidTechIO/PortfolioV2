import { checkAuth } from "@/auth/auth";
import { createClientServer } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) {
        return auth;
    }
    const { data, error } = await supabase.from("formations").select("*").eq("id", params.id).maybeSingle();
    if(data == null) return NextResponse.json(null, {status: 404})
    if (error) throw error;
    return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) {
        return auth;
    }
    const { title, duration, location, description, image, technologies, extraLinks, landingDescription, speciality } = await request.json();
    const { data, error } = await supabase.from("formations").update({ title, duration, location, description, image, technologies, extraLinks, landingDescription, speciality }).eq("id", params.id);
    if (error) throw error;
    return NextResponse.json(data);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const supabase = createClientServer();
    const auth = await checkAuth(supabase);
    if(auth) {
        return auth;
    }
    const { data, error } = await supabase.from("formations").delete().eq("id", params.id);
    if (error) throw error;
    return NextResponse.json(data);
}