import Link from 'next/link';
import { FaGithub, FaEnvelope, FaUserGraduate } from 'react-icons/fa';

export default function About() {
    return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center p-10">
            <div className="bg-neutral-950 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
                <h1 className="text-yellow-500 text-4xl font-bold mb-12 text-center">About This Project</h1>
                <h2 className="text-yellow-500 text-2xl font-semibold mb-2">About CampusCrafters</h2>
                <p className="text-gray-300 mb-6 text-lg">
                     CampusCrafters, an organization focused on building projects that help us students. You can check out our work on 
                    <a href="https://github.com/CampusCrafters" className="text-yellow-500 underline mx-1" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="inline text-yellow-500" /> GitHub
                    </a>.
                </p>
                <Link href='/contact'>
                    <div className="flex items-center justify-center bg-yellow-500 text-black rounded-lg px-4 py-2 transition-transform transform hover:scale-105 mb-4">
                        <FaEnvelope className="mr-2" /> Contact
                    </div>
                </Link>

                <div className="flex items-center justify-center space-x-4 mt-6">
                    <FaUserGraduate className="text-yellow-500 text-3xl" />
                    <p className="text-gray-300 text-lg">B.Tech Student</p>
                </div>
            </div>
        </div>
    );
}
