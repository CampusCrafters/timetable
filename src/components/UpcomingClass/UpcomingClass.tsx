import { FaChalkboardTeacher, FaClock, FaBook } from "react-icons/fa"; 

type ClassDetails = {
  course: string;
  faculty: string;
  time: string;
};

interface UpcomingClassesProps {
  currentClass: ClassDetails;
  nextClasses: ClassDetails[];
}

const UpcomingClasses = ({ currentClass, nextClasses }: UpcomingClassesProps) => {
  return (
    <div className="bg-neutral-900 p-6 rounded-xl shadow-lg max-w-md">
      {/* Current Class */}
      <h2 className="text-3xl font-bold text-white">Current Class</h2>
      <div className="bg-yellow-500 p-5 rounded-lg my-4 shadow-md">
        <div className="flex items-center text-neutral-900 mb-1">
          <FaBook className="mr-2" />
          <p className="text-sm">Course: <span className="font-medium">{currentClass.course}</span></p>
        </div>
        <div className="flex items-center text-neutral-900 mb-1">
          <FaChalkboardTeacher className="mr-2" />
          <p className="text-sm">Faculty: <span className="font-medium">{currentClass.faculty}</span></p>
        </div>
        <div className="flex items-center text-neutral-900">
          <FaClock className="mr-2" />
          <p className="text-sm">Time: <span className="font-medium">{currentClass.time}</span></p>
        </div>
      </div>

      {/* Next Classes */}
      <h3 className="text-xl font-bold text-white mb-4">Upcoming Classes</h3>
      <ul className="space-y-3 min-h-[300px]">
        {nextClasses.map((nextClass, index) => (
          <li key={index} className="bg-neutral-800 p-4 rounded-lg flex justify-between items-center hover:bg-neutral-700 transition">
            <div>
              <span className="font-semibold text-white">{nextClass.course}</span>
              <p className="text-sm text-gray-400">{nextClass.time}</p>
            </div>
            <FaBook className="text-yellow-500" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingClasses;
