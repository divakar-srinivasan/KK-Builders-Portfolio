import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Particle = ({ angle, distance, color }) => {
  const rotation = angle + Math.random() * 30 - 15;
  const duration = 0.5 + Math.random() * 0.5;
  const delay = Math.random() * 0.3;

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{
        x: Math.cos(rotation) * distance,
        y: Math.sin(rotation) * distance,
        opacity: 0,
        scale: 0.2
      }}
      transition={{
        duration,
        delay,
        ease: "easeOut"
      }}
      className={`absolute w-2 h-2 rounded-full ${color}`}
    />
  );
};

const Intro = ({ onComplete }) => {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    const phase1Timer = setTimeout(() => setAnimationPhase(1), 1200);
    const phase2Timer = setTimeout(() => {
      // Generate particles for explosion
      const newParticles = [];
      const particleCount = isMobile ? 20 : 30;
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          angle: (i / particleCount) * Math.PI * 2,
          distance: (isMobile ? 30 : 50) + Math.random() * (isMobile ? 70 : 100),
          color: i % 2 === 0 ? 'bg-red-500' : 'bg-yellow-400'
        });
      }
      setParticles(newParticles);
      setAnimationPhase(2);
    }, 1800);
    
    const phase3Timer = setTimeout(() => setAnimationPhase(3), 2500);
    const completionTimer = setTimeout(() => onComplete?.(), isMobile ? 4000 : 4500);

    return () => {
      clearTimeout(phase1Timer);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(completionTimer);
      window.removeEventListener('resize', checkIfMobile);
    };
  }, [onComplete, isMobile]);

  // Font size and spacing based on screen size
  const kFontSize = isMobile ? 'text-[120px]' : 'text-[220px]';
  const kSpacing = isMobile ? ['-30vw', '-3%'] : ['-50vw', '-5%'];
  const logoSize = isMobile ? 'w-[200px]' : 'w-[300px]';

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden relative">
      <AnimatePresence>
        {/* Background pulse effect */}
        <motion.div
          key="bg-pulse"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0, 0.05, 0],
            scale: [1, 1.2, 1.5]
          }}
          transition={{ 
            duration: 4,
            times: [0, 0.5, 1]
          }}
          className="absolute inset-0 bg-red-900 rounded-full"
        />

        {/* Initial K letters animation */}
        {animationPhase < 2 && (
          <>
            {/* Left K */}
            <motion.div
              key="left-k"
              initial={{ x: isMobile ? '-30vw' : '-50vw', opacity: 0 }}
              animate={{ 
                x: animationPhase >= 1 ? [isMobile ? '-15%' : '-5%', '0%', isMobile ? '-5%' : '-2%'] : (isMobile ? '-15%' : '-5%'),
                opacity: 1,
                scale: animationPhase >= 1 ? [1, 1.3, 1] : 1,
                textShadow: animationPhase >= 1 ? [
                  '0 0 10px rgba(239,68,68,0)',
                  '0 0 20px rgba(239,68,68,0.8)',
                  '0 0 10px rgba(239,68,68,0)'
                ] : '0 0 0 rgba(239,68,68,0)'
              }}
              transition={{ 
                x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.6, delay: 1.2 },
                textShadow: { duration: 0.8, delay: 1.2 }
              }}
              className={`text-red-600 ${kFontSize} font-extrabold absolute drop-shadow-2xl z-20`}
            >
              K
            </motion.div>

            {/* Right K */}
            <motion.div
              key="right-k"
              initial={{ x: isMobile ? '30vw' : '50vw', opacity: 0 }}
              animate={{ 
                x: animationPhase >= 1 ? [isMobile ? '15%' : '5%', '0%', isMobile ? '5%' : '2%'] : (isMobile ? '15%' : '5%'),
                opacity: 1,
                scale: animationPhase >= 1 ? [1, 1.3, 1] : 1,
                textShadow: animationPhase >= 1 ? [
                  '0 0 10px rgba(239,68,68,0)',
                  '0 0 20px rgba(239,68,68,0.8)',
                  '0 0 10px rgba(239,68,68,0)'
                ] : '0 0 0 rgba(239,68,68,0)'
              }}
              transition={{ 
                x: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
                scale: { duration: 0.6, delay: 1.2 },
                textShadow: { duration: 0.8, delay: 1.2 }
              }}
              className={`text-red-600 ${kFontSize} font-extrabold absolute drop-shadow-2xl z-20`}
            >
              K
            </motion.div>
          </>
        )}

        {/* Collision effects */}
        {animationPhase >= 1 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Flash effect */}
            <motion.div
              key="collision-flash"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isMobile ? 30 : 50, opacity: [0, 0.9, 0] }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 1.2 }}
              className="absolute w-4 h-4 bg-white rounded-full blur-2xl"
            />
            
            {/* Shockwave rings */}
            <motion.div
              key="shockwave-1"
              initial={{ scale: 0, opacity: 0.6, width: 10, height: 10 }}
              animate={{ scale: isMobile ? 15 : 25, opacity: 0 }}
              transition={{ delay: 1.3, duration: 1.2, ease: 'easeOut' }}
              className="absolute border-2 border-red-500 rounded-full"
            />
            <motion.div
              key="shockwave-2"
              initial={{ scale: 0, opacity: 0.4, width: 10, height: 10 }}
              animate={{ scale: isMobile ? 25 : 35, opacity: 0 }}
              transition={{ delay: 1.5, duration: 1.5, ease: 'easeOut' }}
              className="absolute border border-red-400 rounded-full"
            />

            {/* Particle explosion */}
            {animationPhase >= 2 && particles.map(particle => (
              <Particle
                key={particle.id}
                angle={particle.angle}
                distance={particle.distance}
                color={particle.color}
              />
            ))}
          </div>
        )}

        {/* Logo reveal */}
        {animationPhase >= 3 && (
          <motion.div
            key="logo-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-30"
          >
            <motion.div
              key="logo"
              initial={{ scale: 0.7, opacity: 0, y: 20 }}
              animate={{ 
                scale: [0.7, 1.1, 1],
                opacity: 1,
                y: 0
              }}
              transition={{ 
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                scale: { duration: 1.2 }
              }}
            >
              <img
                src={logo}
                alt="K Constructions Logo"
                className={`${logoSize} h-auto z-10 relative`}
              />
            </motion.div>

            {/* Glow effect */}
            <motion.div
              key="logo-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0, 0.2, 0.1],
                scale: [0.8, 1.3, 1.1]
              }}
              transition={{ 
                duration: 2,
                delay: 0.5,
                ease: "easeOut"
              }}
              className="absolute inset-0 flex items-center justify-center -z-10"
            >
              <span className={`text-red-700 ${isMobile ? 'text-[200px]' : 'text-[300px]'} font-extrabold blur-xl`}>KK</span>
            </motion.div>

            {/* Floating particles around logo */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={`floating-particle-${i}`}
                initial={{ 
                  x: Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
                  y: Math.random() * (isMobile ? 50 : 100) - (isMobile ? 25 : 50),
                  opacity: 0,
                  scale: 0
                }}
                animate={{ 
                  x: Math.random() * (isMobile ? 100 : 200) - (isMobile ? 50 : 100),
                  y: Math.random() * (isMobile ? 100 : 200) - (isMobile ? 50 : 100),
                  opacity: [0, 0.8, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 2 === 0 ? 'bg-red-500' : 'bg-yellow-400'
                } blur-sm`}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;