import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-white dark:bg-dark-900 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5 }
      }}
    >
      <div className="text-center">
        <motion.div
          variants={containerVariants}
          animate="animate"
          className="flex justify-center space-x-2 mb-8"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              className="w-4 h-4 bg-primary-500 rounded-full"
            />
          ))}
        </motion.div>
        
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <h2 className="text-2xl font-display font-semibold gradient-text mb-2">
            Welcome
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading portfolio...
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 