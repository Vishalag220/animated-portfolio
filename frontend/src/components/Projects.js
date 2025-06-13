import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, ExternalLink, Play, Zap, Star, Code, Eye } from 'lucide-react';
import { trackProjectClick } from '../utils/analytics';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  const project = {
    id: 1,
    title: 'FosterAI - AI Search Engine',
    description: 'A cutting-edge AI-powered search engine that delivers intelligent, contextual results. Built with advanced machine learning algorithms and modern web technologies for lightning-fast, accurate search experiences.',
    image: '/fosterai.png',
    category: 'AI/ML',
    technologies: ['React', 'Node.js', 'AI/ML', 'NLP', 'Python', 'TensorFlow'],
    github: 'https://github.com/vishalagarwal/fosterai',
    demo: 'https://fosterai.live',
    featured: true,
    status: 'Live',
    year: '2024'
  };

  const handleProjectClick = (type) => {
    trackProjectClick(project.title, type);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-black/5 dark:bg-white/5 rounded-full mb-6">
              <Code size={20} className="text-black dark:text-white" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured Work
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">My Project</span>
            </h2>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Showcasing my latest AI innovation - a cutting-edge search engine 
              built with modern technologies and machine learning algorithms.
            </p>
          </div>

          {/* Project Card */}
          <div className="flex justify-center mb-20">
            <div className="max-w-2xl w-full">
              <div className="group relative">
                <div className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:shadow-2xl">
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 animate-pulse">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></span>
                      {project.status}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-1 px-3 py-1 bg-black dark:bg-white text-white dark:text-black rounded-full text-xs font-medium">
                      <Star size={12} fill="currentColor" />
                      Featured
                    </div>
                  </div>

                  {/* Image Container */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex gap-3">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProjectClick('demo')}
                          className="flex items-center gap-2 px-4 py-2 bg-white/90 dark:bg-black/90 text-black dark:text-white rounded-lg font-medium text-sm hover:bg-white dark:hover:bg-black transition-all duration-200"
                        >
                          <ExternalLink size={16} />
                          Demo
                        </a>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => handleProjectClick('github')}
                          className="flex items-center gap-2 px-4 py-2 bg-black/90 dark:bg-white/90 text-white dark:text-black rounded-lg font-medium text-sm hover:bg-black dark:hover:bg-white transition-all duration-200"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {project.year}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleProjectClick('demo')}
                        className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 flex-1 justify-center"
                      >
                        <Play size={16} />
                        Live Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleProjectClick('github')}
                        className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200 flex-1 justify-center"
                      >
                        <Github size={16} />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'AI Technology', value: 'Live', icon: Zap },
              { label: 'Modern Stack', value: 'React', icon: Code },
              { label: 'Open Source', value: 'GitHub', icon: Star },
              { label: 'Status', value: 'Active', icon: Eye },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg group"
              >
                <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all duration-300">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-black dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 