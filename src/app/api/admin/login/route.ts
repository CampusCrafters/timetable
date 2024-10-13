import { NextRequest,NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

async function connectToDatabase() {
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(process.env.MONGO_URI || '');
      } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw new Error('Database connection error');
      }
    }
}

const AdminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

interface AdminDocument extends mongoose.Document {
    email: string;
    password: string;
}

function modelAdmin() {
    return mongoose.models["Admin"] || mongoose.model<AdminDocument>("Admin", AdminSchema);
}

export async function POST(request: NextRequest) {
    try{
        await connectToDatabase();
        const Admin = modelAdmin();
        const formData = await request.formData();
        
        if(!formData.has('email') || !formData.has('password')){
            return new Response('Email and password are required', { status: 200 });
        }
        
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const Secret = process.env.JWT_SECRET || ''

        const token = jwt.sign({email}, Secret)


        if(await Admin.findOne({ email, password })){
            const response = NextResponse.redirect(new URL('/admin', request.url),302);
            response.cookies.set("admin", token, {  
                sameSite: "lax", 
                path: '/'
            });
            return response;
        }
        else{
            return NextResponse.json('Invalid email or password', { status: 200 });
        }

    }
    catch(e){
        console.error(e);
    }
}