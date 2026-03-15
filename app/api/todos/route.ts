import { api } from "@/utility/axiosLib";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export async function GET () {
  try {
    const response = await api.get("");
    return NextResponse.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json({error:"failed to fetch", message: axiosError?.message, status: 500})
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

