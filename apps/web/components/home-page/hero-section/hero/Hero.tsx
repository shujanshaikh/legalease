import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // Stagger animation for child elements
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1} },
  };

  return (
    <motion.div
      className="max-w-3xl px-4 md:px-0 text-center md:text-left"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 text-accent leading-tight"
        variants={itemVariants}
      >
        Legal Matters <span className="text-ivory">DECODED.</span>
      </motion.h2>
      <motion.h3
        className="text-xl md:text-3xl lg:text-4xl font-bold text-ivory"
        variants={itemVariants}
      >
        Empowering Justice <span className="text-accent">One Case at a Time</span>
      </motion.h3>
    </motion.div>
  );
}

