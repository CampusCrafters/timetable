import Link from 'next/link';
import { FaGithub, FaEnvelope, FaUserGraduate } from 'react-icons/fa';
import Image from 'next/image';
import BgImage from '../../public/bg.png';

export default function About() {
    return (
        <div className="min-h-screen bg-stone-950 flex flex-col items-center justify-center m-auto p-10 relative">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={BgImage}
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover' }}
                    quality={100}
                    className="filter blur-sm opacity-90"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/60 to-transparent"></div>
            
            <div className="relative mt-5 bg-neutral-950 rounded-2xl shadow-lg p-8 max-w-3xl mx-auto z-20">
                <h1 className="text-yellow-500 text-4xl font-bold mb-4 text-center">About This Project</h1>
                <p className="text-gray-300 mb-6 text-lg">
                    Hi! I'm Vijay, a B.Tech 2nd-year student, and I created this timetable website to help students easily keep track of their classes. I have a strong passion for web development and enjoy working on projects that make everyday tasks easier.
                </p>

                <h2 className="text-yellow-500 text-2xl font-semibold mb-2">About CampusCrafters</h2>
                <p className="text-gray-300 mb-6 text-lg">
                    I'm a member of CampusCrafters, an organization focused on building projects that help us students. You can check out our work on 
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
