"use client";
import UpcomingClasses from "@/components/UpcomingClass/UpcomingClass";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Home() {
  const [classDetails, setClassDetails] = useState({
    currentClass: { course: "", faculty: "", time: "" },
    nextClasses: [],
  });
  const [filename,setFilename] = useState("")
  const [error, setError] = useState("");

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); 
    // Ensures we get the correct 24-hour format like "13:55"
  }

  async function fetchDetails() {
    try {
      const response = await axios.get("/api/getjson");
      setFilename(response.data.YearNdBatch)
      const timetables = response.data.timetables;

      if (timetables && timetables.length > 0) {
        const currentTime = getCurrentTime();
        const currentClass = timetables.find((classInfo: any) => {
          if (!classInfo.timings) return false;
          const [startTime, endTime] = classInfo.timings.split("-")
          return currentTime >= startTime && currentTime <= endTime;
        });
        const nextClasses = timetables
          .filter((classInfo: { timings: any }) => {
            const [startTime] = classInfo.timings.split("-")
              return currentTime < startTime
          })
          .map((classInfo: { course_id: string; course_lecturer_name: string; timings: string }) => {
            const [startTime, endTime] = classInfo.timings
              .split("-")
            return {
              course: classInfo.course_id,
              faculty: classInfo.course_lecturer_name,
              time: `${startTime} - ${endTime}`,
            };
          });
          if(!currentClass) {
            setClassDetails({
              currentClass: { course: "Break", faculty: "---", time: "---" },
              nextClasses: nextClasses,
            });
          }
          else{
            setClassDetails({
              currentClass: {
                course: currentClass.course_id,
                faculty: currentClass.course_lecturer_name,
                time: currentClass.timings,
              },
              nextClasses,
            });
          } 
      } 
      else {
        setClassDetails({
          currentClass: { course: "NO CLASS CURRENTLY", faculty: "--------", time: "--------" },
          nextClasses: [],
        });
      }
    } 
    catch (err) {
      setError("Failed to fetch timetable. Please try again.");
      console.error(err);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 flex flex-col md:flex-row">
      <div className="flex justify-center mt-10 sm:justify-start sm:p-2 sm:mx-3 md:w-2/7">
      <div className="bg-neutral-950 rounded-xl min-w-sm p-6">
        {error && <p className="text-red-500">{error}</p>}
        <UpcomingClasses currentClass={classDetails.currentClass} nextClasses={classDetails.nextClasses} />
      </div>
      </div>
      <div className="hidden md:flex md:relative md:justify-end md:mx-12 md:w-5/7">
      <Image priority src={`https://storage.googleapis.com/timetable-iiitk/${filename}`} alt="Timetable here" width={1000} height={1000} className="object-contain "></Image>
      </div>
    </div>
  );
}
