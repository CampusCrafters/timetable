"use client"
import { motion } from 'framer-motion';
import { useState } from 'react';
import TypingLogo from '@/components/Logo/TypingLogo';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Image from 'next/image';
import BgImage from '@/public/bg.png';
import Link from 'next/link';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const formData = new FormData();
    formData.append('email', username);
    formData.append('password', password);
    const res = await axios.post('/api/admin/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if(res.data==="Invalid email or password"){
      toast.error("Invalid email or password", { theme: "dark",position: "bottom-right", autoClose: 3000 });
    }
    else{
      toast.success("Logged in", { theme: "dark",position: "bottom-right", autoClose: 3000 });
      window.location.href = res.request.responseURL
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="relative z-10 container mx-auto bg-stone-950 flex flex-col items-center justify-center min-h-screen px-4">
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
   
      <div className="hidden md:flex absolute top-10 left-0 w-40 h-40 bg-yellow-300 opacity-30 rounded-full z-20" />
      <div className="hidden md:flex absolute top-40 right-0 w-24 h-24 bg-yellow-300 opacity-30 rounded-full z-20" />
      <div className="hidden md:flex absolute bottom-20 right-10 w-48 h-48 bg-yellow-300 opacity-30 rounded-full z-20" />
      <div className="hidden md:flex absolute bottom-5 left-5 w-16 h-16 bg-yellow-300 opacity-30 rounded-full z-20" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="relative text-5xl font-bold text-center text-white mb-12 flex items-center justify-center z-10"
      >
        <span className="hidden md:flex md:mr-2 md:py-3">Login to</span>
        <TypingLogo className="text-6xl font-bold inline" />
      </motion.h1>

      <motion.form
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-stone-950 p-6 rounded-xl shadow-xl"
      >
      
        <div className="mb-6">
          <label htmlFor="username" className="block text-white mb-5 font-medium">Email address</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-yellow-400 rounded-lg bg-[#202224] text-white placeholder-[#A5A6A7] focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
            placeholder="Enter your Gmail"
            required
          />
          <label htmlFor="password" className="block text-white my-3 font-medium">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-yellow-400 rounded-lg bg-[#202224] text-white placeholder-[#A5A6A7] focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-sm"
            placeholder="Enter your Password"
            required
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="inline-flex mt-5 h-12 items-center justify-center w-full rounded-lg bg-yellow-400 text-black font-semibold transition-colors hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#181A1B]"
        >
          Log in
        </motion.button>
      </motion.form>


      <Link href="/admin/register" className="font-md font-light text-yellow-500 z-20">Not Registered yet? Register here</Link>
      
    </div>
  );
}

export default Login;