"use client"
import React, { useState,useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Logo from '../Logo/Logo'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'



function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      let token
      const cookies = document.cookie.split('; ');
      const tokenCookie = cookies.find((row) => row.startsWith('token='));
      if (tokenCookie) {
        token = tokenCookie.split('=')[1];
      }
      if (token) {
        setSession(true)
      } else {
        setSession(false);
      }
    };
    fetchSession();
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }
  const handleLogout = async () =>{
    const res = await axios.post('/api/logout')
    if(res){
      toast.success("Logged out", { theme: "dark" ,position: "bottom-right" , autoClose: 2000 });
      window.location.href = res.request.responseURL
    }
  }

  return (
    <nav className='bg-neutral-950 p-4 border-b-[1px] border-gray-900'>
      <div className='container mx-auto flex justify-between items-center'>
        <motion.div whileHover={{ scaleX: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href='/'>
            <Logo className='text-3xl'/>
          </Link>
        </motion.div>

        <div className='hidden md:flex items-center text-lg gap-12'>
          <a href='/about' className='text-white hover:text-gray-600'>About</a>
          <a href='/dashboard' className='text-white hover:text-gray-500'>Dashboard</a>
          <a href='/contact' className='text-white hover:text-gray-500'>Contact</a>
        </div>

        <div className='hidden md:flex items-center space-x-4'>
          {session ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                handleLogout()
              }}
              className="text-black font-semibold mx-6 px-6 py-2 h-10 rounded-md bg-red-600 hover:bg-red-700"
            >
              Log out
            </motion.button>
          ):(
            <Link href='/login'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="text-black font-semibold mx-6 px-6 py-2 h-10 rounded-md bg-yellow-400 hover:bg-yellow-500"
            >
              Log in
            </motion.button>
            </Link>
          )}
        </div>

        <div className='md:hidden flex items-center space-x-4'>
  
          <button onClick={toggleMenu} className='text-white focus:outline-none'>
            {isOpen ? <XIcon className='h-6 w-6' /> : <MenuIcon className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 200 }} 
          animate={{ opacity: 1, x: 0 }}  
          transition={{ ease:'easeInOut' ,duration: 0.2 }}
          exit={{ opacity: 0, x: 200 }}  
          className='fixed top-0 right-0 h-full w-full bg-black shadow-lg p-6 flex flex-col items-center rounded-lg space-y-6 z-50'
        >
          {/* Close Button */}
          <button onClick={toggleMenu} className='absolute top-4 right-4 text-white focus:outline-none'>
            <XIcon className='h-8 w-8 ' />
          </button>
          <Logo className='text-2xl'/>
          {/* Mobile Menu Links */}
          <a href='/about' className='text-gray-600 text-lg font-semibold hover:text-white'>About</a>
          <a href='/dashboard' className='text-gray-600 text-lg font-semibold hover:text-white'>Dashboard</a>
          <a href='/contact' className='text-gray-600 text-lg font-semibold hover:text-white'>Contact</a>
          {session?<button onClick={handleLogout} className='text-red-700 text-lg font-semibold hover:text-white'>Logout</button>:<a href='/login' className='text-yellow-500 text-lg font-semibold hover:text-white'>Login</a>}


        </motion.div>
      )}
    </nav>
  )
}

export default Navbar;
