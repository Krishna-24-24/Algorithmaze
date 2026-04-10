import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProblemSelector from './components/ProblemSelector';
import AlgorithmCard from './components/AlgorithmCard';
import DecisionTree from './components/DecisionTree';
import ComplexityChart from './components/ComplexityChart';
import Visualizer from './components/Visualizer';
import CodeBlock from './components/CodeBlock';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Overview', 'Decision Flow', 'Complexity', 'Visualizer', 'Code'];

function App() {
  const [determinedAlgorithm, setDeterminedAlgorithm] = useState(null);
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30">
      <Navbar />
      <main>
        <HeroSection />
        
        <ProblemSelector onAlgorithmDetermined={(alg) => {
          setDeterminedAlgorithm(alg);
          setActiveTab('Overview');
        }} />
        
        <AnimatePresence mode="wait">
          {determinedAlgorithm && (
            <motion.div 
              key={determinedAlgorithm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pb-24 mt-12 bg-[#080b12]"
            >
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-950/50 sticky top-16 z-40 border-y border-gray-800/30 py-6 backdrop-blur-lg">
                <div className="max-w-5xl mx-auto flex gap-3 px-4 justify-center flex-wrap sm:flex-nowrap">
                  {TABS.map((tab) => (
                    <motion.button
                      key={tab}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab)}
                      className={`px-6 py-3 rounded-full whitespace-nowrap text-sm font-bold transition-all duration-300 ${
                        activeTab === tab 
                          ? 'bg-gradient-to-r from-cyan-600/30 to-cyan-600/10 text-cyan-300 border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.25)]'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40 border border-gray-700/40 hover:border-gray-600/60'
                      }`}
                    >
                      {tab}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="pt-12 min-h-[50vh] max-w-5xl mx-auto px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === 'Overview' && (
                      <div className="pt-4">
                        <AlgorithmCard algorithm={determinedAlgorithm} />
                      </div>
                    )}
                    {activeTab === 'Decision Flow' && (
                      <div className="pt-4">
                        <DecisionTree algorithm={determinedAlgorithm} />
                      </div>
                    )}
                    {activeTab === 'Complexity' && <ComplexityChart algorithm={determinedAlgorithm} />}
                    {activeTab === 'Visualizer' && <Visualizer algorithm={determinedAlgorithm} />}
                    {activeTab === 'Code' && <CodeBlock algorithm={determinedAlgorithm} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-800/30 text-center bg-gradient-to-b from-gray-900 to-gray-950">
        <p className="text-gray-500 font-medium">Designed & Developed by <span className="text-cyan-400">Krishna</span></p>
        <p className="text-gray-600 text-sm mt-2">Algorithmaze © 2026</p>
      </footer>
    </div>
  )
}

export default App;
