import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';
import ComplexityComparison from './ComplexityComparison';

const data = [
  { name: 'O(1)', sortOrder: 1, display: 'Excellent' },
  { name: 'O(log n)', sortOrder: 2, display: 'Good' },
  { name: 'O(n)', sortOrder: 3, display: 'Fair' },
  { name: 'O(n log n)', sortOrder: 4, display: 'Bad' },
  { name: 'O(n²)', sortOrder: 5, display: 'Terrible' },
];

const ComplexityChart = ({ algorithm }) => {
  if (!algorithm) return null;

  const getColor = (value) => {
    if (value <= 2) return '#10b981'; // emerald
    if (value <= 3) return '#06b6d4'; // cyan
    if (value <= 4) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const chartData = data.map(d => ({
    ...d,
    isCurrentTime: d.sortOrder === Math.floor(algorithm.complexity.timeVal),
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto py-8 px-4"
    >
      <div className="bg-gray-800/30 border border-gray-700/50 p-6 md:p-8 rounded-3xl mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Complexity Analysis</h3>
        <p className="text-gray-400 mb-8">Visual comparison of Big-O time complexity for the selected algorithm.</p>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" tick={{fill: '#9ca3af'}} />
              <YAxis hide />
              <Tooltip 
                cursor={{fill: '#374151', opacity: 0.4}}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-900 border border-gray-700 p-3 rounded-lg shadow-xl">
                        <p className="text-white font-bold">{payload[0].payload.name}</p>
                        <p className="text-gray-400 text-sm">{payload[0].payload.display}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="sortOrder" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isCurrentTime ? getColor(entry.sortOrder) : '#374151'} 
                    style={{ filter: entry.isCurrentTime ? 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.4))' : 'none' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#06b6d4]"></div>
            <span className="text-sm text-gray-300">Selected Algorithm ({algorithm.complexity.time})</span>
          </div>
        </div>
      </div>

      {/* Global Complexity Comparison */}
      <ComplexityComparison algorithm={algorithm} />
    </motion.div>
  );
};

export default ComplexityChart;
