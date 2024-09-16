import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Hero = ({ handlePlayDemo }) => {
  const navigate = useNavigate();
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="hero flex flex-col-reverse lg:flex-row justify-center items-center gap-5 mt-20 px-5 lg:px-14 py-14"
    >
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Easily host <span className="text-red-500">remote or live</span> Beer Game sessions
        </h1>
        <p className="my-6 text-lg text-gray-600">
          Engage participants through immersive <strong>supply chain simulations</strong> to boost individual skills
          development, teamwork and promote continuous <strong>improvement</strong>.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-300"
            onClick={handlePlayDemo}
          >
            Play Demo
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="border border-gray-800 text-gray-800 font-semibold hover:bg-gray-800 hover:text-white py-3 px-8 rounded-lg transition duration-300"
            onClick={() => navigate("/signin")}
          >
            Sign Up As Instructor
          </motion.button>
        </div>
        <p className="mt-6 text-gray-600">
          Larger team or looking for support?{' '}
          <span className="text-blue-500 hover:underline cursor-pointer">Book a meeting with us →</span>
        </p>
      </div>
      <motion.div 
        className="w-full lg:w-1/2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src="/home/hero/hero.png" className="w-full h-auto" alt="Hero illustration" />
      </motion.div>
    </motion.section>
  );
};

export default Hero;