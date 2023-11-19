import { NextResponse } from "next/server";

var storage = {} ;

export async function GET(request: Request) {

    // return data from variable
    return new NextResponse(JSON.stringify(storage));

}

export async function POST(request: Request) {

    
    storage = await request.json();
    console.log(storage);
    // save data from frontend in variable
    return new NextResponse("json post");

}