import React from 'react';
import { motion } from 'framer-motion';

const CallToAction = ({ handlePlayDemo }) => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          Create your first game in minutes!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-10"
        >
          Join thousands of instructors who are revolutionizing their teaching methods.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlayDemo}
          className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-blue-100 transition duration-300"
        >
          Play Demo
        </motion.button>
      </div>
    </section>
  );
};

export default CallToAction;