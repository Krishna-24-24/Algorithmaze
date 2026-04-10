import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const normalizeComplexity = (complexity) =>
  complexity
    ?.toString()
    .replace(/\s/g, '')
    .replace(/\u221A/g, 'sqrt')
    .replace(/\u00B2/g, '^2')
    .replace(/\u207F/g, '^n') || '';

const complexityGrowthMap = {
  'O(1)': () => 1,
  'O(logn)': (n) => Number((Math.log2(n + 1)).toFixed(1)),
  'O(n)': (n) => n,
  'O(nlogn)': (n) => Number((n * Math.log2(n + 1)).toFixed(1)),
  'O(n^2)': (n) => Math.pow(n, 2),
  'O(2^n)': (n) => Math.pow(2, n),
  'O(n²)': (n) => Math.pow(n, 2),
  'O(2ⁿ)': (n) => Math.pow(2, n),
  'O(n*m)': (n) => n * 1.5,
  'O(n+m)': (n) => n * 1.1,
  'O((V+E)logV)': (n) => Number((n * Math.log2(n + 1) * 1.2).toFixed(1)),
  'O(V+E)': (n) => n * 1.1,
  'O(V*E)': (n) => Math.pow(n, 2),
  'O(m)': (n) => n,
  'O(h+k)': (n) => Number((Math.log2(n + 1) + n / 2).toFixed(1)),
  'O(h)': (n) => n,
  'O(h)': (n) => Number((Math.log2(n + 1)).toFixed(1)),
  'O(n*h)': (n) => n * Math.log2(n + 1),
};

const getGrowthValue = (complexity, n) => {
  const key = normalizeComplexity(complexity);
  return (complexityGrowthMap[key] || complexityGrowthMap['O(n)'])(n);
};

const generateGrowthData = (best, avg, worst) => {
  const data = [];
  for (let n = 1; n <= 8; n++) {
    data.push({
      n,
      best: getGrowthValue(best, n),
      avg: getGrowthValue(avg, n),
      worst: getGrowthValue(worst, n),
    });
  }
  return data;
};

const extendedComplexities = {
  'Quick Sort': { timeBes: 'O(n log n)', timeAvg: 'O(n log n)', timeWor: 'O(n²)', space: 'O(log n)' },
  'Merge Sort': { timeBes: 'O(n log n)', timeAvg: 'O(n log n)', timeWor: 'O(n log n)', space: 'O(n)' },
  'Insertion Sort': { timeBes: 'O(n)', timeAvg: 'O(n²)', timeWor: 'O(n²)', space: 'O(1)' },
  'Selection Sort': { timeBes: 'O(n²)', timeAvg: 'O(n²)', timeWor: 'O(n²)', space: 'O(1)' },
  'Binary Search': { timeBes: 'O(1)', timeAvg: 'O(log n)', timeWor: 'O(log n)', space: 'O(1)' },
  'Linear Search': { timeBes: 'O(1)', timeAvg: 'O(n)', timeWor: 'O(n)', space: 'O(1)' },
  'Breadth-First Search (BFS)': { timeBes: 'O(V + E)', timeAvg: 'O(V + E)', timeWor: 'O(V + E)', space: 'O(V)' },
  'Depth-First Search (DFS)': { timeBes: 'O(V + E)', timeAvg: 'O(V + E)', timeWor: 'O(V + E)', space: 'O(V)' },
  "Dijkstra's Algorithm": { timeBes: 'O((V+E)logV)', timeAvg: 'O((V+E)logV)', timeWor: 'O((V+E)logV)', space: 'O(V)' },
  'Bellman-Ford': { timeBes: 'O(V * E)', timeAvg: 'O(V * E)', timeWor: 'O(V * E)', space: 'O(V)' },
  'Naive String Match': { timeBes: 'O(n)', timeAvg: 'O(n * m)', timeWor: 'O(n * m)', space: 'O(1)' },
  'Knuth-Morris-Pratt (KMP)': { timeBes: 'O(n)', timeAvg: 'O(n + m)', timeWor: 'O(n + m)', space: 'O(m)' },
  'Stack': { timeBes: 'O(1)', timeAvg: 'O(1)', timeWor: 'O(1)', space: 'O(n)' },
  'Queue': { timeBes: 'O(1)', timeAvg: 'O(1)', timeWor: 'O(1)', space: 'O(n)' },
  'Linked List': { timeBes: 'O(1)', timeAvg: 'O(n)', timeWor: 'O(n)', space: 'O(n)' },
  'Tree Traversals': { timeBes: 'O(n)', timeAvg: 'O(n)', timeWor: 'O(n)', space: 'O(h) / O(n)' },
  'Find Minimum': { timeBes: 'O(h)', timeAvg: 'O(h)', timeWor: 'O(h)', space: 'O(1)' },
  'Find Maximum': { timeBes: 'O(h)', timeAvg: 'O(h)', timeWor: 'O(h)', space: 'O(1)' },
  'Find Kth Minimum': { timeBes: 'O(h + k)', timeAvg: 'O(h + k)', timeWor: 'O(h + k)', space: 'O(h)' },
  'Find Kth Maximum': { timeBes: 'O(h + k)', timeAvg: 'O(h + k)', timeWor: 'O(h + k)', space: 'O(h)' },
};

const ComplexityComparison = ({ algorithm }) => {
  if (!algorithm) return null;

  const currentComplexity = extendedComplexities[algorithm.name] || {
    timeBes: algorithm.complexity.time || '-',
    timeAvg: algorithm.complexity.time || '-',
    timeWor: algorithm.complexity.time || '-',
    space: algorithm.complexity.space || '-'
  };

  const chartData = generateGrowthData(currentComplexity.timeBes, currentComplexity.timeAvg, currentComplexity.timeWor);

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="bg-gray-800/30 border border-gray-700/50 p-6 md:p-8 rounded-3xl mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Algorithm Growth Rate</h3>
        <p className="text-gray-400 mb-8">Best, average, and worst case growth for the chosen algorithm.</p>
        
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.5} />
              <XAxis dataKey="n" stroke="#9ca3af" label={{ value: 'Input Elements (n)', position: 'insideBottomRight', offset: -10, fill: '#9ca3af' }} />
              <YAxis domain={[0, 'dataMax']} stroke="#9ca3af" label={{ value: 'Operations', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ fontWeight: 'bold' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Line type="monotone" dataKey="best" name="Best Case" stroke="#10b981" strokeWidth={3} dot={false} isAnimationActive={true} />
              <Line type="monotone" dataKey="avg" name="Average Case" stroke="#0ea5e9" strokeWidth={3} dot={false} isAnimationActive={true} />
              <Line type="monotone" dataKey="worst" name="Worst Case" stroke="#ef4444" strokeWidth={3} dot={false} isAnimationActive={true} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-gray-800/30 border border-gray-700/50 p-6 md:p-8 rounded-3xl overflow-x-auto">
        <h3 className="text-2xl font-bold text-white mb-2">{algorithm.name} Complexity Table</h3>
        <p className="text-gray-400 mb-6">Detailed performance characteristics for the selected algorithm.</p>
        
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-900/50">
              <th className="py-4 px-4 text-emerald-400 font-semibold border-r border-gray-800 rounded-tl-xl">Time (Best)</th>
              <th className="py-4 px-4 text-amber-400 font-semibold border-r border-gray-800">Time (Average)</th>
              <th className="py-4 px-4 text-red-400 font-semibold border-r border-gray-800">Time (Worst)</th>
              <th className="py-4 px-4 text-cyan-400 font-semibold rounded-tr-xl">Space (Worst)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors">
              <td className="py-4 px-4 text-gray-300 font-mono text-lg border-r border-gray-800/50 focus:text-white">{currentComplexity.timeBes}</td>
              <td className="py-4 px-4 text-gray-300 font-mono text-lg border-r border-gray-800/50">{currentComplexity.timeAvg}</td>
              <td className="py-4 px-4 text-gray-300 font-mono text-lg border-r border-gray-800/50">{currentComplexity.timeWor}</td>
              <td className="py-4 px-4 text-cyan-500 font-mono text-lg">{currentComplexity.space}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplexityComparison;
