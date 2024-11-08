import prisma from "@/lib/connect"
import { NextResponse } from "next/server"
import { getAuthSession } from "@/lib/authOptions";

export const GET = async (req)=>{
    const { searchParams } = new URL(req.url);
    
    const page = searchParams.get("page");
    const cat = searchParams.get("cat");

    const SHOW_POST_PER_PAGE = 2;

    const query = {
        take: SHOW_POST_PER_PAGE,
        skip: SHOW_POST_PER_PAGE * (page-1), 
        where: {
            ...(cat && {catSlug: cat})
        }
    }
    

    try{
        const posts = await prisma.post.findMany({
            take: SHOW_POST_PER_PAGE,
        })
        return new NextResponse(
            JSON.stringify( posts, { status: 200 })
        )
    }
    catch(err){
        console.log(err)
        return new NextResponse(
            JSON.stringify({ message:"Something went wrong!"}, { status: 500 })
        )
    }
}

// CREATE A POST
export const POST = async (req) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body, userEmail: session.user.email },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
    