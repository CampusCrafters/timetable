import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Storage } from "@google-cloud/storage";
import mongoose, { Document, Model } from 'mongoose';

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

interface ITimetable extends Document {
  day: string;
  timetables: {
    timings: string;
    course_id: string;
    course_lecturer_name: string | null;
  }[];
}

const TimetableSchema = new mongoose.Schema<ITimetable>({
  day: { type: String, required: true },
  timetables: [
    {
      timings: { type: String, required: true },
      course_id: { type: String, required: true },
      course_lecturer_name: { type: String, default: null, required: false },
    },
  ],
});

function modelDb(name: string) {
  const Timetable: Model<ITimetable> = mongoose.models[name] ? mongoose.models[name] as Model<ITimetable> : mongoose.model<ITimetable>(name, TimetableSchema);
  return Timetable;
}

async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch image from URL: ${response.statusText}`);
  }
  const buffer = await response.arrayBuffer();
  return Buffer.from(buffer).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_AI_API_KEY || '';
    const genAI = new GoogleGenerativeAI(apiKey);

    const formData = await request.formData();
    const imageFile = formData.get('image');
    const Timetable = await modelDb(String(formData.get('Year')) + String(formData.get('course')) + String(formData.get('Batch')));

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await (imageFile as Blob).arrayBuffer());

    const storage = new Storage({
      keyFilename: process.env.GOOGLE_CLOUD_KEYFILE || 'keys.json',
    });
    const bucketName = 'timetable-iiitk';
    const bucket = storage.bucket(bucketName);
    const fileName = String(formData.get('Year')) + String(formData.get('course')) + String(formData.get('Batch'));
    const file = bucket.file(fileName);

    await file.save(buffer, {
      contentType: (imageFile as File).type,
    });
    console.log(`File uploaded to ${bucketName}/${fileName}`);

    const imageData = await fetchImageAsBase64(`https://storage.googleapis.com/${bucketName}/${fileName}`);

    const model = await genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });
    const result = await model.generateContent([
      `You are a production-level png extractor tool. You will be given a png with a set of timetables. You have to extract the timetables into a file. 
      Be careful with all the details please double check the details timings of classes is very important dont change it. Convert the timings to 24 hour format . For Sundays just enter Break for entire day . If there is a gap in the timetables, specify it as lunch breaks or just breaks. Also, make the file easy to interpret and clean.

      OUTPUT FORMAT:
      {.
        day: day(full name like Monday,Tuesday...),
        timetables: {timings}(required), course_id(required)( Use coursename(eg:Data Structures and Algorithms) instead of course_id(eg:ICS 215) which is given in the table and Make it as "-" when no course found), course_lecturer_name (if there isn't a course lecturer, specify "null" as a string) }
      }
      make it as a JSON array of this format.
      strictly don't add and \`\` "json" at the start and end of the file. Just the data this is important.`,
      {
        inlineData: {
          data: imageData,
          mimeType: "image/png",
        },
      },
    ]);

    const responseText = await result.response.text();
    console.log('Raw AI Response:', responseText);

    let cleanedResponseText = responseText.trim();

    if (!cleanedResponseText.startsWith('[')) {
      cleanedResponseText = `[${cleanedResponseText.replace(/}\s*$/, '},')}]`;
    } else if (cleanedResponseText.endsWith(',')) {
      cleanedResponseText = cleanedResponseText.slice(0, -1);
    }

    let parsedTimetable;
    try {
      parsedTimetable = JSON.parse(cleanedResponseText);
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    await connectToDatabase();
    await Timetable.deleteMany({}); 
    await Timetable.insertMany(parsedTimetable);

    return NextResponse.json({ message: 'Timetable uploaded successfully', data: parsedTimetable });

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
}
