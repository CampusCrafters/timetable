"use client"
import Image from "next/image";
import axios from "axios";
import BgImage from "../../public/bg.png";
import { toast } from 'react-toastify';

export default function Home() {

  async function handleForm(inputs: any) {
    inputs.preventDefault();
    const selectedBatches = Array.from(inputs.target.batch)
      .filter((checkbox: any) => checkbox.checked)
      .map((checkbox: any) => checkbox.value);
    const commonData = {
      date: inputs.target[0].value,
      timings: inputs.target[1].value,
      to: inputs.target[2].value,
      lecturer_name: inputs.target[3].value,
      year: inputs.target[4].value,
    };
    for (const batch of selectedBatches) {
      const formData = new FormData();
      formData.append("date", commonData.date);
      formData.append("timings", commonData.timings);
      formData.append("to", commonData.to);
      formData.append("lecturer_name", commonData.lecturer_name);
      formData.append("batch", batch);
      formData.append("year", commonData.year);

      try {
        const res = await axios.post("/api/classchange", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.status === 200) {
          toast.success(`Schedule changed for batch: ${batch}`, {
            theme: "dark",
            position: "bottom-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        toast.error(`Failed to change schedule for batch: ${batch}`, {
          theme: "dark",
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }

    inputs.target.reset();
  }

  const timingsOptions = ["09:00", "10:00", "11:05", "12:05", "14:00", "15:00", "16:00"];
  const batchOptions = ["bcs1", "bcs2", "bcs3", "bec1", "bec2", "bec3", "bcd1", "bcd2", "bcd3", "bcy1", "bcy2", "bcy3"];
  const yearOptions = ["2023"];

  return (
    <div className="min-h-screen bg-stone-950 text-white flex items-center justify-center p-10 relative">
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src={BgImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          quality={100}
          className="filter blur-sm opacity-90"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/70 to-transparent z-10"></div>

      <div className="relative z-20 w-full max-w-lg bg-stone-950 bg-opacity-90 rounded-lg shadow-2xl p-10">
        <h1 className="text-yellow-500 text-5xl font-extrabold mb-10 text-center">Admin Panel</h1>

        <form onSubmit={handleForm} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <input 
              type="text" 
              placeholder="Date (dd-mm-yyyy)" 
              className="w-full bg-stone-900 text-white px-4 py-3 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />

            <select 
              className="w-full bg-stone-900 text-white px-4 py-3 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            >
              <option value="" disabled selected>Select Timing</option>
              {timingsOptions.map((timing, index) => (
                <option key={index} value={timing}>
                  {timing}
                </option>
              ))}
            </select>

            <input 
              type="text" 
              placeholder="Course" 
              className="w-full bg-stone-900 text-white px-4 py-3 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />

            <input 
              type="text" 
              placeholder="Lecturer" 
              className="w-full bg-stone-900 text-white px-4 py-3 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            />
          </div>

          <select 
            className="w-full bg-stone-900 text-white px-4 py-3 rounded-md border border-stone-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          >
            <option value="" disabled selected>Select Year</option>
            {yearOptions.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>

          <div className="bg-stone-900 p-5 rounded-lg border border-stone-700">
            <label className="block text-yellow-400 font-semibold mb-4 text-lg">
                Select Batches:<span className="ml-2 text-sm text-gray-500">(Code+Batch)</span>
            </label>
            
            <div className="grid grid-cols-3 gap-4">
                {batchOptions.map((batch, index) => (
                <div key={index} className="flex items-center space-x-2">
                    <input
                    type="checkbox"
                    id={`batch_${batch}`}
                    name="batch"
                    value={batch}
                    className="h-4 w-4 text-yellow-500 bg-stone-900 border-stone-800 rounded focus:ring-yellow-500 cursor-pointer transition duration-200 ease-in-out"
                    />
                    <label 
                    htmlFor={`batch_${batch}`} 
                    className="text-white cursor-pointer hover:text-yellow-400 transition duration-200 ease-in-out"
                    >
                    {batch.toUpperCase()}
                    </label>
                </div>
                ))}
            </div>
            </div>
            <button 
            type="submit" 
            className="w-full bg-yellow-500 text-black py-3 rounded-md font-bold hover:bg-yellow-400 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
