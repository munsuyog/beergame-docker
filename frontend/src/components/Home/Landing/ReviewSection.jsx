import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ReviewCard = ({ review, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-4">
        <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full" />
        <div>
          <h3 className="font-bold text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-600">{review.location}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-yellow-500 mr-1">{review.rating}</span>
        <FaStar className="text-yellow-500" />
      </div>
    </div>
    <p className="text-gray-700">{review.review}</p>
  </motion.div>
);

const ReviewSection = ({ reviews, currentIndex, setCurrentIndex, itemsPerView }) => {
  const handleNext = () => {
    if (currentIndex + itemsPerView < reviews.length) {
      setCurrentIndex(currentIndex + itemsPerView);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerView >= 0) {
      setCurrentIndex(currentIndex - itemsPerView);
    }
  };

  const displayReviews = reviews.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Trusted by Thousands of Happy Customers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            These are the stories of our customers who have joined us with great
            pleasure when using this crazy feature.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-12">
          <div className="flex space-x-2">
            {Array.from({ length: Math.ceil(reviews.length / itemsPerView) }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-3 rounded-full cursor-pointer ${
                  currentIndex / itemsPerView === index ? 'w-8 bg-blue-500' : 'w-3 bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index * itemsPerView)}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${
                currentIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'
              }`}
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              disabled={currentIndex + itemsPerView >= reviews.length}
              className={`p-2 rounded-full ${
                currentIndex + itemsPerView >= reviews.length
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-500 text-white'
              }`}
            >
              <FaChevronRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;