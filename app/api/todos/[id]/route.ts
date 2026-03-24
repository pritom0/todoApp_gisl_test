import { api } from "@/utility/axiosLib";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{id: string}>
}

export async function PUT (request:NextRequest, context: Context) {
  try {

    const {id} = await context.params;
    if(id==='24') {
      const url = request.nextUrl.clone();
      url.pathname = `api/todo/new-id-24`
      return NextResponse.redirect(url, 308);
    }

    const body = await request.json();
    const {task} = body;
    const response = await api.put(id, {task})
    return NextResponse.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json ({error:"failed to update data", message: axiosError?.message, status: 500})    
  }
  
}

export async function DELETE (_:Request, context: Context) {
  try {

    const {params} = context;
    const {id} = await params;
    const response = await api.delete(id)
    return NextResponse.json(response.data)
  } catch (error) {
    const axiosError = error as AxiosError;
    return NextResponse.json ({error:"failed to delete data", message: axiosError?.message, status: 500})    
  }
  
}
