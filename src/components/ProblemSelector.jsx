import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { problemTypes, deduceAlgorithm } from '../utils/algorithmData';

const ProblemSelector = ({ onAlgorithmDetermined }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [answers, setAnswers] = useState({});

  const handleTypeSelect = (e) => {
    const typeId = e.target.value;
    const typeObj = problemTypes.find(pt => pt.id === typeId);
    setSelectedType(typeObj);
    setAnswers({});
    onAlgorithmDetermined(null); // Reset
  };

  const handleAnswerSelect = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // Check if we have all answers
    if (selectedType) {
      const isComplete = selectedType.questions.every(q => newAnswers[q.id]);
      if (isComplete) {
        const algo = deduceAlgorithm(selectedType.id, newAnswers);
        onAlgorithmDetermined(algo);
      } else {
        onAlgorithmDetermined(null);
      }
    }
  };

  return (
    <div id="explore" className="w-full max-w-5xl mx-auto py-10 px-4 relative z-10">
      <motion.div 
        className="bg-gradient-to-br from-slate-950/85 to-slate-900/75 backdrop-blur-xl border border-slate-700/50 p-10 md:p-12 rounded-3xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-black mb-2 text-white text-center">Define Your Problem</h2>
        <p className="text-center text-gray-400 mb-10">Answer a few questions to get the perfect algorithm recommendation</p>
        
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Problem Category</label>
            <select 
              className="w-full bg-slate-950/90 border border-slate-700/60 text-white rounded-xl py-4 px-5 focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/60 outline-none transition-all appearance-none cursor-pointer font-medium hover:border-slate-600/70"
              onChange={handleTypeSelect}
              value={selectedType?.id || ""}
            >
              <option value="" disabled>Select problem type...</option>
              {problemTypes.map(pt => (
                <option key={pt.id} value={pt.id}>{pt.label}</option>
              ))}
            </select>
          </div>

          <AnimatePresence>
            {selectedType && selectedType.questions.map((q, idx) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="overflow-hidden"
              >
                <label className="block text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">{q.label}</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {q.options.map(opt => (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(q.id, opt)}
                      className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                        answers[q.id] === opt 
                          ? 'bg-gradient-to-r from-cyan-600/30 to-cyan-600/10 border-cyan-500/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                          : 'bg-gray-900/30 border-gray-700/40 hover:border-gray-600/60 text-gray-300 hover:text-white hover:bg-gray-900/50'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ProblemSelector;
