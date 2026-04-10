import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const DecisionTree = ({ algorithm }) => {
  if (!algorithm) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto py-8 px-4 flex flex-col items-center"
    >
      <h3 className="text-xl font-bold text-gray-400 mb-8 uppercase tracking-widest">Decision Path</h3>
      
      <div className="flex flex-col items-center w-full">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-8 text-white font-medium min-w-[200px] text-center shadow-lg"
        >
          {algorithm.type}
        </motion.div>
        
        <ChevronDown className="h-8 w-8 text-cyan-500 my-2 animate-bounce" />
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800 border border-gray-600 rounded-xl py-3 px-8 text-white font-medium min-w-[200px] text-center shadow-lg"
        >
          {algorithm.condition}
        </motion.div>
        
        <ChevronDown className="h-8 w-8 text-cyan-500 my-2 animate-bounce" />
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400 rounded-xl py-4 px-10 text-white font-bold text-xl text-center shadow-[0_0_20px_rgba(6,182,212,0.6)]"
        >
          {algorithm.name}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DecisionTree;
