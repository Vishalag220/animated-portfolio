import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/Vishalag220", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/vishalagarwal220", label: "LinkedIn" },
    { icon: Mail, href: "mailto:vishalagarwal220@outlook.com", label: "Email" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-dark-900 text-white">
      <div className="container-custom py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <motion.h3 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-display font-bold gradient-text mb-4"
            >
              Vishal Agarwal
            </motion.h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Cloud computing professional with a passion for integrating AI models with modern web technologies. 
              Building scalable, secure, and efficient solutions for the future.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>and dedication to innovation</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              {[
                { name: 'About', href: '#about' },
                { name: 'Experience', href: '#experience' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <motion.button
                  key={link.name}
                  whileHover={{ x: 5 }}
                  onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-gray-300 hover:text-primary-400 transition-colors duration-200"
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-300">
              <a 
                href="mailto:vishalagarwal220@outlook.com"
                className="block hover:text-primary-400 transition-colors duration-200"
              >
                vishalagarwal220@outlook.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 dark:bg-dark-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 dark:border-dark-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>

            {/* Tech Stack */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Built with</span>
              <div className="flex gap-2">
                {['React', 'Three.js', 'Tailwind'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-800 dark:bg-dark-800 rounded text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors duration-200"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-sm">Back to top</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </footer>
  );
};

export default Footer; 