import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "JavaScript", level: 90, color: "#F7DF1E" },
        { name: "Python", level: 85, color: "#3776AB" },
        { name: "HTML/CSS", level: 95, color: "#E34F26" },
        { name: "React", level: 88, color: "#61DAFB" },
      ]
    },
    {
      title: "Cloud & Database",
      skills: [
        { name: "Google Cloud", level: 75, color: "#4285F4" },
        { name: "Azure", level: 70, color: "#0078D4" },
        { name: "Supabase", level: 80, color: "#3ECF8E" },
        { name: "MongoDB", level: 82, color: "#47A248" },
      ]
    },
    {
      title: "AI & Development Tools",
      skills: [
        { name: "Node.js", level: 85, color: "#339933" },
        { name: "AI/ML APIs", level: 78, color: "#FF6F00" },
        { name: "VS Code", level: 92, color: "#007ACC" },
        { name: "Git/GitHub", level: 88, color: "#F05032" },
      ]
    }
  ];

  const orbitingTechs = [
    { name: "React", icon: "⚛️", angle: 0 },
    { name: "Node.js", icon: "🟢", angle: 45 },
    { name: "Python", icon: "🐍", angle: 90 },
    { name: "MongoDB", icon: "🍃", angle: 135 },
    { name: "Cloud", icon: "☁️", angle: 180 },
    { name: "AI/ML", icon: "🤖", angle: 225 },
    { name: "JavaScript", icon: "💛", angle: 270 },
    { name: "Git", icon: "📝", angle: 315 },
  ];

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

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-dark-900">
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
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency 
            in various technologies, frameworks, and tools.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Skills Progress Bars */}
          <motion.div variants={itemVariants} className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={category.title}>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {category.title}
                </h3>
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -50 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 
                      }}
                      className="skill-item"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-gray-900 dark:text-white font-medium">
                          {skill.name}
                        </span>
                        <span className="text-primary-500 font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-3">
                        <motion.div
                          variants={progressVariants}
                          initial="hidden"
                          animate={inView ? "visible" : "hidden"}
                          custom={skill.level}
                          className="h-3 rounded-full relative overflow-hidden"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Orbiting Tech Icons */}
          <motion.div variants={itemVariants} className="relative flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Central Circle */}
              <motion.div
                initial={{ scale: 0, rotate: 0 }}
                animate={inView ? { scale: 1, rotate: 360 } : { scale: 0, rotate: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                  <span className="gradient-text bg-white bg-clip-text">DEV</span>
                </div>
              </motion.div>

              {/* Orbiting Icons */}
              {orbitingTechs.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  className="absolute w-16 h-16 bg-white dark:bg-dark-700 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                  animate={inView ? {
                    rotate: [0, 360],
                    x: [0, Math.cos((tech.angle * Math.PI) / 180) * 140, 0],
                    y: [0, Math.sin((tech.angle * Math.PI) / 180) * 140, 0],
                  } : {}}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5,
                  }}
                  whileHover={{ scale: 1.2, zIndex: 10 }}
                  title={tech.name}
                >
                  {tech.icon}
                </motion.div>
              ))}

              {/* Orbit Paths */}
              <div className="absolute inset-0 border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-full opacity-30"></div>
              <div className="absolute inset-8 border border-dashed border-primary-300 dark:border-primary-700 rounded-full opacity-20"></div>
            </div>
          </motion.div>
        </div>

        {/* Additional Skills */}
        <motion.div variants={itemVariants} className="mt-20">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Additional Technologies & Tools
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'DeepSeek API', 'Gemini API', 'Stable Diffusion', 'Socket.io', 'Express.js', 'Cloudflare', 
              'Resend', 'Real-time Chat', 'Responsive Design', 'REST APIs', 'Authentication', 'SEO'
            ].map((tech) => (
              <motion.span
                key={tech}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full font-medium hover:bg-primary-100 dark:hover:bg-primary-900 hover:text-primary-700 dark:hover:text-primary-300 transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Education & Achievements */}
        <motion.div variants={itemVariants} className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Education & Achievements
          </h3>
          <div className="grid md:grid-cols-1 gap-6 max-w-md mx-auto">
            {[
              { 
                title: "Bachelor of Technology", 
                issuer: "Swami Keshvanand Institute of Technology", 
                year: "2021-2025", 
                details: "Management & Gramodhya"
              },
            ].map((edu) => (
              <motion.div
                key={edu.title}
                whileHover={{ y: -5 }}
                className="p-6 bg-gray-50 dark:bg-dark-800 rounded-lg"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {edu.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                  {edu.issuer}
                </p>
                <p className="text-primary-500 text-sm font-medium mb-1">
                  {edu.year}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills; 