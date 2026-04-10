import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle } from 'lucide-react';

const AlgorithmCard = ({ algorithm }) => {
  if (!algorithm) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto py-8 px-4"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/20 to-blue-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative bg-gradient-to-br from-slate-950/90 to-slate-900/80 border border-slate-700/50 p-9 rounded-3xl shadow-xl backdrop-blur-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span className="bg-cyan-600/20 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-cyan-600/40">
                  Recommended
                </span>
                <span className="text-gray-400 text-sm font-semibold">{algorithm.type}</span>
              </div>
              <h2 className="text-5xl font-black text-white tracking-tight">{algorithm.name}</h2>
            </div>
          </div>
          
          {/* Explanation */}
          <p className="text-gray-300 text-lg mb-10 leading-relaxed max-w-3xl">
            {algorithm.explanation}
          </p>

          {/* Complexity Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-slate-950/90 to-slate-900/80 p-8 rounded-2xl mb-8 border border-slate-700/50">
            <div className="space-y-2">
              <h3 className="text-xs text-gray-400 uppercase tracking-widest font-bold">Time Complexity</h3>
              <p className="text-3xl font-black text-cyan-400">{algorithm.complexity.time}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xs text-gray-400 uppercase tracking-widest font-bold">Space Complexity</h3>
              <p className="text-3xl font-black text-blue-400">{algorithm.complexity.space}</p>
            </div>
          </div>

          {/* Decision Reasoning */}
          <div className="space-y-5 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-2xl border border-gray-700/30">
            <h3 className="text-lg font-bold text-white">Why This Algorithm?</h3>
            <div className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 leading-relaxed">
                <span className="text-emerald-300 font-semibold">Optimally chosen:</span> {algorithm.condition}
              </p>
            </div>
            {algorithm.alternatives && algorithm.alternatives.length > 0 && (
              <div className="flex gap-4 pt-3">
                <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 leading-relaxed">
                  <span className="text-amber-300 font-semibold">Alternatives:</span> {algorithm.alternatives.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AlgorithmCard;
