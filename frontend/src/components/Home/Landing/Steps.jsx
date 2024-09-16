import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCog, FaUsers, FaChartLine } from 'react-icons/fa';

const StepItem = ({ icon: Icon, text }) => (
  <motion.div 
    className="flex items-center gap-3 mb-6"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="text-blue-500 text-2xl flex-shrink-0" />
    <p className="text-gray-700">{text}</p>
  </motion.div>
);

const StepSection = ({ number, title, description, items, imageSrc, isReversed }) => {
  const contentOrder = isReversed ? 'lg:order-last' : '';
  const imageOrder = isReversed ? 'lg:order-first' : '';

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex justify-between items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`text-5xl font-bold ${number === 2 ? 'text-orange-500' : 'text-blue-500'}`}>
            STEP {number}
          </h2>
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaArrowRight className={`text-4xl ${number === 2 ? 'text-orange-500' : 'text-blue-500'}`} />
          </motion.div>
        </motion.div>

        <div className={`flex flex-col lg:flex-row items-center gap-12 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
          <motion.div 
            className={`lg:w-1/2 ${contentOrder}`}
            initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-800 mb-6">{title}</h3>
            <p className="text-xl text-gray-600 mb-8">{description}</p>
            {items.map((item, index) => (
              <StepItem key={index} icon={item.icon} text={item.text} />
            ))}
          </motion.div>
          <motion.div 
            className={`lg:w-1/2 ${imageOrder}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img src={imageSrc} alt={title} className="rounded-lg shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Step1 = () => (
  <StepSection
    number={1}
    title="Setting Up Game"
    description="Instructors have an extensive set of features and options for creating a custom Beer Game."
    items={[
      { icon: FaCog, text: "Customize the layout and scenario to fit your industry and lesson goals" },
      { icon: FaCog, text: "Create copies and manage templates of your game for future events." },
      { icon: FaCog, text: "Integrate our games seamlessly with your existing systems." }
    ]}
    imageSrc="/path/to/step1-image.jpg"
  />
);

const Step2 = () => (
  <StepSection
    number={2}
    title="Hosting and Gameplay"
    description="Once your game is set up, you can send player invites and launch your game in a matter of seconds!"
    items={[
      { icon: FaUsers, text: "Invite as many as several hundred players with a simple click of the \"Share Away!\" button." },
      { icon: FaUsers, text: "All onboarding and instructions automatically await players entering the game." },
      { icon: FaUsers, text: "Announce surprise events, like a seasonal promotion, encouraging players to cooperate and adapt to common supply chain challenges." }
    ]}
    imageSrc="/path/to/step2-image.jpg"
    isReversed
  />
);

const Step3 = () => (
  <StepSection
    number={3}
    title="Analysis and Insights"
    description="Gain valuable insights from comprehensive game data and analytics."
    items={[
      { icon: FaChartLine, text: "Access detailed reports and visualizations of game performance." },
      { icon: FaChartLine, text: "Identify bottlenecks and areas for improvement in the supply chain." },
      { icon: FaChartLine, text: "Compare results across multiple game sessions to track learning progress." }
    ]}
    imageSrc="/path/to/step3-image.jpg"
  />
);

export { Step1, Step2, Step3 };