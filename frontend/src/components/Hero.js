import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Text3D, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Play } from 'lucide-react';

// Animated 3D Sphere with distortion and rotation
function AnimatedSphere() {
  const meshRef = useRef();
  const [time, setTime] = useState(0);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
      setTime(time + delta);
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#000000"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.4}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Floating particles system
function FloatingParticles() {
  const particlesRef = useRef();
  const particlesCount = 50;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particlesCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        ],
        scale: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return temp;
  }, []);

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.y += particles[i].speed;
        if (particle.position.y > 10) {
          particle.position.y = -10;
        }
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

// Morphing geometric shapes
function MorphingShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-4, 2, -2]} scale={0.5}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial color="#333333" wireframe />
        </mesh>
      </Float>
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[4, -1, -3]} scale={0.7}>
          <tetrahedronGeometry args={[1]} />
          <meshStandardMaterial color="#666666" wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[0, 3, -4]} scale={0.4}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial color="#999999" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Vishalag220', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/vishalagarwal220', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:vishalagarwal220@outlook.com', label: 'Email' }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-black dark:via-gray-900 dark:to-gray-800 pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Morphing blobs - White glassy effect in light mode */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white/60 dark:bg-white opacity-60 dark:opacity-5 rounded-full animate-morphing backdrop-blur-sm border border-gray-100/50 dark:border-white/10 shadow-lg"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-50/70 dark:bg-gray-200 opacity-80 dark:opacity-10 rounded-full animate-morphing backdrop-blur-sm border border-gray-200/30 dark:border-gray-200/10 shadow-xl" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating geometric elements - Lighter in light mode */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 dark:bg-white opacity-30 dark:opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <Environment preset="city" />
          
          <AnimatedSphere />
          <FloatingParticles />
          <MorphingShapes />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-10 container-custom text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          {/* Greeting - Add text shadow for better contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-black/20 dark:border-white/20 rounded-full text-sm font-medium text-black dark:text-gray-300 shadow-lg">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name with typewriter effect - Add text shadow */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
            style={{ textShadow: '2px 2px 4px rgba(255,255,255,0.5)' }}
          >
            <span className="block">
              <motion.span
                className="gradient-text"
                initial={{ backgroundPosition: "0% 50%" }}
                animate={{ backgroundPosition: "100% 50%" }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              >
                Vishal Agarwal
              </motion.span>
            </span>
          </motion.h1>

          {/* Animated titles - Add text shadow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black dark:text-gray-200 mb-4" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.5)' }}>
              <motion.span
                key="title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block"
              >
                Cloud Computing & AI Professional
              </motion.span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-lg text-black dark:text-gray-400">
              {['Full-Stack Developer', 'AI Integration', 'Cloud Platforms', 'Modern Web Apps'].map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  className="px-3 py-1 bg-white/60 dark:bg-white/5 rounded-full border border-black/20 dark:border-white/10 shadow-md"
                  style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Description - Add text shadow */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-xl text-black dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}
          >
            Cloud computing professional with Bachelor of Technology degree and solid foundation in web development. 
            Passionate about integrating AI models with cloud technologies. Skilled in modern programming 
            languages and building scalable, secure, and efficient solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex justify-center mb-16"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold text-lg overflow-hidden transition-all duration-300"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black dark:from-gray-200 dark:to-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative flex items-center gap-2">
                <Play size={20} />
                View My Work
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links - Better background for light mode */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex justify-center gap-6 mb-16"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white/60 dark:bg-white/5 backdrop-blur-sm border border-black/20 dark:border-white/10 rounded-full flex items-center justify-center text-black dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-lg"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator - Add text shadow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center text-black dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
            style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.6)' }}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-sm mb-2 font-medium">Scroll Down</span>
            <ChevronDown size={24} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero; 