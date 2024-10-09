import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const HowItLooks = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-auto mx-auto">
        <motion.div 
          className="flex items-center justify-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold text-gray-800 mr-4 tracking-wide">
            Check <span className="text-gray-800">How It Looks</span>
          </h2>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowDown className="text-3xl text-red-500" />
          </motion.div>
        </motion.div>
        
        <motion.div
          className="relative rounded-lg overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src="/home/game.png"
            className="w-full h-auto"
            alt="Gaming Interface"
          />
          <div className="absolute opacity-90"></div>
          <motion.div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-2">Immersive Gaming Experience</h3>
            <p className="text-lg">Engage with our intuitive and visually appealing interface.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItLooks;
