import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

const Experience = () => {
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
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const experiences = [
    {
      title: "Founder & Developer",
      company: "FosterAI",
      location: "Remote",
      period: "January 2025 - Present",
      description: "Developing an AI-powered search engine using different free APIs like DeepSeek, Gemini, and Stable Diffusion. Working on AI models to improve search functionality and user experience.",
      achievements: [
        "Built live AI search engine with advanced NLP capabilities",
        "Integrated multiple AI APIs for enhanced search results",
        "Implemented real-time search with seamless user experience",
        "Configured Google Search Console for SEO optimization"
      ],
      technologies: ["React", "Node.js", "AI/ML", "NLP", "Python", "Supabase", "Cloudflare"]
    },
    {
      title: "Full Stack Developer Intern",
      company: "Coderone",
      location: "New Delhi",
      period: "July 2024 - September 2024",
      description: "Developed a Feedback Collection System with user-friendly interface, customizable forms, and real-time data submission. Built a Real-Time Chat Application with instant messaging and secure authentication.",
      achievements: [
        "Developed feedback system with customizable forms",
        "Built real-time chat application with instant messaging",
        "Implemented secure user authentication and data integrity",
        "Ensured end-to-end encryption for data protection"
      ],
      technologies: ["React", "Node.js", "JavaScript", "MongoDB", "Socket.io", "Express"]
    },
    {
      title: "Front End Developer Intern",
      company: "Clumoss",
      location: "Vadodara, Gujarat",
      period: "August 2023 - September 2023",
      description: "Developed a Chess Academy website leveraging advanced skills in HTML, CSS, and JavaScript. Implemented responsive design principles to ensure optimal user experience across various devices.",
      achievements: [
        "Created responsive Chess Academy website",
        "Implemented advanced HTML, CSS, and JavaScript features",
        "Optimized user experience across multiple devices",
        "Applied modern web development best practices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "Responsive Design"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-white dark:bg-dark-900">
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
            My <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A journey through my professional career, showcasing growth, learning, 
            and the impact I've made in various roles.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-dark-900 z-10"></div>

              {/* Content Card */}
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className="bg-gray-50 dark:bg-dark-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-0">
                      {exp.title}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300">
                      {exp.period}
                    </span>
                  </div>

                  {/* Company and Location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                      <ExternalLink size={16} />
                      <span className="font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Key Achievements:
                    </h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium border border-gray-200 dark:border-dark-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-full font-semibold hover:bg-primary-600 transition-colors duration-200 shadow-lg"
          >
            <Calendar size={20} />
            Let's Work Together
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience; 