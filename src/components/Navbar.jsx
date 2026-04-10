import React from 'react';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-gray-950/90 to-gray-950/50 backdrop-blur-xl border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="p-2 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-lg group-hover:from-cyan-600/30 group-hover:to-blue-600/30 transition-colors duration-300">
              <Activity className="h-7 w-7 text-cyan-400" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:from-cyan-300 group-hover:to-blue-300 transition-all duration-300">
              Algorithmaze
            </span>
          </motion.div>
          
          <div className="hidden md:flex items-baseline space-x-8">
            <motion.a 
              whileHover={{ color: '#06b6d4' }}
              href="#" 
              className="text-gray-400 hover:text-cyan-400 text-sm font-semibold transition-colors duration-300"
            >
              Home
            </motion.a>
            <motion.a 
              whileHover={{ color: '#06b6d4' }}
              href="#features" 
              className="text-gray-400 hover:text-cyan-400 text-sm font-semibold transition-colors duration-300"
            >
              Features
            </motion.a>
            <motion.a 
              whileHover={{ color: '#06b6d4' }}
              href="#explore" 
              className="text-gray-400 hover:text-cyan-400 text-sm font-semibold transition-colors duration-300"
            >
              Explore
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
