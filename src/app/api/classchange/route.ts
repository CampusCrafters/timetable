import { NextRequest,NextResponse } from "next/server";
import mongoose from 'mongoose';

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

interface ChangesDocument extends mongoose.Document {
    date: string;
    year: string;
    batch: string;
    timings: string;
    exchange: {
        to: string;
        lecturer_name: string;
    }
}
const ChangeSchema = new mongoose.Schema<ChangesDocument>({
    date: { type: String, required: true },
    year: { type: String, required: true },
    batch: { type: String, required: true },
    timings: { type: String, required: true },
    exchange: {
        to: { type: String, required: true },
        lecturer_name: { type: String, required: true }
    }
});
  
function modelDb() {
    return mongoose.models["Changes"] || mongoose.model<ChangesDocument>("Changes",ChangeSchema);
}


export async function POST(request: NextRequest) {
    try{
        await connectToDatabase();
        const Changes = modelDb();

        const requestData = await request.formData();
        if (!requestData) {
            return NextResponse.json({ message: 'No data provided.' }, { status: 400 });
        }

        const body = {
            date: requestData.get('date'),
            year: requestData.get('year'),
            batch: requestData.get('batch'),
            timings: requestData.get('timings'),
            exchange: {
                to: requestData.get('to'),
                lecturer_name: requestData.get('lecturer_name')
            }
        }
        const data = await Changes.create(body);

        return NextResponse.json({ message: 'Changes added successfully', data});
    }
    catch(e){
        console.log(e);
    }
}