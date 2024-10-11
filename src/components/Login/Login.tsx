import { motion } from 'framer-motion';
import { useState } from 'react';
import TypingLogo from '../Logo/TypingLogo';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');

  const handleLogin = async ({username}: any) => {
    const res = await axios.post('/api/login', {username});

    if(res.data.error == "Invalid email"){
      toast.error("Enter a Valid College Email", { theme: "dark",position: "bottom-right", autoClose: 3000 });
    }
    else{
      toast.success("Logged in", { theme: "dark",position: "bottom-right", autoClose: 3000 });
      window.location.href = res.request.responseURL
    }
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleLogin({username});
  };

  return (
    <div className="relative z-10 container mx-auto bg-stone-950 flex flex-col items-center justify-center min-h-screen px-4">
   
      <div className="hidden md:flex absolute top-10 left-0 w-40 h-40 bg-yellow-300 opacity-30 rounded-full z-0" />
      <div className="hidden md:flex absolute top-40 right-0 w-24 h-24 bg-yellow-300 opacity-30 rounded-full z-0" />
      <div className="hidden md:flex absolute bottom-20 right-10 w-48 h-48 bg-yellow-300 opacity-30 rounded-full z-0" />
      <div className="hidden md:flex absolute bottom-5 left-5 w-16 h-16 bg-yellow-300 opacity-30 rounded-full z-0" />

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
        className="relative z-10 w-full max-w-md bg-[#16171a] p-6 rounded-xl shadow-xl"
      >
      
        <div className="mb-6">
          <label htmlFor="username" className="block text-[#A5A6A7] mb-3 font-medium">Email address</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-[#eaff00] rounded-lg bg-[#202224] text-white placeholder-[#A5A6A7] focus:ring-2 focus:ring-yellow-500 focus:outline-none shadow-md"
            placeholder="Enter your College-Email"
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
    </div>
  );
}

export default Login;
