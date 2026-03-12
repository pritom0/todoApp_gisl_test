import { api } from "@/utility/axiosLib";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request: NextRequest, 
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    // const body = await request.json();
    const {id} = await params;
    const url = request.url;
    const nextUrl = request.nextUrl;
    console.log("get id", {url, nextUrl})
    
    const response = await api.get(`/${id}`);
    return NextResponse.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError;
    return {error:"failed to fetch", message: axiosError?.message, status: 500}
  }
}

export async function POST (request: Request) {
  try {
    // console.log(request);
    const body = await request.json();
    const {task} = body;
    const response = await api.post("", {task});
    return NextResponse.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json ({error:"failed to post data", message: axiosError?.message, status: 500})
  }
}

