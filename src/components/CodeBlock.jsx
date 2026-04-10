import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FileCode2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CodeBlock = ({ algorithm }) => {
  if (!algorithm || !algorithm.code) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto py-8 px-4"
    >
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
        <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
          <FileCode2 className="w-5 h-5 text-cyan-400 mr-2" />
          <span className="text-gray-300 font-mono text-sm">{algorithm.id}.js</span>
          <div className="ml-auto flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>
        <div className="p-4 overflow-x-auto text-sm md:text-base">
          <SyntaxHighlighter 
            language="javascript" 
            style={vscDarkPlus}
            customStyle={{ background: 'transparent', margin: 0, padding: 0 }}
            showLineNumbers={true}
          >
            {algorithm.code}
          </SyntaxHighlighter>
        </div>
      </div>
    </motion.div>
  );
};

export default CodeBlock;
