import React from 'react';
import { FaStar, FaUsers, FaTrophy, FaChartBar } from 'react-icons/fa';

const FeatureCard = ({ icon: Icon, iconColor, title, description }) => (
  <div className="flex flex-col items-center text-center p-6 border border-gray-300 rounded-lg bg-white">
    <div className={`flex items-center justify-center w-16 h-16 mb-4 bg-white rounded-full border border-gray-300`}>
      <Icon className={`text-3xl ${iconColor}`} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-700 text-sm mb-4">{description}</p>
    {/* <button className="bg-black text-white text-sm px-6 py-2 rounded-full">Learn more</button> */}
  </div>
);

const WhyChooseUs = () => {
  const features = [
    {
      icon: FaStar,
      iconColor: 'text-yellow-400', // Yellow star for "Immersive gameplay"
      title: "Immersive gameplay",
      description: "Our modern gameplay is what students prefer with Zensimu! Professors get captivated and engaged students in the classroom!"
    },
    {
      icon: FaUsers,
      iconColor: 'text-purple-500', // Purple for multi-organisers
      title: "Multi-organisers & Multi-sessions",
      description: "Essential for handling larger sessions, facilitating group training, and allowing deeper debriefing discussions."
    },
    {
      icon: FaTrophy,
      iconColor: 'text-green-500', // Green for contest-ready
      title: "Contest-Ready",
      description: "Easily create and analyze contests between campuses, classes, and groups during seminars or courses!"
    },
    {
      icon: FaChartBar,
      iconColor: 'text-blue-500', // Blue for automated debrief reports
      title: "Automated debrief reports",
      description: "Stimulate discussion and reinforce key learning objectives with our Analytics tool (graphs, charts, PDF, Excel)."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900">What we offer?</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
