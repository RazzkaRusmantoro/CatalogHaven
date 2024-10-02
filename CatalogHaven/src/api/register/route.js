import { NextResponse, NextRequest } from "next/server";

export async function POST(NextRequest) {
    try {
        const {fname, lname, email,username, password} = await req.json();

        console.log("First name:", fname);
        console.log("Last name:", lname);
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);


        return NextResponse.json({ message: "User registered."}, {status: 201});
    } catch (error) {
        return NextResponse.json(
            { message: "An error has occurred while attempting to register the user."},
            {status: 500});
    }
}