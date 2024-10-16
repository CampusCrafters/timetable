import { NextResponse } from "next/server";
import mongoose from 'mongoose';
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';

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

const TimetableSchema = new mongoose.Schema<TimetableDocument>({
  day: { type: String, required: true },
  timetables: [
    {
      timings: { type: String, required: true },
      course_id: { type: String, required: true },
      course_lecturer_name: { type: String, required: true },
    },
  ],
});

interface TimetableDocument extends mongoose.Document {
  day: string;
  timetables: {
    timings: string;
    course_id: string;
    course_lecturer_name: string;
  }[];
}

interface ChangesDocument extends mongoose.Document {
  date: string;
  timings: string;  // Changed from `String` to `string`
  exchange: {
    to: string;  // Changed from `String` to `string`
  };
}

const ChangeSchema = new mongoose.Schema<ChangesDocument>({
  date: { type: String, required: true },
  timings: { type: String, required: true },
  exchange: {
    to: { type: String, required: true },
  },
});

function getCurrentDay() {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
}

async function decodeEmail() {
  const token = cookies().get('token')?.value || '';
  const secret = process.env.JWT_SECRET || '';

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload;
    const jsonString = JSON.stringify(payload.username);
    const email = jsonString.split(':')[1].split('}')[0].trim().replace(/[""]/g, '');
    const emailDetails = extractDetails(email);

    if (!emailDetails) return null;

    const batch = emailDetails.rollNo % 3 === 0 ? 3 : emailDetails.rollNo % 3;
    return `${emailDetails.year}${emailDetails.course}${batch}`;

  } catch (error) {
    console.error('Error decoding email:', error);
    return null;
  }
}

function extractDetails(email: string) {
  const regex = /(\d{2})([a-z]{3})(\d+)@iiitkottayam\.ac\.in/;
  const match = email.match(regex);

  if (match) {
    const year = `20${match[1]}`;
    const course = match[2];
    const rollNo = parseInt(match[3], 10);

    return { year, course, rollNo };
  } else {
    console.error('Invalid email format:', email);
    return null;
  }
}

function modelDb(YearNdBatch: string) {
  if (!YearNdBatch) {
    throw new Error('Invalid model name');
  }

  return mongoose.models[YearNdBatch] || mongoose.model<TimetableDocument>(YearNdBatch, TimetableSchema);
}

function modelChanges() {
  return mongoose.models["Changes"] || mongoose.model<ChangesDocument>("Changes", ChangeSchema);
}

export async function GET() {
  try {
    await connectToDatabase();

    const YearNdBatch = await decodeEmail();

    if (!YearNdBatch) {
      return NextResponse.json({ error: 'Invalid authentication' }, { status: 401 });
    }

    const Timetable = modelDb(YearNdBatch);
    const Changes = modelChanges();
    const day = getCurrentDay();
    const date = new Date().toISOString().split('T')[0].split('-').reverse().join('-');

    const data = await Timetable.findOne({ day });
    const year = YearNdBatch.slice(0, 4);
    const batch = YearNdBatch.slice(4, 8);
    console.log(year,batch);
    const changes = await Changes.find({ date,year,batch });
    console.log(changes);
    console.log(data);

    if (!data) {
      return NextResponse.json({ error: 'No timetable found for today' }, { status: 404 });
    }

    if (changes) {
      changes.forEach((change:any) => {
        data.timetables.forEach((timetable: any) => {
          if (change.timings === timetable.timings.split('-')[0]) {
            timetable.course_id = change.exchange.to;
            timetable.course_lecturer_name = change.exchange.lecturer_name;
          }
        });
      });
    }

    return NextResponse.json({ timetables: data.timetables, YearNdBatch });

  } catch (error) {
    console.error('Failed to fetch timetable:', error);
    return NextResponse.json({ error: 'Failed to fetch timetable' }, { status: 500 });
  }
}
