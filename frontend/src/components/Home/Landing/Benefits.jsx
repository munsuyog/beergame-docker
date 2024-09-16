import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaBeer, FaChartLine } from 'react-icons/fa';

const BenefitItem = ({ icon, text }) => (
  <motion.div 
    className="flex items-center gap-3 mt-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    {icon}
    <p className="text-gray-700">{text}</p>
  </motion.div>
);

const Benefits1 = () => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/home/benefits/benifit.png" alt="Benefits" className="rounded-lg shadow-lg" />
      </motion.div>
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Explore our array of features, designed for both practicality and enjoyment.
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Dive into a world where functionality meets fun!
        </p>
        <BenefitItem 
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          text="Comprehensive post-game reports and analytics to enhance learning."
        />
        <BenefitItem 
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          text="Dedicated support to ensure a smooth gaming experience."
        />
        <BenefitItem 
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          text="Seamless integration with your existing systems."
        />
        <BenefitItem 
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          text="Mobile-friendly platform for on-the-go management."
        />
      </motion.div>
    </div>
  </section>
);

const Benefits2 = () => (
  <section className="py-20 px-4 bg-white">
    <div className="max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          This isn't a drinking game, so why is it called the <span className="text-orange-500">Beer Game</span>?
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          The name originates from a <span className="text-blue-500">classic role-playing game</span> created at MIT in the 1960s.
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Professors discovered they could engage university students more effectively by naming it <span className="text-orange-500">The Beer Distribution Game</span>.
        </p>
        <p className="text-xl text-gray-600">
          Our beer games can be <span className="text-blue-500">white-labeled</span>, allowing you to tailor The Beergame App to your specific product, industry, and audience.
        </p>
      </motion.div>
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/home/benefits/tracks.png" alt="Beer Game Tracks" className="rounded-lg shadow-lg" />
      </motion.div>
    </div>
  </section>
);

const Benefits3 = () => (
  <section className="py-20 px-4 bg-gray-50">
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/home/benefits/game.png" alt="Beer Game" className="rounded-lg shadow-lg" />
      </motion.div>
      <motion.div 
        className="lg:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          The Objective of the Beer <span className="text-blue-500">Game</span>
        </h2>
        <p className="text-xl text-gray-600 mb-4">
          The <span className="text-blue-500">aim</span> of the game is to fulfill requests at each stage of the supply chain in order to meet the overall demand of end customers.
        </p>
        <p className="text-xl text-gray-600 mb-4">
          Players are assigned to a role in their specific industry. For example, in a beer supply chain simulation, participants play as either Manufacturer, Distributor, Wholesaler, or Retailer.
        </p>
        <p className="text-xl text-gray-600">
          Each role responds to order requests from the stage below and places orders for the stage above.
        </p>
      </motion.div>
    </div>
  </section>
);

export { Benefits1, Benefits2, Benefits3 };