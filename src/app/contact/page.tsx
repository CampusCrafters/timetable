import { FaGithub, FaLinkedin, FaNetworkWired } from 'react-icons/fa';
import BgImage from '../../public/bg.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-950 text-white flex flex-col items-center justify-center p-10">
      <div className="absolute inset-0 z-0 w-full h-full">
                <Image
                src={BgImage}
                alt="Background"
                fill
                style={{ objectFit: 'cover' }}
                quality={100}
                className="filter blur-sm opacity-90"
                />
            </div>
      <div className="absolute inset-0 bg-gradient-to-b from-stone-950 via-black/60 to-transparent z-10"></div>
      <h1 className="text-yellow-500 text-6xl font-semibold mb-8 text-center z-20">Contact</h1>
      <p className="text-2xl mb-6 text-center z-20">
        You can send me an email at <span className="text-yellow-500">contact.vijayvenkat@gmail.com</span>
      </p>

      <div className="flex flex-col md:flex-row md:space-x-10 space-y-4 md:space-y-0 z-20">
        {/* GitHub */}
        <a 
          href="https://github.com/vijayvenkatj" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
        >
          <FaGithub className="text-2xl" />
          <span>GitHub</span>
        </a>

        {/* LinkedIn */}
        <a 
          href="https://in.linkedin.com/in/vijayvenkatj" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
        >
          <FaLinkedin className="text-2xl" />
          <span>LinkedIn</span>
        </a>

        {/* TryHackMe */}
        <a 
          href="https://tryhackme.com/r/p/Vijayvenkatj" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
        >
          <FaNetworkWired className="text-2xl" />
          <span>TryHackMe</span>
        </a>
      </div>
    </div>
  );
}
