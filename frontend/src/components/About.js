import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cloud, Brain, Code, Database } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Experience with Google Cloud, Azure, and Supabase for building scalable, secure cloud solutions and infrastructure management."
    },
    {
      icon: Brain,
      title: "AI Integration",
      description: "Working with AI models and APIs (DeepSeek, Gemini, Stable Diffusion) for AI-based projects and intelligent search functionality."
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in modern web technologies including React, Node.js, JavaScript, Python, and responsive design principles."
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Experience with database design, authentication, real-time backends, and seamless full-stack integration."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-dark-800">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cloud computing professional with a passion for integrating AI models with modern web technologies. 
            Building scalable, secure, and efficient solutions for the future.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Cloud Computing & AI Professional
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Graduate with Bachelor of Technology in Management & Gramodhya from Swami Keshvanand Institute 
              of Technology (2021-2025). With hands-on experience in developing AI-powered applications and cloud-based solutions, 
              I specialize in creating modern, responsive web applications using cutting-edge technologies.
            </p>
            
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I believe in continuous learning and staying updated with the latest technologies. My experience 
              ranges from building real-time chat applications to developing AI-powered search engines with 
              seamless user experiences and robust backend architectures.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
              {['React', 'Node.js', 'Python', 'JavaScript', 'AI/ML', 'Cloud Platforms', 'MongoDB', 'HTML/CSS'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 bg-white dark:bg-dark-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { number: '1+', label: 'Live AI Project' },
            { number: '4', label: 'Years of Study' },
            { number: '3+', label: 'Tech Stacks' },
            { number: '5+', label: 'Technologies' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-3xl sm:text-4xl font-bold gradient-text mb-2"
              >
                {stat.number}
              </motion.div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About; 