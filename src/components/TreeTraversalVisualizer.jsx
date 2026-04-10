import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreeTraversalVisualizer = ({ mode = 'Preorder' }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(-1);
  
  // Binary tree structure: nodes with id, position, and connections
  const treeStructure = useMemo(() => ({
    nodes: [
      { id: 1, x: 50, y: 10, level: 0 },
      { id: 2, x: 25, y: 35, level: 1 },
      { id: 3, x: 75, y: 35, level: 1 },
      { id: 4, x: 12.5, y: 60, level: 2 },
      { id: 5, x: 37.5, y: 60, level: 2 },
      { id: 6, x: 62.5, y: 60, level: 2 },
      { id: 7, x: 87.5, y: 60, level: 2 },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 6 },
      { from: 3, to: 7 },
    ],
  }), []);

  // Generate traversal steps based on mode
  const traversalSteps = useMemo(() => {
    let steps = [];
    const visited = [];

    const preorder = (nodeId) => {
      steps.push({ 
        nodeId, 
        visited: [...visited], 
        action: `Visiting Node ${nodeId}`,
        phase: 'visit'
      });
      visited.push(nodeId);
    };

    if (mode === 'Preorder') {
      preorder(1);
      steps.push({ nodeId: 2, visited: [...visited], action: 'Processing left subtree', phase: 'traverse' });
      preorder(2);
      steps.push({ nodeId: 4, visited: [...visited], action: 'Processing left subtree of 2', phase: 'traverse' });
      preorder(4);
      steps.push({ nodeId: 5, visited: [...visited], action: 'Processing right subtree of 2', phase: 'traverse' });
      preorder(5);
      steps.push({ nodeId: 3, visited: [...visited], action: 'Processing right subtree', phase: 'traverse' });
      preorder(3);
      steps.push({ nodeId: 6, visited: [...visited], action: 'Processing left subtree of 3', phase: 'traverse' });
      preorder(6);
      steps.push({ nodeId: 7, visited: [...visited], action: 'Processing right subtree of 3', phase: 'traverse' });
      preorder(7);
    } else if (mode === 'Inorder') {
      steps.push({ nodeId: 4, visited: [...visited], action: 'Traverse to leftmost node', phase: 'traverse' });
      visited.push(4);
      steps.push({ nodeId: 4, visited: [...visited], action: 'Visit Node 4', phase: 'visit' });
      steps.push({ nodeId: 2, visited: [...visited], action: 'Visit root of left subtree', phase: 'visit' });
      visited.push(2);
      steps.push({ nodeId: 5, visited: [...visited], action: 'Process right subtree of 2', phase: 'traverse' });
      visited.push(5);
      steps.push({ nodeId: 5, visited: [...visited], action: 'Visit Node 5', phase: 'visit' });
      steps.push({ nodeId: 1, visited: [...visited], action: 'Visit Root Node 1', phase: 'visit' });
      visited.push(1);
      steps.push({ nodeId: 6, visited: [...visited], action: 'Process left subtree of 3', phase: 'traverse' });
      visited.push(6);
      steps.push({ nodeId: 6, visited: [...visited], action: 'Visit Node 6', phase: 'visit' });
      steps.push({ nodeId: 3, visited: [...visited], action: 'Visit Node 3', phase: 'visit' });
      visited.push(3);
      steps.push({ nodeId: 7, visited: [...visited], action: 'Process right subtree of 3', phase: 'traverse' });
      visited.push(7);
      steps.push({ nodeId: 7, visited: [...visited], action: 'Visit Node 7', phase: 'visit' });
    } else if (mode === 'Postorder') {
      steps.push({ nodeId: 4, visited: [...visited], action: 'Traverse to leftmost node', phase: 'traverse' });
      visited.push(4);
      steps.push({ nodeId: 4, visited: [...visited], action: 'Visit Node 4 (leaf)', phase: 'visit' });
      steps.push({ nodeId: 5, visited: [...visited], action: 'Visit Node 5 (leaf)', phase: 'traverse' });
      visited.push(5);
      steps.push({ nodeId: 5, visited: [...visited], action: 'Visit Node 5 (leaf)', phase: 'visit' });
      steps.push({ nodeId: 2, visited: [...visited], action: 'Visit Node 2 (after children)', phase: 'traverse' });
      visited.push(2);
      steps.push({ nodeId: 2, visited: [...visited], action: 'Visit Node 2', phase: 'visit' });
      steps.push({ nodeId: 6, visited: [...visited], action: 'Process Node 6', phase: 'traverse' });
      visited.push(6);
      steps.push({ nodeId: 6, visited: [...visited], action: 'Visit Node 6 (leaf)', phase: 'visit' });
      steps.push({ nodeId: 7, visited: [...visited], action: 'Process Node 7', phase: 'traverse' });
      visited.push(7);
      steps.push({ nodeId: 7, visited: [...visited], action: 'Visit Node 7 (leaf)', phase: 'visit' });
      steps.push({ nodeId: 3, visited: [...visited], action: 'Visit Node 3 (after children)', phase: 'traverse' });
      visited.push(3);
      steps.push({ nodeId: 3, visited: [...visited], action: 'Visit Node 3', phase: 'visit' });
      steps.push({ nodeId: 1, visited: [...visited], action: 'Visit Root Node 1 (last)', phase: 'traverse' });
      visited.push(1);
      steps.push({ nodeId: 1, visited: [...visited], action: 'Visit Node 1', phase: 'visit' });
    } else if (mode === 'Breadth-First') {
      steps.push({ nodeId: 1, visited: [...visited], action: 'Visit Node 1 (depth 0)', phase: 'visit' });
      visited.push(1);
      steps.push({ nodeId: 2, visited: [...visited], action: 'Visit Node 2 (depth 1, left)', phase: 'visit' });
      visited.push(2);
      steps.push({ nodeId: 3, visited: [...visited], action: 'Visit Node 3 (depth 1, right)', phase: 'visit' });
      visited.push(3);
      steps.push({ nodeId: 4, visited: [...visited], action: 'Visit Node 4 (depth 2)', phase: 'visit' });
      visited.push(4);
      steps.push({ nodeId: 5, visited: [...visited], action: 'Visit Node 5 (depth 2)', phase: 'visit' });
      visited.push(5);
      steps.push({ nodeId: 6, visited: [...visited], action: 'Visit Node 6 (depth 2)', phase: 'visit' });
      visited.push(6);
      steps.push({ nodeId: 7, visited: [...visited], action: 'Visit Node 7 (depth 2)', phase: 'visit' });
      visited.push(7);
    }

    steps.push({ 
      nodeId: null, 
      visited: [...visited], 
      action: `${mode} Traversal Complete! Order: [${[...visited].join(', ')}]`,
      phase: 'complete'
    });

    return steps;
  }, [mode]);

  const currentStep = traversalSteps[currentStepIdx] || traversalSteps[0];
  const isComplete = currentStepIdx >= traversalSteps.length - 1;
  
  const visitedNodeIds = new Set(currentStep?.visited || []);
  const currentNodeId = currentStep?.nodeId;

  const handleNextStep = () => {
    if (currentStepIdx < traversalSteps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleAutoPlay = () => {
    let step = currentStepIdx >= 0 ? currentStepIdx : 0;
    const interval = setInterval(() => {
      if (step >= traversalSteps.length - 1) {
        clearInterval(interval);
      } else {
        step++;
        setCurrentStepIdx(step);
      }
    }, 600);
  };

  const handleReset = () => {
    setCurrentStepIdx(-1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header with traversal info */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-5 mb-5">
        <h3 className="text-2xl font-bold text-white mb-2">{mode} Tree Traversal</h3>
        <p className="text-gray-400 mb-4">
          {mode === 'Preorder' && 'Visit Root → Left Subtree → Right Subtree (Root, Left, Right)'}
          {mode === 'Inorder' && 'Left Subtree → Visit Root → Right Subtree (Left, Root, Right)'}
          {mode === 'Postorder' && 'Left Subtree → Right Subtree → Visit Root (Left, Right, Root)'}
          {mode === 'Breadth-First' && 'Visit nodes level by level from top to bottom, left to right'}
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-cyan-900/40 text-cyan-300 rounded-full text-sm border border-cyan-700/50">
            Time: O(n)
          </span>
          <span className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm border border-blue-700/50">
            Space: O(h) or O(n)
          </span>
          <span className="px-3 py-1 bg-purple-900/40 text-purple-300 rounded-full text-sm border border-purple-700/50">
            Step: {Math.max(1, currentStepIdx + 1)} / {traversalSteps.length}
          </span>
        </div>
      </div>

      {/* Step message */}
      <div className="bg-cyan-950/40 border border-cyan-800/50 rounded-xl p-4 mb-5 min-h-[3rem] flex items-center">
        <span className="text-cyan-300 font-medium">
          {currentStep?.action || 'Ready to start. Click Play or Next Step to begin.'}
        </span>
      </div>

      {/* Tree visualization */}
      <div className="bg-gray-950 border border-gray-700 rounded-2xl p-4 mb-5 relative overflow-hidden">
        <svg viewBox="0 0 100 78" className="w-full h-auto max-h-[280px] drop-shadow-lg">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Draw edges */}
          {treeStructure.edges.map((edge, idx) => {
            const fromNode = treeStructure.nodes.find(n => n.id === edge.from);
            const toNode = treeStructure.nodes.find(n => n.id === edge.to);
            const edgeVisited = visitedNodeIds.has(edge.from) && visitedNodeIds.has(edge.to);
            
            return (
              <motion.line
                key={`edge-${idx}`}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={edgeVisited ? '#06b6d4' : '#4b5563'}
                strokeWidth={edgeVisited ? '2' : '1.5'}
                className="transition-all duration-300"
                style={{
                  filter: edgeVisited ? 'drop-shadow(0 0 3px rgba(6, 182, 212, 0.5))' : 'none'
                }}
              />
            );
          })}

          {/* Draw nodes */}
          {treeStructure.nodes.map((node) => {
            const isVisited = visitedNodeIds.has(node.id);
            const isCurrent = currentNodeId === node.id;
            
            let fillColor = '#1f2937';
            let strokeColor = '#4b5563';
            let textColor = '#9ca3af';
            let glow = 'none';

            if (isCurrent) {
              fillColor = '#06b6d4';
              strokeColor = '#22d3ee';
              textColor = '#ffffff';
              glow = 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.8))';
            } else if (isVisited) {
              fillColor = '#10b981';
              strokeColor = '#34d399';
              textColor = '#ffffff';
              glow = 'drop-shadow(0 0 5px rgba(16, 185, 129, 0.5))';
            }

            return (
              <motion.g
                key={`node-${node.id}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: node.level * 0.1 }}
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={isCurrent ? '6.5' : '5.5'}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={isCurrent ? '1.5' : '1'}
                  className="transition-all duration-300"
                  animate={{
                    r: isCurrent ? 6.5 : 5.5,
                  }}
                  style={{ filter: glow }}
                />
                <motion.text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dy="0.35em"
                  fill={textColor}
                  fontSize={isCurrent ? '4.4' : '4'}
                  fontWeight="bold"
                  className="font-mono pointer-events-none transition-all duration-300"
                >
                  {node.id}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Traversal output - show visited nodes in order */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">Traversal Order</h4>
        <div className="flex flex-wrap gap-2 items-center min-h-[2.5rem] bg-gray-800/50 p-4 rounded-lg">
          {visitedNodeIds.size === 0 ? (
            <span className="text-gray-500 italic">No nodes visited yet. Click Next Step or Play.</span>
          ) : (
            <>
              <span className="text-gray-400 font-mono text-sm">[</span>
              <AnimatePresence>
                {Array.from(visitedNodeIds).map((nodeId, idx) => (
                  <motion.div
                    key={nodeId}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex items-center gap-1"
                  >
                    <div className="w-8 h-8 bg-emerald-900/50 border border-emerald-500 text-emerald-300 rounded font-mono font-bold flex items-center justify-center text-sm">
                      {nodeId}
                    </div>
                    {idx < visitedNodeIds.size - 1 && <span className="text-gray-400 font-mono">,</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              <span className="text-gray-400 font-mono text-sm">]</span>
            </>
          )}
        </div>
      </div>

      {/* Control buttons */}
      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={handleReset}
          className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all border border-gray-600 hover:border-gray-500"
        >
          Reset
        </button>
        <button
          onClick={handlePrevStep}
          disabled={currentStepIdx <= 0}
          className="px-6 py-2.5 bg-blue-900/50 hover:bg-blue-800 text-blue-300 rounded-lg font-semibold transition-all border border-blue-700 disabled:opacity-50 disabled:cursor-not-allowed hover:text-blue-200"
        >
          ← Previous
        </button>
        <button
          onClick={handleAutoPlay}
          disabled={isComplete}
          className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ▶ Play
        </button>
        <button
          onClick={handleNextStep}
          disabled={isComplete}
          className="px-6 py-2.5 bg-purple-900/50 hover:bg-purple-800 text-purple-300 rounded-lg font-semibold transition-all border border-purple-700 disabled:opacity-50 disabled:cursor-not-allowed hover:text-purple-200"
        >
          Next Step →
        </button>
      </div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-emerald-900/30 border border-emerald-600/50 rounded-lg text-emerald-300 text-center font-semibold"
        >
          ✓ Traversal Complete! Final order: [{Array.from(visitedNodeIds).join(', ')}]
        </motion.div>
      )}
    </div>
  );
};

export default TreeTraversalVisualizer;
