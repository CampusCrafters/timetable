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
            console.log('Email and password are required');
            return NextResponse.json('Email and password are required', { status: 200 });
        }

        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const Secret = process.env.JWT_SECRET || ''

        const token = jwt.sign({email}, Secret)


        if(!email.endsWith("@iiitkottayam.ac.in")){
            console.log('Invalid email');
            return NextResponse.json('Invalid email', { status: 200 });
        }

        if(await Admin.findOne({ email })){
            console.log('Admin already exists');
            return NextResponse.json('Admin already exists', { status: 200 });
        }

        await Admin.create({ email, password });
        
        const response =  NextResponse.redirect(new URL('/admin', request.url),307);
        response.cookies.set("admin", token, {  
            sameSite: "lax", 
            path: '/'
        });

        return response;

        
    }
    catch(e){
        console.error(e);
    }
}