import { NextResponse } from "next/server";

var beeps = 0;

export async function POST(request: Request) {

    const body = await request.json();
    console.log(body);
    console.log(beeps);
    
    if(body.put == true){
        beeps += 1;
        return new NextResponse();
    }

    if(body.fetch == true){
        beeps -= 1;
        return NextResponse.json({beepsCount: beeps});
    }

    return new NextResponse();

}