import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20">
      {/* Premium Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-[200px]" />
        <div className="absolute -bottom-1/2 right-1/3 w-96 h-96 bg-blue-600/5 rounded-full blur-[200px]" />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex"
          >
            <span className="text-xs md:text-sm font-bold text-cyan-400 tracking-[0.15em] uppercase bg-cyan-950/40 px-5 py-2.5 rounded-full border border-cyan-700/40">
              ALGORITHM DECISION VISUALIZER
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
              <span className="text-white">Interactive</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300">
                Algorithm Explorer
              </span>
            </h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-cyan-300/70 font-bold tracking-widest uppercase max-w-2xl"
          >
            Choose the right algorithm with confidence
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={() => scrollToSection('explore')}
            className="group inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] gap-3"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.div
            id="features"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-3xl mx-auto text-center mt-12 scroll-mt-28"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80 font-semibold mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Discover the core features that guide every algorithm choice
            </h2>
            <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-2xl mx-auto">
              These highlights show how the visualizer breaks down your problem, selects the right algorithm,
              and presents clarity with interactive insights.
            </p>
          </motion.div>

          {/* Feature Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full grid md:grid-cols-2 gap-6 mt-10"
          >
            {/* Feature Card 1 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/40 rounded-2xl p-8 backdrop-blur-md hover:border-cyan-600/50 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-cyan-900/50 rounded-lg border border-cyan-700/40">
                      <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-2">
                      Select Problem
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Choose from searching, sorting, graph, or string matching
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/40 rounded-2xl p-8 backdrop-blur-md hover:border-blue-600/50 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-900/50 rounded-lg border border-blue-700/40">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-blue-400 uppercase tracking-widest mb-2">
                      Get Recommendation
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Our engine recommends the optimal algorithm with reasoning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/40 rounded-2xl p-8 backdrop-blur-md hover:border-violet-600/50 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-violet-900/50 rounded-lg border border-violet-700/40">
                      <ArrowRight className="w-6 h-6 text-violet-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-violet-400 uppercase tracking-widest mb-2">
                      View Decision Tree
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Understand the logic behind algorithm selection visually
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600/20 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/40 rounded-2xl p-8 backdrop-blur-md hover:border-emerald-600/50 transition-all duration-300">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-emerald-900/50 rounded-lg border border-emerald-700/40">
                      <CheckCircle className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-2">
                      Watch it Run
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Animate the algorithm step-by-step with play/pause controls
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full bg-gradient-to-r from-cyan-950/30 via-blue-950/20 to-cyan-950/30 border border-cyan-700/30 rounded-2xl p-7 backdrop-blur-md"
          >
            <p className="text-gray-200 text-sm leading-relaxed">
              <span className="font-bold text-gray-100">Live preview</span>
              <span className="text-gray-400 mx-2">—</span>
              Compare algorithms as you adjust problem details, watch recommendations update instantly, and see the impact of each choice in real time.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;
