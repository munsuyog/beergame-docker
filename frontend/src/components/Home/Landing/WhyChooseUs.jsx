import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaChartLine, FaUsers } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
    className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl"
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-100 rounded-full mb-4"
    >
      <Icon className="text-blue-500 text-3xl" />
    </motion.div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600 text-center">{description}</p>
  </motion.div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaRocket,
      title: "Effortless Setup",
      description: "Our intuitive platform enables instructors to set up their games in a flash. Enjoy a hassle-free start with minimal effort."
    },
    {
      icon: FaChartLine,
      title: "Advanced Analytics",
      description: "Gain valuable insights with our comprehensive analytics. Track progress and measure the impact of your training sessions."
    },
    {
      icon: FaUsers,
      title: "Collaborative Learning",
      description: "Foster teamwork and enhance communication skills through our interactive, multiplayer simulations."
    }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
        <p className="text-xl text-gray-600 mb-12">We are the preferred choice for many reasons.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;