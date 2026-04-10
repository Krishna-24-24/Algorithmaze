import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, RefreshCw, Settings2, Info, Plus, Minus } from 'lucide-react';
import TreeTraversalVisualizer from './TreeTraversalVisualizer';

const DEFAULT_SEARCH_ARRAY = "10, 24, 32, 45, 59, 72, 88, 91";
const DEFAULT_SORTING_ARRAY = "45, 10, 72, 24, 91, 32, 59, 88";

const Visualizer = ({ algorithm }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [steps, setSteps] = useState([]);
  
  // States for Searching/Sorting
  const [arrayInput, setArrayInput] = useState(DEFAULT_SEARCH_ARRAY);
  const [targetInput, setTargetInput] = useState("72");
  
  // States for String Matching
  const [textInput, setTextInput] = useState("AABAACAADAABAABA");
  const [patternInput, setPatternInput] = useState("AABA");

  // States for Data Structures
  const [dsItems, setDsItems] = useState([]);
  const [dsInput, setDsInput] = useState("");
  
  // State for Tree
  const [treeTraversalMode, setTreeTraversalMode] = useState("Preorder");
  const [kthValue, setKthValue] = useState("2");
  
  // State for Graph
  const [graphStartNode, setGraphStartNode] = useState("1");
  
  // State for Hashing
  const [hashInput, setHashInput] = useState("45, 23, 67, 12, 89, 34");
  const [tableSize, setTableSize] = useState("10");
  
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    setIsPlaying(false);
    setStepIdx(0);
    setSteps([]);
    setDsItems([]);
    setDsInput("");
    setShowConfig(false);

    if (algorithm?.type === "Sorting") {
      setArrayInput(DEFAULT_SORTING_ARRAY);
    } else if (algorithm?.type === "Searching") {
      setArrayInput(DEFAULT_SEARCH_ARRAY);
    }

    if (algorithm?.type === "Tree") {
      if (algorithm.id === "findMinBST") {
        setTreeTraversalMode("Find Min");
      } else if (algorithm.id === "findMaxBST") {
        setTreeTraversalMode("Find Max");
      } else if (algorithm.id === "findKthMin") {
        setTreeTraversalMode("Find Kth Min");
      } else if (algorithm.id === "findKthMax") {
        setTreeTraversalMode("Find Kth Max");
      } else {
        setTreeTraversalMode("Preorder");
      }
    }
  }, [algorithm]);

  const parseArray = () => arrayInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
  const formatOrdinal = (value) => {
    const mod100 = value % 100;
    if (mod100 >= 11 && mod100 <= 13) return `${value}th`;
    const mod10 = value % 10;
    if (mod10 === 1) return `${value}st`;
    if (mod10 === 2) return `${value}nd`;
    if (mod10 === 3) return `${value}rd`;
    return `${value}th`;
  };
  
  const generateSteps = () => {
    let generatedSteps = [];
    
    if (algorithm.type === "Searching") {
       const arr = parseArray();
       const target = parseInt(targetInput);
       if (arr.length === 0) return [];
       
       if (algorithm.id === 'linearSearch') {
         for (let i = 0; i < arr.length; i++) {
           generatedSteps.push({ array: [...arr], activeIdx: i, message: `Checking index ${i} (value: ${arr[i]}).` });
           if (arr[i] === target) {
             generatedSteps.push({ array: [...arr], activeIdx: i, foundIdx: i, message: `Target ${target} found at index ${i}!` });
             return generatedSteps;
           }
         }
         generatedSteps.push({ array: [...arr], message: `Target ${target} not found in array.` });
       } else if (algorithm.id === 'binarySearch') {
         let sorted = [...arr].sort((a,b)=>a-b);
         if (JSON.stringify(arr) !== JSON.stringify(sorted)) {
           generatedSteps.push({ array: sorted, message: "Array must be sorted for Binary Search. Sorted array shown." });
         } else {
           sorted = arr;
         }
         let l = 0, r = sorted.length - 1;
         while (l <= r) {
           let mid = Math.floor((l + r)/2);
           generatedSteps.push({ array: [...sorted], activeIdx: mid, l, r, message: `Calculating mid = Math.floor((${l} + ${r}) / 2) = ${mid}. Checking index ${mid}.` });
           if (sorted[mid] === target) {
             generatedSteps.push({ array: [...sorted], activeIdx: mid, foundIdx: mid, l, r, message: `Target ${target} found at index ${mid}!` });
             return generatedSteps;
           } else if (sorted[mid] < target) {
             generatedSteps.push({ array: [...sorted], activeIdx: mid, l, r, message: `${sorted[mid]} < ${target}. Target must be in the right half.` });
             l = mid + 1;
           } else {
             generatedSteps.push({ array: [...sorted], activeIdx: mid, l, r, message: `${sorted[mid]} > ${target}. Target must be in the left half.` });
             r = mid - 1;
           }
         }
         generatedSteps.push({ array: [...sorted], message: `Target ${target} not found in array.` });
       }
    } else if (algorithm.type === "Sorting") {
       const arr = parseArray();
       if (arr.length === 0) return [];
       let temp = [...arr];
       generatedSteps.push({ array: [...temp], message: "Initial Array Layout", phase: "start" });
       
       if (algorithm.id === 'mergeSort') {
         // Merge Sort with Divide & Merge visualization
         const mergeSortSteps = (arr, left = 0, right = arr.length - 1, depth = 0) => {
           if (left === right) {
             generatedSteps.push({ 
               array: [...temp], 
               highlightIdx: [left], 
               message: `Single element at index ${left} (value: ${arr[left]}) - element is sorted.`,
               phase: "divided"
             });
             return;
           }

           const mid = Math.floor((left + right) / 2);
           generatedSteps.push({ 
             array: [...temp], 
             highlightIdx: Array.from({length: right - left + 1}, (_, i) => left + i),
             message: `Dividing: Left [${left}-${mid}] and Right [${mid + 1}-${right}]`,
             phase: "dividing"
           });

           mergeSortSteps(arr, left, mid, depth + 1);
           mergeSortSteps(arr, mid + 1, right, depth + 1);

           // Merge phase
           let leftArr = temp.slice(left, mid + 1);
           let rightArr = temp.slice(mid + 1, right + 1);
           let merged = [];
           let i = 0, j = 0;

           generatedSteps.push({
             array: [...temp],
             highlightIdx: Array.from({length: right - left + 1}, (_, k) => left + k),
             message: `Merging subarrays: [${leftArr.join(',')}] and [${rightArr.join(',')}]`,
             phase: "merging"
           });

           while (i < leftArr.length && j < rightArr.length) {
             generatedSteps.push({
               array: [...temp],
               compareIdx: [left + i, mid + 1 + j],
               message: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
               phase: "comparing"
             });

             if (leftArr[i] <= rightArr[j]) {
               merged.push(leftArr[i]);
               i++;
             } else {
               merged.push(rightArr[j]);
               j++;
             }
           }

           while (i < leftArr.length) merged.push(leftArr[i++]);
           while (j < rightArr.length) merged.push(rightArr[j++]);

           for (let k = 0; k < merged.length; k++) {
             temp[left + k] = merged[k];
           }

           generatedSteps.push({
             array: [...temp],
             highlightIdx: Array.from({length: merged.length}, (_, k) => left + k),
             message: `Merged result: [${merged.join(',')}]`,
             phase: "merged"
           });
         };

         mergeSortSteps(temp);
       } else if (algorithm.id === 'quickSort') {
         // Quick Sort with Pivot & Partition visualization
         const quickSortSteps = (arr, left = 0, right = arr.length - 1) => {
           if (left >= right) return;

           const pivot = arr[right];
           let i = left;

           generatedSteps.push({
             array: [...temp],
             highlightIdx: [right],
             message: `Pivot selected: ${pivot} at index ${right}`,
             phase: "pivoting"
           });

           for (let j = left; j < right; j++) {
             generatedSteps.push({
               array: [...temp],
               compareIdx: [j, right],
               message: `Comparing ${arr[j]} with pivot ${pivot}`,
               phase: "comparing"
             });

             if (arr[j] < pivot) {
               [arr[i], arr[j]] = [arr[j], arr[i]];
               temp = [...arr];
               generatedSteps.push({
                 array: [...temp],
                 highlightIdx: [i, j],
                 message: `Swapped ${arr[j]} and ${arr[i]}`,
                 phase: "partitioning"
               });
               i++;
             }
           }

           [arr[i], arr[right]] = [arr[right], arr[i]];
           temp = [...arr];
           generatedSteps.push({
             array: [...temp],
             highlightIdx: [i],
             message: `Pivot ${pivot} at final position ${i}`,
             phase: "partitioned"
           });

           quickSortSteps(arr, left, i - 1);
           quickSortSteps(arr, i + 1, right);
         };

         quickSortSteps(temp);
       } else if (algorithm.id === 'insertionSort') {
         for (let i = 1; i < temp.length; i++) {
           let key = temp[i];
           let j = i - 1;
           generatedSteps.push({ 
             array: [...temp], 
             activeIdx: i, 
             sortedUpto: j,
             message: `Select key ${key} at index ${i}. Comparing with sorted elements [0-${j}].`,
             phase: "selecting"
           });

           while (j >= 0 && temp[j] > key) {
             temp[j + 1] = temp[j];
             j--;
             generatedSteps.push({ 
               array: [...temp], 
               compareIdx: [j + 1, j], 
               sortedUpto: j,
               message: `Shifted ${temp[j+1]} right. Finding insertion point.`,
               phase: "shifting"
             });
           }
           temp[j + 1] = key;
           generatedSteps.push({ 
             array: [...temp], 
             activeIdx: j + 1, 
             sortedUpto: i,
             message: `Inserted key ${key} at position ${j+1}. Sorted: [0-${i}]`,
             phase: "inserted"
           });
         }
       } else if (algorithm.id === 'selectionSort') {
         for (let i = 0; i < temp.length - 1; i++) {
           let minIdx = i;
           generatedSteps.push({
             array: [...temp],
             activeIdx: i,
             sortedUpto: i - 1,
             message: `Finding minimum element from index ${i} onwards. Sorted: [0-${i-1}]`,
             phase: "searching"
           });

           for (let j = i + 1; j < temp.length; j++) {
             generatedSteps.push({ 
               array: [...temp], 
               compareIdx: [j, minIdx], 
               activeIdx: i,
               sortedUpto: i - 1,
               message: `Comparing ${temp[j]} and ${temp[minIdx]}. Min is ${temp[minIdx]}.`,
               phase: "comparing"
             });
             if (temp[j] < temp[minIdx]) minIdx = j;
           }

           if (minIdx !== i) {
             [temp[i], temp[minIdx]] = [temp[minIdx], temp[i]];
             generatedSteps.push({ 
               array: [...temp], 
               highlightIdx: [i, minIdx],
               sortedUpto: i,
               message: `Swapped ${temp[i]} with ${temp[minIdx]}. Sorted: [0-${i}]`,
               phase: "swapped"
             });
           }
         }
       }

       generatedSteps.push({ array: [...temp], message: "Array is fully sorted! ✓", phase: "complete", sortedUpto: temp.length - 1 });
       
    } else if (algorithm.type === "StringMatching") {
       const t = textInput;
       const p = patternInput;
       if (!t || !p) return [];
       
       if (algorithm.id === 'naiveStringMatch') {
         for (let i = 0; i <= t.length - p.length; i++) {
           let j = 0;
           generatedSteps.push({ phase: 'align', shift: i, compIdx: i, pattIdx: 0, matchStatus: null, message: `Aligning pattern at text index ${i}.` });
           while (j < p.length && t[i + j] === p[j]) {
             generatedSteps.push({ phase: 'compare', shift: i, compIdx: i + j, pattIdx: j, matchStatus: 'match', message: `Matched '${p[j]}' at text index ${i + j}.` });
             j++;
           }
           if (j === p.length) {
             generatedSteps.push({ phase: 'found', shift: i, compIdx: i + j - 1, pattIdx: j - 1, matchStatus: 'found', message: `Pattern found at index ${i}!` });
             return generatedSteps;
           }

           generatedSteps.push({
             phase: 'compare',
             shift: i,
             compIdx: i + j,
             pattIdx: j,
             matchStatus: 'mismatch',
             message: `Mismatch at text '${t[i + j]}' vs pattern '${p[j]}'. Shift and try again.`,
           });
         }
         generatedSteps.push({ phase: 'complete', shift: -1, message: "Pattern not found in text." });
       } else if (algorithm.id === 'kmpSearch') {
         const lps = new Array(p.length).fill(0);
         generatedSteps.push({
           phase: 'lps-init',
           shift: 0,
           pattIdx: 0,
           comparePatternIdx: null,
           lps: [...lps],
           message: 'Building the LPS array before starting the KMP search.',
         });

         let len = 0;
         let patternIdx = 1;

         while (patternIdx < p.length) {
           generatedSteps.push({
             phase: 'lps-compare',
             shift: 0,
             pattIdx: patternIdx,
             comparePatternIdx: len,
             lps: [...lps],
             message: `Compare pattern[${patternIdx}]='${p[patternIdx]}' with pattern[${len}]='${p[len]}'.`,
           });

           if (p[patternIdx] === p[len]) {
             len++;
             lps[patternIdx] = len;
             generatedSteps.push({
               phase: 'lps-update',
               shift: 0,
               pattIdx: patternIdx,
               comparePatternIdx: len - 1,
               lps: [...lps],
               message: `Characters match. Set LPS[${patternIdx}] = ${len}.`,
             });
             patternIdx++;
           } else if (len !== 0) {
             const previousLen = len;
             len = lps[len - 1];
             generatedSteps.push({
               phase: 'lps-fallback',
               shift: 0,
               pattIdx: patternIdx,
               comparePatternIdx: len,
               lps: [...lps],
               message: `Mismatch. Fall back from length ${previousLen} to ${len} using the LPS array.`,
             });
           } else {
             lps[patternIdx] = 0;
             generatedSteps.push({
               phase: 'lps-update',
               shift: 0,
               pattIdx: patternIdx,
               comparePatternIdx: null,
               lps: [...lps],
               message: `Mismatch with no prefix match. Set LPS[${patternIdx}] = 0.`,
             });
             patternIdx++;
           }
         }

         generatedSteps.push({
           phase: 'lps-complete',
           shift: 0,
           pattIdx: 0,
           comparePatternIdx: null,
           lps: [...lps],
           message: `LPS ready: [${lps.join(', ')}]. Start the KMP scan.`,
         });

         let textIdx = 0;
         let pattIdx = 0;

         while (textIdx < t.length) {
           generatedSteps.push({
             phase: 'search-compare',
             shift: textIdx - pattIdx,
             compIdx: textIdx,
             pattIdx,
             lps: [...lps],
             matchStatus: null,
             message: `Compare text[${textIdx}]='${t[textIdx]}' with pattern[${pattIdx}]='${p[pattIdx]}'.`,
           });

           if (t[textIdx] === p[pattIdx]) {
             textIdx++;
             pattIdx++;

             generatedSteps.push({
               phase: 'search-match',
               shift: textIdx - pattIdx,
               compIdx: textIdx - 1,
               pattIdx: pattIdx - 1,
               lps: [...lps],
               matchStatus: 'match',
               message: `Match found. Advance to text index ${textIdx} and pattern index ${pattIdx}.`,
             });

             if (pattIdx === p.length) {
               const startIdx = textIdx - pattIdx;
               generatedSteps.push({
                 phase: 'found',
                 shift: startIdx,
                 compIdx: textIdx - 1,
                 pattIdx: pattIdx - 1,
                 lps: [...lps],
                 matchStatus: 'found',
                 message: `Pattern found at index ${startIdx} using KMP.`,
               });
               return generatedSteps;
             }
           } else if (pattIdx !== 0) {
             const fallbackIdx = lps[pattIdx - 1];
             generatedSteps.push({
               phase: 'search-fallback',
               shift: textIdx - pattIdx,
               compIdx: textIdx,
               pattIdx,
               lps: [...lps],
               matchStatus: 'mismatch',
               message: `Mismatch. Jump pattern index from ${pattIdx} to ${fallbackIdx} using LPS without moving the text pointer.`,
             });
             pattIdx = fallbackIdx;
           } else {
             generatedSteps.push({
               phase: 'search-mismatch',
               shift: textIdx,
               compIdx: textIdx,
               pattIdx: 0,
               lps: [...lps],
               matchStatus: 'mismatch',
               message: `Mismatch at the start of the pattern. Move to the next text index.`,
             });
             textIdx++;
           }
         }

         generatedSteps.push({ phase: 'complete', shift: -1, lps: [...lps], message: 'Pattern not found in text.' });
       }
    } else if (algorithm.type === "Graph") {
       // Define sample graph
       const graph = {
         '1': ['2', '3'],
         '2': ['1', '4', '5'],
         '3': ['1', '6'],
         '4': ['2'],
         '5': ['2', '6'],
         '6': ['3', '5']
       };

       const startNode = graphStartNode;
       
       if (algorithm.id === 'bfs') {
         // BFS Implementation
         let visited = new Set();
         let queue = [startNode];
         let path = [startNode];
         visited.add(startNode);

         while (queue.length > 0) {
           const node = queue.shift();
           generatedSteps.push({
             visited: Array.from(visited),
             queue: [...queue],
             currentNode: node,
             path: [...path],
             message: `Visiting node ${node}. Neighbors: ${graph[node].filter(n => !visited.has(n)).join(', ') || 'none'}`,
             phase: "visiting"
           });

           for (let neighbor of graph[node]) {
             if (!visited.has(neighbor)) {
               generatedSteps.push({
                 visited: Array.from(visited),
                 queue: [...queue, neighbor],
                 currentNode: node,
                 addingNode: neighbor,
                 path: [...path],
                 message: `Adding neighbor ${neighbor} to queue`,
                 phase: "adding"
               });
               visited.add(neighbor);
               path.push(neighbor);
               queue.push(neighbor);
             }
           }
         }
         generatedSteps.push({
           visited: Array.from(visited),
           queue: [],
           currentNode: null,
           path: [...path],
           message: `BFS Complete! Path: ${path.join(' → ')}`,
           phase: "complete"
         });
       } else if (algorithm.id === 'dfs') {
         // DFS Implementation
         let visited = new Set();
         let stack = [startNode];
         let path = [];

         generatedSteps.push({
           visited: [],
           stack: [startNode],
           currentNode: null,
           path: [],
           message: `Starting DFS from node ${startNode}`,
           phase: "start"
         });

         while (stack.length > 0) {
           const node = stack.pop();
           
           if (!visited.has(node)) {
             generatedSteps.push({
               visited: Array.from(visited),
               stack: [...stack],
               currentNode: node,
               path: [...path],
               message: `Visiting node ${node}. Unvisited neighbors: ${graph[node].filter(n => !visited.has(n)).join(', ') || 'none'}`,
               phase: "visiting"
             });
             visited.add(node);
             path.push(node);

             const unvisitedNeighbors = graph[node].filter(n => !visited.has(n)).reverse();
             for (let neighbor of unvisitedNeighbors) {
               if (!visited.has(neighbor)) {
                 generatedSteps.push({
                   visited: Array.from(visited),
                   stack: [...stack, neighbor],
                   currentNode: node,
                   addingNode: neighbor,
                   path: [...path],
                   message: `Adding neighbor ${neighbor} to stack`,
                   phase: "adding"
                 });
                 stack.push(neighbor);
               }
             }
           }
         }
         generatedSteps.push({
           visited: Array.from(visited),
           stack: [],
           currentNode: null,
           path: [...path],
           message: `DFS Complete! Path: ${path.join(' → ')}`,
           phase: "complete"
         });
       } else if (algorithm.id === 'dijkstra') {
         // Dijkstra's Algorithm with weighted edges
         const weightedGraph = {
           '1': [{ node: '2', weight: 4 }, { node: '3', weight: 2 }],
           '2': [{ node: '1', weight: 4 }, { node: '4', weight: 5 }, { node: '5', weight: 10 }],
           '3': [{ node: '1', weight: 2 }, { node: '6', weight: 3 }],
           '4': [{ node: '2', weight: 5 }],
           '5': [{ node: '2', weight: 10 }, { node: '6', weight: 2 }],
           '6': [{ node: '3', weight: 3 }, { node: '5', weight: 2 }]
         };

         generatedSteps.push({
           visited: [],
           distances: { '1': 0, '2': Infinity, '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity },
           currentNode: startNode,
           message: `Starting Dijkstra from node ${startNode}. Initialize distances: all ∞ except source (0)`,
           phase: "init"
         });

         let distances = { '1': 0, '2': Infinity, '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity };
         let visited = new Set();
         
         for (let i = 0; i < 6; i++) {
           // Find unvisited node with minimum distance
           let minNode = null;
           let minDist = Infinity;
           for (let node in distances) {
             if (!visited.has(node) && distances[node] < minDist) {
               minDist = distances[node];
               minNode = node;
             }
           }

           if (minNode === null || minDist === Infinity) break;

           visited.add(minNode);
           generatedSteps.push({
             visited: Array.from(visited),
             distances: { ...distances },
             currentNode: minNode,
             message: `Process node ${minNode} (distance: ${distances[minNode]}). Check neighbors for shorter paths.`,
             phase: "visiting"
           });

           // Update distances to neighbors
           for (let neighbor of weightedGraph[minNode]) {
             const newDist = distances[minNode] + neighbor.weight;
             if (newDist < distances[neighbor.node]) {
               distances[neighbor.node] = newDist;
               generatedSteps.push({
                 visited: Array.from(visited),
                 distances: { ...distances },
                 currentNode: minNode,
                 relaxedNode: neighbor.node,
                 message: `Update distance to node ${neighbor.node}: ${newDist} = dist[${minNode}](${distances[minNode]}) + weight(${neighbor.weight})`,
                 phase: "relaxing"
               });
             }
           }
         }

         generatedSteps.push({
           visited: Array.from(visited),
           distances: { ...distances },
           currentNode: null,
           message: `Dijkstra Complete! Final distances from node ${startNode}: ${Object.entries(distances).map(([n, d]) => `Node ${n}: ${d}`).join(', ')}`,
           phase: "complete"
         });
       } else if (algorithm.id === 'bellmanFord') {
         // Bellman-Ford Algorithm
         const weightedGraph = {
           '1': [{ node: '2', weight: 4 }, { node: '3', weight: 2 }],
           '2': [{ node: '4', weight: 5 }, { node: '5', weight: 10 }],
           '3': [{ node: '6', weight: 3 }],
           '4': [{ node: '5', weight: -6 }],
           '5': [{ node: '6', weight: 2 }],
           '6': [{ node: '2', weight: 1 }]
         };

         generatedSteps.push({
           visited: [],
           distances: { '1': 0, '2': Infinity, '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity },
           iteration: 0,
           message: `Starting Bellman-Ford from node ${startNode}. The graph includes a negative edge, so we relax all edges V-1 times.`,
           phase: "init"
         });

         let distances = { '1': 0, '2': Infinity, '3': Infinity, '4': Infinity, '5': Infinity, '6': Infinity };
         
         // Relax edges V-1 times
         for (let i = 0; i < 5; i++) {
           generatedSteps.push({
             distances: { ...distances },
             iteration: i + 1,
             currentNode: null,
             message: `Iteration ${i + 1}: Relaxing edges...`,
             phase: "iteration_start"
           });

           let updated = false;
           for (let u in weightedGraph) {
             for (let edge of weightedGraph[u]) {
               const v = edge.node;
               const weight = edge.weight;
               const newDist = distances[u] === Infinity ? Infinity : distances[u] + weight;
               
               if (newDist < distances[v]) {
                 distances[v] = newDist;
                 updated = true;
                 generatedSteps.push({
                   distances: { ...distances },
                   iteration: i + 1,
                   currentNode: u,
                   relaxedNode: v,
                   message: `Relax edge (${u}→${v}): ${distances[v]} = min(${distances[v] === newDist ? 'old' : distances[v]}, ${distances[u]} + ${weight})`,
                   phase: "relaxing"
                 });
               }
             }
           }

           if (!updated) {
             generatedSteps.push({
               distances: { ...distances },
               iteration: i + 1,
               message: `Iteration ${i + 1}: No updates. Early termination.`,
               phase: "early_stop"
             });
             break;
           }
         }

         generatedSteps.push({
           distances: { ...distances },
           iteration: 5,
           currentNode: null,
           message: `Bellman-Ford Complete! Final distances from node ${startNode}: ${Object.entries(distances).map(([n, d]) => `Node ${n}: ${d}`).join(', ')}`,
           phase: "complete"
         });
       }
       return generatedSteps;
    } else if (algorithm.type === "Tree") {
       // Tree node values for BST operations
       const nodeValues = { 1: 50, 2: 30, 3: 70, 4: 20, 5: 40, 6: 60, 7: 80 };
       const treeMap = {
         1: { left: 2, right: 3 },
         2: { left: 4, right: 5 },
         3: { left: 6, right: 7 },
         4: { left: null, right: null },
         5: { left: null, right: null },
         6: { left: null, right: null },
         7: { left: null, right: null }
       };

       let visited = [];
       const order = [];

       if (treeTraversalMode === "Preorder") {
         order.push(1, 2, 4, 5, 3, 6, 7);
       } else if (treeTraversalMode === "Inorder") {
         order.push(4, 2, 5, 1, 6, 3, 7);
       } else if (treeTraversalMode === "Postorder") {
         order.push(4, 5, 2, 6, 7, 3, 1);
       } else if (treeTraversalMode === "Breadth-First") {
         order.push(1, 2, 3, 4, 5, 6, 7);
       } else if (treeTraversalMode === "Find Min") {
         // Traverse left to find minimum
         let current = 1;
         order.push(1);
         generatedSteps.push({
           activeNode: 1,
           visited: [1],
           message: `Starting at root (value: ${nodeValues[1]}). Find minimum by going left.`,
           phase: "searching"
         });
         
         while (treeMap[current].left) {
           current = treeMap[current].left;
           order.push(current);
           generatedSteps.push({
             activeNode: current,
             visited: [...order],
             message: `Move left to Node ${current} (value: ${nodeValues[current]}). Check if has left child.`,
             phase: "searching"
           });
         }
         
         generatedSteps.push({
           activeNode: current,
           visited: [...order],
           message: `Found minimum! Node ${current} (value: ${nodeValues[current]}) has no left child.`,
           phase: "found",
           resultLabel: "Minimum value",
           resultValue: nodeValues[current],
           resultNode: current
         });
         return generatedSteps;
       } else if (treeTraversalMode === "Find Max") {
         // Traverse right to find maximum
         let current = 1;
         order.push(1);
         generatedSteps.push({
           activeNode: 1,
           visited: [1],
           message: `Starting at root (value: ${nodeValues[1]}). Find maximum by going right.`,
           phase: "searching"
         });
         
         while (treeMap[current].right) {
           current = treeMap[current].right;
           order.push(current);
           generatedSteps.push({
             activeNode: current,
             visited: [...order],
             message: `Move right to Node ${current} (value: ${nodeValues[current]}). Check if has right child.`,
             phase: "searching"
           });
         }
         
         generatedSteps.push({
           activeNode: current,
           visited: [...order],
           message: `Found maximum! Node ${current} (value: ${nodeValues[current]}) has no right child.`,
           phase: "found",
           resultLabel: "Maximum value",
           resultValue: nodeValues[current],
           resultNode: current
         });
         return generatedSteps;
       } else if (treeTraversalMode === "Find Kth Min") {
         const k = parseInt(kthValue) || 1;
         let count = 0;
         let result = null;
         let inorderSequence = [];
         
         const inorder = (nodeId) => {
           if (!nodeId) return;
           inorder(treeMap[nodeId].left);
           count++;
           inorderSequence.push(nodeId);
           generatedSteps.push({
             activeNode: nodeId,
             visited: [...inorderSequence],
             message: `Inorder visit: Node ${nodeId} (value: ${nodeValues[nodeId]}). Count: ${count}/${k}`,
             phase: "counting"
           });
           if (count === k) {
             result = nodeId;
           }
           inorder(treeMap[nodeId].right);
         };
         
         inorder(1);
         generatedSteps.push({
           activeNode: result,
           visited: inorderSequence,
           message: `${formatOrdinal(k)} minimum found! Node ${result} (value: ${nodeValues[result]}). Inorder sequence: [${inorderSequence.map(n => nodeValues[n]).join(', ')}]`,
           phase: "found",
           resultLabel: `${formatOrdinal(k)} minimum element`,
           resultValue: nodeValues[result],
           resultNode: result
         });
         return generatedSteps;
       } else if (treeTraversalMode === "Find Kth Max") {
         const k = parseInt(kthValue) || 1;
         let count = 0;
         let result = null;
         let reverseInorderSequence = [];
         
         const reverseInorder = (nodeId) => {
           if (!nodeId) return;
           reverseInorder(treeMap[nodeId].right);
           count++;
           reverseInorderSequence.push(nodeId);
           generatedSteps.push({
             activeNode: nodeId,
             visited: [...reverseInorderSequence],
             message: `Reverse inorder visit: Node ${nodeId} (value: ${nodeValues[nodeId]}). Count: ${count}/${k}`,
             phase: "counting"
           });
           if (count === k) {
             result = nodeId;
           }
           reverseInorder(treeMap[nodeId].left);
         };
         
         reverseInorder(1);
         generatedSteps.push({
           activeNode: result,
           visited: reverseInorderSequence,
           message: `${formatOrdinal(k)} maximum found! Node ${result} (value: ${nodeValues[result]}). Reverse inorder sequence: [${reverseInorderSequence.map(n => nodeValues[n]).join(', ')}]`,
           phase: "found",
           resultLabel: `${formatOrdinal(k)} maximum element`,
           resultValue: nodeValues[result],
           resultNode: result
         });
         return generatedSteps;
       }

       order.forEach(node => {
         visited.push(node);
         generatedSteps.push({
           activeNode: node,
           visited: [...visited],
           message: `Visiting Node ${node} (value: ${nodeValues[node]})`
         });
       });
       generatedSteps.push({
         activeNode: null,
         visited: [...visited],
         message: `Traversal Complete!`
       });
       return generatedSteps;
     }
    
    // Hashing algorithms
    if (algorithm.type === "Hashing") {
      const keys = hashInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
      const size = parseInt(tableSize) || 10;
      if (keys.length === 0) return [];

      let hashTable = new Array(size).fill(null);
      const h1 = (key) => key % size;
      const h2 = (key) => 7 - (key % 7); // secondary hash for double hashing

      generatedSteps.push({
        table: [...hashTable],
        phase: 'init',
        tableSize: size,
        insertedIndex: -1,
        probedSlots: [],
        collisionSlots: [],
        currentKey: null,
        computedHash: null,
        probeFormula: null,
        loadFactor: 0,
        insertedCount: 0,
        message: `Hash table initialized with ${size} empty slots. Hash function: h(k) = k mod ${size}`
      });

      let insertedCount = 0;

      keys.forEach((key, keyIdx) => {
        const hashIdx = h1(key);
        let index = hashIdx;
        const probedSlots = [];
        const collisionSlots = [];
        let probeStep = 0;

        // Step: show hash computation
        generatedSteps.push({
          table: [...hashTable],
          phase: 'compute',
          tableSize: size,
          currentKey: key,
          computedHash: hashIdx,
          probeFormula: `h(${key}) = ${key} mod ${size} = ${hashIdx}`,
          targetSlot: hashIdx,
          probedSlots: [],
          collisionSlots: [],
          insertedIndex: -1,
          loadFactor: insertedCount / size,
          insertedCount,
          message: `Computing hash for key ${key}: h(${key}) = ${key} mod ${size} = ${hashIdx}. Checking slot [${hashIdx}].`
        });

        if (algorithm.id === 'linearProbing') {
          while (hashTable[index] !== null && probeStep < size) {
            collisionSlots.push(index);
            generatedSteps.push({
              table: [...hashTable],
              phase: 'collision',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `(${hashIdx} + ${probeStep + 1}) mod ${size} = ${(hashIdx + probeStep + 1) % size}`,
              targetSlot: index,
              probedSlots: [...probedSlots],
              collisionSlots: [...collisionSlots],
              insertedIndex: -1,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] occupied by ${hashTable[index]}. Linear probe → try slot [${(index + 1) % size}].`
            });
            probeStep++;
            index = (hashIdx + probeStep) % size;
            probedSlots.push(index);
          }
          if (hashTable[index] === null) {
            hashTable[index] = key;
            insertedCount++;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'insert',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `Final position: slot [${index}]`,
              targetSlot: index,
              probedSlots,
              collisionSlots,
              insertedIndex: index,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] is empty. Inserted key ${key} at index ${index}.${probeStep > 0 ? ` (${probeStep} collision${probeStep > 1 ? 's' : ''})` : ''}`
            });
          }
        } else if (algorithm.id === 'quadraticProbing') {
          let i = 0;
          while (hashTable[index] !== null && i < size) {
            collisionSlots.push(index);
            i++;
            const nextIdx = (hashIdx + i * i) % size;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'collision',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `(${hashIdx} + ${i}²) mod ${size} = (${hashIdx} + ${i*i}) mod ${size} = ${nextIdx}`,
              targetSlot: index,
              probedSlots: [...probedSlots],
              collisionSlots: [...collisionSlots],
              insertedIndex: -1,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] occupied by ${hashTable[index]}. Quadratic probe i=${i}: → slot [${nextIdx}].`
            });
            index = nextIdx;
            probedSlots.push(index);
          }
          if (hashTable[index] === null) {
            hashTable[index] = key;
            insertedCount++;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'insert',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `Final position: slot [${index}]`,
              targetSlot: index,
              probedSlots,
              collisionSlots,
              insertedIndex: index,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] is empty. Inserted key ${key} at index ${index}.${i > 0 ? ` (${i} collision${i > 1 ? 's' : ''})` : ''}`
            });
          }
        } else if (algorithm.id === 'doubleHashing') {
          const step = h2(key);
          while (hashTable[index] !== null && probeStep < size) {
            collisionSlots.push(index);
            probeStep++;
            const nextIdx = (hashIdx + probeStep * step) % size;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'collision',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `(h1(${key}) + ${probeStep}×h2(${key})) mod ${size} = (${hashIdx} + ${probeStep}×${step}) mod ${size} = ${nextIdx}`,
              targetSlot: index,
              probedSlots: [...probedSlots],
              collisionSlots: [...collisionSlots],
              insertedIndex: -1,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] occupied. Double hash step=${step}, probe ${probeStep}: → slot [${nextIdx}].`
            });
            index = nextIdx;
            probedSlots.push(index);
          }
          if (hashTable[index] === null) {
            hashTable[index] = key;
            insertedCount++;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'insert',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `h1(k)=${hashIdx}, h2(k)=${step}. Final: slot [${index}]`,
              targetSlot: index,
              probedSlots,
              collisionSlots,
              insertedIndex: index,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] is empty. Inserted key ${key} at index ${index}. h1=${hashIdx}, h2=${step}.`
            });
          }
        } else if (algorithm.id === 'randomProbing') {
          const rngSeeds = [3, 7, 1, 5, 9, 2, 8, 4, 6, 0];
          while (hashTable[index] !== null && probeStep < size) {
            collisionSlots.push(index);
            const nextIdx = (hashIdx + rngSeeds[probeStep % rngSeeds.length]) % size;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'collision',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `pseudo-random offset ${rngSeeds[probeStep % rngSeeds.length]} → slot [${nextIdx}]`,
              targetSlot: index,
              probedSlots: [...probedSlots],
              collisionSlots: [...collisionSlots],
              insertedIndex: -1,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] occupied. Random probe with offset ${rngSeeds[probeStep % rngSeeds.length]} → slot [${nextIdx}].`
            });
            probeStep++;
            index = nextIdx;
            probedSlots.push(index);
          }
          if (hashTable[index] === null) {
            hashTable[index] = key;
            insertedCount++;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'insert',
              tableSize: size,
              currentKey: key,
              computedHash: hashIdx,
              probeFormula: `Final position: slot [${index}]`,
              targetSlot: index,
              probedSlots,
              collisionSlots,
              insertedIndex: index,
              loadFactor: insertedCount / size,
              insertedCount,
              message: `Slot [${index}] is empty. Inserted key ${key} at index ${index}.`
            });
          }
        } else if (algorithm.id === 'rehashing') {
          const currentLoadFactor = (insertedCount + 1) / size;
          if (currentLoadFactor > 0.7 && insertedCount > 0) {
            const newSize = size * 2;
            const newTable = new Array(newSize).fill(null);
            for (let i = 0; i < hashTable.length; i++) {
              if (hashTable[i] !== null) {
                let ni = hashTable[i] % newSize;
                while (newTable[ni] !== null) ni = (ni + 1) % newSize;
                newTable[ni] = hashTable[i];
              }
            }
            hashTable = newTable;
            let ni = key % newSize;
            while (hashTable[ni] !== null) ni = (ni + 1) % newSize;
            hashTable[ni] = key;
            insertedCount++;
            generatedSteps.push({
              table: [...hashTable],
              phase: 'rehash',
              tableSize: newSize,
              currentKey: key,
              computedHash: key % newSize,
              probeFormula: `New size: ${newSize}. h(${key}) = ${key} mod ${newSize} = ${key % newSize}`,
              targetSlot: ni,
              probedSlots: [],
              collisionSlots: [],
              insertedIndex: ni,
              loadFactor: insertedCount / newSize,
              insertedCount,
              message: `Load factor exceeded 0.7 → Rehashing! New table size: ${newSize}. All keys rehashed. Key ${key} inserted at [${ni}].`
            });
          } else {
            while (hashTable[index] !== null && probeStep < size) {
              collisionSlots.push(index);
              probeStep++;
              index = (hashIdx + probeStep) % size;
              probedSlots.push(index);
            }
            if (hashTable[index] === null) {
              hashTable[index] = key;
              insertedCount++;
              generatedSteps.push({
                table: [...hashTable],
                phase: 'insert',
                tableSize: size,
                currentKey: key,
                computedHash: hashIdx,
                probeFormula: `h(${key}) = ${key} mod ${size} = ${hashIdx}. Load: ${(insertedCount / size * 100).toFixed(0)}%`,
                targetSlot: index,
                probedSlots,
                collisionSlots,
                insertedIndex: index,
                loadFactor: insertedCount / size,
                insertedCount,
                message: `Key ${key} inserted at slot [${index}]. Load factor: ${(insertedCount / size).toFixed(2)}.`
              });
            }
          }
        }
      });

      generatedSteps.push({
        table: [...hashTable],
        phase: 'complete',
        tableSize: hashTable.length,
        currentKey: null,
        computedHash: null,
        probeFormula: null,
        probedSlots: [],
        collisionSlots: [],
        insertedIndex: -1,
        loadFactor: insertedCount / hashTable.length,
        insertedCount,
        message: `Hash table complete! ${insertedCount} keys inserted. Load factor: ${(insertedCount / hashTable.length).toFixed(2)}.`
      });

      return generatedSteps;
    }
    
    return generatedSteps;
  };
  
  const handlePlay = () => {
    if (steps.length === 0 || stepIdx >= steps.length - 1) {
       const newSteps = generateSteps();
       setSteps(newSteps);
       setStepIdx(0);
       setIsPlaying(true);
    } else {
       setIsPlaying(true);
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && steps.length > 0) {
      let speed = 1200; // Default speed
      if (algorithm.type === "StringMatching") speed = 800;
      if (algorithm.type === "Hashing") speed = 1000;
      if (algorithm.id === 'mergeSort' || algorithm.id === 'quickSort') speed = 1000; // Slightly faster for complex visualizations
      
      timer = setInterval(() => {
        setStepIdx(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps, algorithm]);

  const handleStop = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setStepIdx(0);
    setSteps([]);
  };

  // Data structure specific actions
  const handleDsAction = (action) => {
     if (action === 'push' || action === 'enqueue' || action === 'append') {
       if (!dsInput) return;
       setDsItems([...dsItems, { id: Date.now(), val: dsInput }]);
       setDsInput('');
     } else if (action === 'prepend') {
       if (!dsInput) return;
       setDsItems([{ id: Date.now(), val: dsInput }, ...dsItems]);
       setDsInput('');
     } else if (action === 'pop') {
       setDsItems(dsItems.slice(0, -1));
     } else if (action === 'dequeue' || action === 'deleteHead') {
       setDsItems(dsItems.slice(1));
     }
  };

  if (!algorithm) return null;

  const currentStep = steps.length > 0 ? steps[stepIdx] : null;

  const renderSearching = () => {
    const renderArr = currentStep ? currentStep.array : parseArray();
    return (
      <div className="flex flex-col items-center w-full">
        <div className="h-12 mb-6 flex items-center justify-center text-cyan-400 font-medium bg-cyan-950/50 px-6 py-2 rounded-full border border-cyan-800/50 text-sm md:text-base">
           {currentStep ? currentStep.message : "Press Play to trace algorithm."}
        </div>
        <div className="flex flex-wrap justify-center items-end gap-2 md:gap-4 w-full">
          {renderArr.map((val, idx) => {
            let bgColor = "bg-gray-800 border-gray-700";
            let shadowClass = "";
            
            if (currentStep) {
              if (currentStep.foundIdx === idx) {
                bgColor = "bg-emerald-500 border-emerald-400";
                shadowClass = "shadow-[0_0_20px_#10b981]";
              } else if (currentStep.activeIdx === idx) {
                bgColor = "bg-cyan-500 border-cyan-400";
                shadowClass = "shadow-[0_0_15px_#06b6d4]";
              } else if (algorithm.id === 'binarySearch' && currentStep.l !== undefined) {
                if (idx >= currentStep.l && idx <= currentStep.r) {
                  bgColor = "bg-blue-700 border-blue-600 opacity-70";
                } else {
                  bgColor = "bg-gray-900 border-gray-800 opacity-30";
                }
              }
            }

            return (
              <motion.div 
                key={`${idx}-${val}`} 
                layout
                className={`w-12 h-14 md:w-16 md:h-16 flex flex-col items-center justify-center rounded-xl border-2 text-white font-bold transition-all duration-300 ${bgColor} ${shadowClass}`}
              >
                <span>{val}</span>
                <span className="text-[10px] text-gray-400 mt-1 font-mono">[{idx}]</span>
              </motion.div>
            )
          })}
        </div>
        
        {/* Search space indicator for Binary Search */}
        {currentStep && algorithm.id === 'binarySearch' && currentStep.l !== undefined && (
          <div className="mt-6 bg-blue-950/50 border border-blue-800 rounded-lg p-3 text-xs md:text-sm text-blue-300 max-w-md">
            <div className="font-semibold mb-2">Search Space: [{currentStep.l} - {currentStep.r}]</div>
            <div>Mid Index: {currentStep.activeIdx} → Value: {renderArr[currentStep.activeIdx]}</div>
          </div>
        )}
      </div>
    );
  };

  const renderSorting = () => {
    const renderArr = currentStep ? currentStep.array : parseArray();
    const maxVal = Math.max(...renderArr, 100);
    
    return (
      <div className="flex flex-col items-center w-full h-full">
         <div className="h-12 flex items-center justify-center text-cyan-400 font-medium bg-cyan-950/50 px-6 py-2 rounded-full border border-cyan-800/50 mb-10 w-full text-center text-sm md:text-base">
           {currentStep ? currentStep.message : "Press Play to trace sorting."}
        </div>
        <div className="flex justify-center items-end h-48 gap-2 w-full max-w-2xl px-4 border-b-2 border-gray-800 pb-2">
          <AnimatePresence>
            {renderArr.map((h, idx) => {
              let barColor = "bg-cyan-600";
              let shadowClass = "";

              if (currentStep) {
                const phase = currentStep.phase || "start";
                
                // Sorted portion (shown in green for insertion/selection sort)
                if (currentStep.sortedUpto !== undefined && idx <= currentStep.sortedUpto) {
                  barColor = "bg-emerald-500";
                  shadowClass = "shadow-[0_0_15px_#10b981]";
                }
                // Phase-based coloring for merge sort and quick sort
                else if (phase === "divided" || phase === "dividing") {
                  barColor = currentStep.highlightIdx?.includes(idx) ? "bg-purple-500 shadow-[0_0_15px_#a855f7]" : "bg-cyan-600";
                }
                else if (phase === "merging" || phase === "comparing") {
                  if (currentStep.highlightIdx?.includes(idx)) {
                    barColor = "bg-yellow-400 shadow-[0_0_15px_#facc15]";
                  } else if (currentStep.compareIdx?.includes(idx)) {
                    barColor = "bg-pink-500 shadow-[0_0_15px_#ec4899]";
                  }
                }
                else if (phase === "merged") {
                  if (currentStep.highlightIdx?.includes(idx)) {
                    barColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]";
                  }
                }
                else if (phase === "pivoting") {
                  barColor = currentStep.highlightIdx?.includes(idx) ? "bg-red-500 shadow-[0_0_15px_#ef4444]" : "bg-cyan-600";
                }
                else if (phase === "partitioning" || phase === "partitioned") {
                  if (currentStep.highlightIdx?.includes(idx)) {
                    barColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]";
                  } else if (currentStep.compareIdx?.includes(idx)) {
                    barColor = "bg-pink-500 shadow-[0_0_15px_#ec4899]";
                  }
                }
                else if (phase === "selecting" || phase === "searching") {
                  barColor = currentStep.activeIdx === idx ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee]" : "bg-cyan-600";
                }
                else if (phase === "shifting" || phase === "inserted") {
                  if (currentStep.compareIdx?.includes(idx)) {
                    barColor = "bg-pink-500 shadow-[0_0_15px_#ec4899]";
                  } else if (currentStep.activeIdx === idx) {
                    barColor = "bg-yellow-400 shadow-[0_0_15px_#facc15]";
                  }
                }
                else if (phase === "complete") {
                  barColor = "bg-emerald-500 shadow-[0_0_15px_#10b981]";
                }
                else if (currentStep.activeIdx === idx) {
                  barColor = "bg-amber-400 shadow-[0_0_15px_#fbbf24]";
                } else if (currentStep.compareIdx?.includes(idx)) {
                  barColor = "bg-pink-500 shadow-[0_0_15px_#ec4899]";
                } else if (currentStep.highlightIdx?.includes(idx)) {
                  barColor = "bg-yellow-400 shadow-[0_0_15px_#facc15]";
                }
              }
              
              const heightPercent = Math.max((h / maxVal) * 100, 10);
              
              return (
                <motion.div 
                  key={`${h}-${idx}`} 
                  className={`w-8 rounded-t-md relative flex flex-col justify-end items-center pb-2 transition-all duration-300 ${barColor} ${shadowClass}`}
                  style={{ height: `${heightPercent}%` }}
                  layout transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <span className="text-white text-xs font-bold absolute -top-6 bg-gray-900 border border-gray-700 px-1.5 rounded">{h}</span>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Algorithm phase legend */}
        {currentStep && (
          <div className="mt-6 flex flex-wrap gap-3 justify-center text-xs px-4">
            {(algorithm.id === 'mergeSort') && (
              <>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-purple-500 rounded"></div>Dividing</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded"></div>Comparing</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded"></div>Merged</span>
              </>
            )}
            {(algorithm.id === 'quickSort') && (
              <>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded"></div>Pivot</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-pink-500 rounded"></div>Comparing</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded"></div>Partitioned</span>
              </>
            )}
            {(algorithm.id === 'insertionSort' || algorithm.id === 'selectionSort') && (
              <>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-emerald-500 rounded"></div>Sorted</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-cyan-400 rounded"></div>Current</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-pink-500 rounded"></div>Comparing</span>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderStringMatching = () => {
    const tChars = textInput.split('');
    const pChars = patternInput.split('');
    
    return (
       <div className="flex flex-col items-center w-full overflow-x-auto pb-4">
         <div className="h-12 mb-8 flex items-center justify-center text-cyan-400 font-medium bg-cyan-950/50 px-6 py-2 rounded-full border border-cyan-800/50 text-sm md:text-base">
           {currentStep ? currentStep.message : "Press Play to trace pattern matching."}
        </div>
        
        {/* Text */}
        <div className="flex gap-1 mb-4">
          {tChars.map((char, idx) => {
            let bgColor = "bg-gray-800 border-gray-700";
            if (currentStep) {
               if (currentStep.matchStatus === 'found' && idx >= currentStep.shift && idx < currentStep.shift + pChars.length) {
                 bgColor = "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_#10b981]";
               } else if (currentStep.compIdx === idx) {
                 bgColor = currentStep.matchStatus === 'mismatch' ? "bg-red-500 border-red-400 shadow-[0_0_15px_#ef4444]" : "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_#06b6d4]";
               } else if (idx >= currentStep.shift && idx < currentStep.compIdx) {
                 bgColor = "bg-emerald-500 border-emerald-400 opacity-60";
               }
            }
            return (
              <div key={`t-${idx}`} className={`w-8 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded border-2 text-white font-bold transition-all ${bgColor}`}>
                {char}
              </div>
            )
          })}
        </div>
        
        {/* Pattern */}
        <div className="flex gap-1">
          {pChars.map((char, idx) => {
             let bgColor = "bg-gray-700 border-gray-600";
             if (currentStep && currentStep.matchStatus !== 'found') {
                if (currentStep.pattIdx === idx) {
                  bgColor = currentStep.matchStatus === 'mismatch' ? "bg-red-500 border-red-400 shadow-[0_0_15px_#ef4444]" : "bg-cyan-500 border-cyan-400 shadow-[0_0_15px_#06b6d4]";
                } else if (idx < currentStep.pattIdx) {
                  bgColor = "bg-emerald-500 border-emerald-400 opacity-60";
                }
             } else if (currentStep?.matchStatus === 'found') {
                bgColor = "bg-emerald-500 border-emerald-400";
             }
             return (
               <div key={`p-${idx}`} className={`w-8 h-10 md:w-10 md:h-12 flex flex-col items-center justify-center rounded border-2 text-gray-200 font-bold transition-all ${bgColor}`}>
                {char}
               </div>
             )
          })}
        </div>

        {currentStep && currentStep.shift >= 0 && (
          <div className="mt-5 rounded-xl border border-gray-800 bg-gray-900/70 px-4 py-3 text-sm text-gray-300">
            Comparing pattern against text window starting at index <span className="font-mono text-cyan-300">{currentStep.shift}</span>
          </div>
        )}
       </div>
    );
  };

  const renderDataStructure = () => {
     return (
       <div className="flex flex-col items-center w-full justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 shadow-xl w-full max-w-xl">
             
             {/* DS Controls */}
             <div className="flex flex-wrap items-center gap-3 mb-8">
               <input 
                 type="text" 
                 value={dsInput}
                 onChange={(e)=>setDsInput(e.target.value)}
                 className="flex-1 min-w-[150px] bg-gray-800 border border-gray-600 text-white rounded-xl py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 outline-none"
                 placeholder="Enter a value..."
               />
               
               {algorithm.id === 'stackDS' && (
                 <>
                   <button onClick={()=>handleDsAction('push')} className="bg-cyan-600 hover:bg-cyan-500 p-2.5 rounded-xl text-white font-bold tracking-wide flex items-center gap-2"><Plus className="w-4 h-4"/> Push</button>
                   <button onClick={()=>handleDsAction('pop')} className="bg-amber-600 hover:bg-amber-500 p-2.5 rounded-xl text-white font-bold tracking-wide flex items-center gap-2"><Minus className="w-4 h-4"/> Pop</button>
                 </>
               )}
               {algorithm.id === 'queueDS' && (
                 <>
                   <button onClick={()=>handleDsAction('enqueue')} className="bg-cyan-600 hover:bg-cyan-500 p-2.5 px-4 rounded-xl text-white font-bold tracking-wide">Enqueue</button>
                   <button onClick={()=>handleDsAction('dequeue')} className="bg-amber-600 hover:bg-amber-500 p-2.5 px-4 rounded-xl text-white font-bold tracking-wide">Dequeue</button>
                 </>
               )}
               {algorithm.id === 'linkedListDS' && (
                 <>
                   <button onClick={()=>handleDsAction('append')} className="bg-cyan-600 hover:bg-cyan-500 p-2.5 px-4 rounded-xl text-white font-bold tracking-wide text-sm">Append</button>
                   <button onClick={()=>handleDsAction('deleteHead')} className="bg-amber-600 hover:bg-amber-500 p-2.5 px-4 rounded-xl text-white font-bold tracking-wide text-sm">Del Head</button>
                 </>
               )}
             </div>

             {/* Rendering the DS internally */}
             <div className="min-h-[16rem] w-full bg-black/40 rounded-xl p-6 flex items-center justify-center border border-gray-800 overflow-x-auto relative">
                {dsItems.length === 0 && (
                  <span className="text-gray-500 italic">
                    {algorithm.id === 'stackDS' && "Stack is empty."}
                    {algorithm.id === 'queueDS' && "Queue is empty."}
                    {algorithm.id === 'linkedListDS' && "Linked List is empty."}
                  </span>
                )}
                
                {algorithm.id === 'stackDS' && (
                   <div className="flex flex-col-reverse gap-2 absolute bottom-6 w-32">
                     <AnimatePresence>
                       {dsItems.map((item, i) => (
                         <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, x: 20 }}
                           className={`h-12 border-2 rounded-lg flex items-center justify-center font-bold text-white shadow-lg ${i === dsItems.length - 1 ? 'bg-cyan-600 border-cyan-400' : 'bg-gray-800 border-gray-600'}`}
                         >
                           {item.val}
                           {i === dsItems.length - 1 && <span className="absolute -right-10 text-xs text-cyan-400 font-mono">TOP</span>}
                         </motion.div>
                       ))}
                     </AnimatePresence>
                   </div>
                )}
                
                {algorithm.id === 'queueDS' && (
                   <div className="flex gap-2 items-center">
                     <AnimatePresence>
                       <span className="text-xs text-cyan-400 font-mono mr-2">FRONT</span>
                       {dsItems.map((item, i) => (
                         <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, scale: 0.8 }}
                           layout
                           className={`min-w-[3rem] h-16 px-4 border-2 rounded-lg flex items-center justify-center font-bold text-white shadow-lg ${i === 0 ? 'bg-amber-600 border-amber-400' : 'bg-gray-800 border-gray-600'}`}
                         >
                           {item.val}
                         </motion.div>
                       ))}
                       <span className="text-xs text-blue-400 font-mono ml-2">REAR</span>
                     </AnimatePresence>
                   </div>
                )}

                {algorithm.id === 'linkedListDS' && (
                   <div className="flex gap-2 items-center">
                     <AnimatePresence>
                       <span className="text-xs text-cyan-400 font-mono mr-2">HEAD</span>
                       {dsItems.map((item, i) => (
                         <motion.div 
                           key={item.id}
                           initial={{ opacity: 0, scale: 0 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0 }}
                           layout
                           className="flex items-center"
                         >
                           <div className="min-w-[4rem] h-12 bg-gray-800 border-2 border-cyan-500 rounded-lg flex shadow-lg overflow-hidden">
                              <div className="flex-1 flex items-center justify-center font-bold text-white px-2">{item.val}</div>
                              <div className="w-4 bg-cyan-900 border-l-2 border-cyan-500 opacity-50"></div>
                           </div>
                           <div className="text-cyan-500 mx-2 font-bold z-0">→</div>
                         </motion.div>
                       ))}
                       {dsItems.length > 0 && <span className="text-gray-500 font-mono">null</span>}
                     </AnimatePresence>
                   </div>
                )}
             </div>
          </div>
       </div>
     )
  };

  const renderGraph = () => {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="h-12 mb-6 flex items-center justify-center text-cyan-400 font-medium bg-cyan-950/50 px-6 py-2 rounded-full border border-cyan-800/50 text-sm md:text-base">
          {currentStep ? currentStep.message : `Press Play to trace ${algorithm.id === 'bfs' ? 'BFS' : algorithm.id === 'dfs' ? 'DFS' : algorithm.id === 'dijkstra' ? "Dijkstra's" : 'Bellman-Ford'}.`}
        </div>

        {/* Graph Visualization */}
        <div className="relative w-full max-w-2xl h-96 bg-gray-950 rounded-xl border border-gray-800 mb-6 flex items-center justify-center overflow-hidden">
          {/* SVG for edges and nodes */}
          <svg className="w-full h-full" viewBox="0 0 400 350" preserveAspectRatio="xMidYMid meet" style={{ pointerEvents: 'auto' }}>
            <defs>
              <style>{`
                .graph-edge { stroke: #4b5563; stroke-width: 2; }
                .graph-node-circle { transition: all 0.3s ease; }
                .graph-node-text { font-weight: bold; font-size: 16px; user-select: none; }
              `}</style>
            </defs>
            
            {/* Edges with weights */}
            <line x1="200" y1="40" x2="100" y2="120" className="graph-edge" />
            <rect x="147" y="58" width="16" height="18" rx="3" fill="#1f2937" opacity="0.9" />
            <text x="155" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" className="pointer-events-none">4</text>
            
            <line x1="200" y1="40" x2="300" y2="120" className="graph-edge" />
            <rect x="247" y="58" width="16" height="18" rx="3" fill="#1f2937" opacity="0.9" />
            <text x="255" y="70" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" className="pointer-events-none">2</text>
            
            <line x1="100" y1="120" x2="40" y2="220" className="graph-edge" />
            <rect x="48" y="153" width="24" height="18" rx="3" fill="#1f2937" opacity="0.9" />
            <text x="60" y="165" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" className="pointer-events-none">5</text>
            
            <line x1="100" y1="120" x2="160" y2="220" className="graph-edge" />
            <rect x="105" y="163" width="30" height="18" rx="3" fill="#1f2937" opacity="0.9" />
            <text x="120" y="175" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" className="pointer-events-none">10</text>
            
            <line x1="300" y1="120" x2="240" y2="220" className="graph-edge" />
            <rect x="267" y="153" width="16" height="18" rx="3" fill="#1f2937" opacity="0.9" />
            <text x="275" y="165" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold" className="pointer-events-none">3</text>
            
            {/* Nodes */}
            {(() => {
              const nodeCoords = {
                '1': { x: 200, y: 40 },
                '2': { x: 100, y: 120 },
                '3': { x: 300, y: 120 },
                '4': { x: 40, y: 220 },
                '5': { x: 160, y: 220 },
                '6': { x: 240, y: 220 }
              };
              
              return Object.entries(nodeCoords).map(([nodeId, coord]) => {
                const isActive = currentStep?.currentNode === nodeId;
                const isVisited = currentStep?.visited?.includes(nodeId);
                const isAdding = currentStep?.addingNode === nodeId;
                
                let nodeColor = "#374151";
                let strokeColor = "#4b5563";
                let glowFilter = "none";
                
                if (isActive) {
                  nodeColor = "#06b6d4";
                  strokeColor = "#00d9ff";
                  glowFilter = "url(#activeGlow)";
                } else if (isAdding) {
                  nodeColor = "#eab308";
                  strokeColor = "#facc15";
                  glowFilter = "url(#addingGlow)";
                } else if (isVisited) {
                  nodeColor = "#10b981";
                  strokeColor = "#34d399";
                  glowFilter = "url(#visitedGlow)";
                }
                
                return (
                  <g key={nodeId}>
                    <circle 
                      cx={coord.x} 
                      cy={coord.y} 
                      r="20" 
                      fill={nodeColor} 
                      stroke={strokeColor}
                      strokeWidth="2"
                      className="graph-node-circle"
                      style={{ filter: glowFilter }}
                    />
                    <text 
                      x={coord.x} 
                      y={coord.y + 6} 
                      textAnchor="middle" 
                      fill="white" 
                      className="graph-node-text"
                    >
                      {nodeId}
                    </text>
                  </g>
                );
              });
            })()}
            
            {/* Glow filters for effects */}
            <defs>
              <filter id="activeGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="visitedGlow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="addingGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Queue/Stack Display */}
        <div className="w-full max-w-2xl">
          {algorithm.id === 'bfs' && currentStep && (
            <div className="bg-blue-950/30 border border-blue-800 rounded-lg p-4 mb-4">
              <div className="text-sm text-blue-300 font-semibold mb-2">Queue (FIFO):</div>
              <div className="flex gap-2 flex-wrap">
                {currentStep.queue?.length > 0 ? (
                  currentStep.queue.map((node, idx) => (
                    <motion.div
                      key={`queue-${idx}`}
                      className="bg-blue-600 border border-blue-400 rounded px-3 py-1 text-white font-bold"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {node}
                    </motion.div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">Queue empty</span>
                )}
              </div>
            </div>
          )}

          {algorithm.id === 'dfs' && currentStep && (
            <div className="bg-purple-950/30 border border-purple-800 rounded-lg p-4 mb-4">
              <div className="text-sm text-purple-300 font-semibold mb-2">Stack (LIFO):</div>
              <div className="flex gap-2 flex-wrap">
                {currentStep.stack?.length > 0 ? (
                  currentStep.stack.map((node, idx) => (
                    <motion.div
                      key={`stack-${idx}`}
                      className="bg-purple-600 border border-purple-400 rounded px-3 py-1 text-white font-bold"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {node}
                    </motion.div>
                  ))
                ) : (
                  <span className="text-gray-500 italic">Stack empty</span>
                )}
              </div>
            </div>
          )}

          {/* Dijkstra Distance Display */}
          {algorithm.id === 'dijkstra' && currentStep && (
            <div className="bg-amber-950/30 border border-amber-800 rounded-lg p-4 mb-4">
              <div className="text-sm text-amber-300 font-semibold mb-2">Shortest Distances from Node 1:</div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(currentStep.distances || {}).map(([node, dist]) => (
                  <motion.div
                    key={`dist-${node}`}
                    className={`rounded px-3 py-2 flex justify-between font-mono text-sm ${
                      node === currentStep.currentNode
                        ? 'bg-amber-600 border border-amber-300'
                        : node === currentStep.relaxedNode
                        ? 'bg-amber-500 border border-amber-200'
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-white font-bold">Node {node}:</span>
                    <span className="text-amber-100">{dist === Infinity ? '∞' : dist}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Bellman-Ford Distance Display */}
          {algorithm.id === 'bellmanFord' && currentStep && (
            <div className="bg-pink-950/30 border border-pink-800 rounded-lg p-4 mb-4">
              <div className="text-sm text-pink-300 font-semibold mb-2">
                Shortest Distances (Iteration {currentStep.iteration || 0}/5):
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(currentStep.distances || {}).map(([node, dist]) => (
                  <motion.div
                    key={`bf-dist-${node}`}
                    className={`rounded px-3 py-2 flex justify-between font-mono text-sm ${
                      node === currentStep.currentNode
                        ? 'bg-pink-600 border border-pink-300'
                        : node === currentStep.relaxedNode
                        ? 'bg-pink-500 border border-pink-200'
                        : 'bg-gray-700 border border-gray-600'
                    }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <span className="text-white font-bold">Node {node}:</span>
                    <span className="text-pink-100">{dist === Infinity ? '∞' : dist}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Path Display for BFS/DFS */}
          {(algorithm.id === 'bfs' || algorithm.id === 'dfs') && currentStep && (
            <div className={`rounded-lg p-4 border ${
              algorithm.id === 'bfs' 
                ? 'bg-blue-950/30 border-blue-800' 
                : 'bg-purple-950/30 border-purple-800'
            }`}>
              <div className={`text-sm font-semibold mb-2 ${
                algorithm.id === 'bfs' 
                  ? 'text-blue-300' 
                  : 'text-purple-300'
              }`}>
                Traversal Path:
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                {currentStep.path && currentStep.path.length > 0 ? (
                  <>
                    {currentStep.path.map((node, idx) => (
                      <div key={`path-${idx}`}>
                        <motion.div
                          className={`rounded px-3 py-1 text-white font-bold ${
                            algorithm.id === 'bfs'
                              ? 'bg-blue-600 border border-blue-400'
                              : 'bg-purple-600 border border-purple-400'
                          }`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          {node}
                        </motion.div>
                        {idx < currentStep.path.length - 1 && (
                          <span className={`mx-2 font-bold ${
                            algorithm.id === 'bfs' 
                              ? 'text-blue-400' 
                              : 'text-purple-400'
                          }`}>→</span>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <span className="text-gray-500 italic">Path will appear as nodes are visited</span>
                )}</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTree = () => {
    const isSearchOperation = ["Find Min", "Find Max", "Find Kth Min", "Find Kth Max"].includes(treeTraversalMode);
    
    if (isSearchOperation) {
      // Render tree search operations
      const nodeValues = { 1: 50, 2: 30, 3: 70, 4: 20, 5: 40, 6: 60, 7: 80 };
      const nodeCoordinates = {
        1: { x: 200, y: 28 },
        2: { x: 110, y: 78 },
        3: { x: 290, y: 78 },
        4: { x: 60, y: 128 },
        5: { x: 160, y: 128 },
        6: { x: 240, y: 128 },
        7: { x: 340, y: 128 }
      };

      return (
        <div className="flex flex-col items-center w-full">
          <div className="h-12 mb-6 flex items-center justify-center text-cyan-400 font-medium bg-cyan-950/50 px-6 py-2 rounded-full border border-cyan-800/50 text-sm md:text-base">
            {currentStep ? currentStep.message : `Press Play to find ${treeTraversalMode.replace("Find", "").toLowerCase()}.`}
          </div>

          {/* Tree Visualization */}
          <div className="relative w-full max-w-xl bg-gray-950 rounded-xl border border-gray-800 p-3 mb-6">
            {/* SVG for tree visualization */}
            <svg viewBox="0 0 400 165" preserveAspectRatio="xMidYMid meet" className="w-full h-56 md:h-64">
              <defs>
                <filter id="activeGlowTree">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Edges */}
              <line x1="200" y1="28" x2="110" y2="78" stroke="#4b5563" strokeWidth="2" />
              <line x1="200" y1="28" x2="290" y2="78" stroke="#4b5563" strokeWidth="2" />
              <line x1="110" y1="78" x2="60" y2="128" stroke="#4b5563" strokeWidth="2" />
              <line x1="110" y1="78" x2="160" y2="128" stroke="#4b5563" strokeWidth="2" />
              <line x1="290" y1="78" x2="240" y2="128" stroke="#4b5563" strokeWidth="2" />
              <line x1="290" y1="78" x2="340" y2="128" stroke="#4b5563" strokeWidth="2" />

              {/* Nodes */}
              {[1, 2, 3, 4, 5, 6, 7].map((nodeId) => {
                let nodeColor = "#374151";
                let strokeColor = "#6b7280";

                if (currentStep) {
                  if (currentStep.activeNode === nodeId) {
                    nodeColor = "#10b981";
                    strokeColor = "#6ee7b7";
                  } else if (currentStep.visited?.includes(nodeId)) {
                    nodeColor = "#06b6d4";
                    strokeColor = "#67e8f9";
                  }
                }

                const coord = nodeCoordinates[nodeId];
                return (
                  <g key={nodeId}>
                    <circle
                      cx={coord.x}
                      cy={coord.y}
                      r="18"
                      fill={nodeColor}
                      stroke={strokeColor}
                      strokeWidth="2"
                      filter={currentStep?.activeNode === nodeId ? "url(#activeGlowTree)" : ""}
                    />
                    <text
                      x={coord.x}
                      y={coord.y + 4}
                      textAnchor="middle"
                      fill="white"
                      fontSize="13"
                      fontWeight="bold"
                    >
                      {nodeId}
                    </text>
                    <text
                      x={coord.x}
                      y={coord.y + 16}
                      textAnchor="middle"
                      fill="#d1d5db"
                      fontSize="9"
                    >
                      {nodeValues[nodeId]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Visited Nodes Info */}
          {currentStep && (
            <div className="w-full max-w-2xl bg-cyan-950/30 border border-cyan-800 rounded-lg p-4">
              <div className="text-sm text-cyan-300 font-semibold mb-2">
                {treeTraversalMode === "Find Min" && "Traversing left to find minimum:"}
                {treeTraversalMode === "Find Max" && "Traversing right to find maximum:"}
                {treeTraversalMode === "Find Kth Min" && `Inorder traversal (counting to ${kthValue}):`}
                {treeTraversalMode === "Find Kth Max" && `Reverse inorder traversal (counting to ${kthValue}):`}
              </div>
              <div className="flex gap-2 flex-wrap">
                {currentStep.visited?.map((nodeId) => (
                  <div
                    key={`visited-${nodeId}`}
                    className="bg-cyan-600 border border-cyan-400 rounded px-3 py-1 text-white font-bold text-sm"
                  >
                    Node {nodeId} ({nodeValues[nodeId]})
                  </div>
                ))}
              </div>

              {currentStep.phase === "found" && currentStep.resultLabel && (
                <div className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-950/40 px-4 py-3 text-sm text-emerald-200">
                  <span className="font-semibold">Result:</span>{' '}
                  {currentStep.resultLabel}: <span className="font-bold text-emerald-300">{currentStep.resultValue}</span>{' '}
                  found at node <span className="font-bold text-emerald-300">{currentStep.resultNode}</span>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="w-full max-w-4xl mx-auto">
        <TreeTraversalVisualizer mode={treeTraversalMode} />
      </div>
    );
  };

  const renderHash = () => {
    const step = currentStep;
    const tableData = step?.table || new Array(parseInt(tableSize) || 10).fill(null);
    const tSize = tableData.length;
    const filledCount = tableData.filter(v => v !== null).length;
    const loadPct = step ? Math.round((step.loadFactor || 0) * 100) : 0;
    const phase = step?.phase;



    return (
      <div className="flex flex-col items-center w-full gap-6">

        {/* Message bar */}
        <div className="w-full flex items-center justify-center">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium ${
            phase === 'insert' ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' :
            phase === 'collision' ? 'bg-red-950/60 border-red-700 text-red-300' :
            phase === 'rehash' ? 'bg-violet-950/60 border-violet-700 text-violet-300' :
            phase === 'complete' ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300' :
            'bg-gray-900 border-gray-700 text-gray-300'
          }`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
              phase === 'insert' ? 'bg-emerald-400' :
              phase === 'collision' ? 'bg-red-400 animate-pulse' :
              phase === 'compute' ? 'bg-amber-400 animate-pulse' :
              phase === 'rehash' ? 'bg-violet-400' :
              'bg-cyan-400'
            }`} />
            {step ? step.message : 'Press Play to trace the hashing algorithm.'}
          </div>
        </div>

        {/* Top info row: Hash Computation + Load Factor */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hash formula panel */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Hash Computation</div>
            {step?.currentKey != null ? (
              <>
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-amber-500/20 border border-amber-500/40 rounded-xl px-4 py-2 text-center">
                    <div className="text-xs text-amber-400 mb-0.5">Key</div>
                    <div className="text-2xl font-black text-amber-300">{step.currentKey}</div>
                  </div>
                  <div className="text-gray-500 text-xl">→</div>
                  <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2">
                    <div className="text-xs text-gray-400 mb-0.5 font-mono">Formula</div>
                    <div className="text-sm font-mono text-cyan-300 break-all">{step.probeFormula}</div>
                  </div>
                </div>
                {step.computedHash != null && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-400">Primary slot:</span>
                    <span className="font-bold text-amber-400 font-mono">[{step.computedHash}]</span>
                    {step.insertedIndex >= 0 && step.insertedIndex !== step.computedHash && (
                      <span className="text-gray-400 ml-2">→ landed at <span className="text-emerald-400 font-bold font-mono">[{step.insertedIndex}]</span></span>
                    )}
                  </div>
                )}
              </>
            ) : (
              <div className="text-gray-600 italic text-sm py-4 text-center">Hash computation will appear here during animation.</div>
            )}
          </div>

          {/* Load factor gauge */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Table Statistics</div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Load Factor</span>
              <span className={`text-lg font-black font-mono ${
                loadPct >= 70 ? 'text-red-400' : loadPct >= 50 ? 'text-amber-400' : 'text-emerald-400'
              }`}>{loadPct}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 mb-3 border border-gray-700 overflow-hidden">
              <motion.div
                className={`h-full rounded-full transition-all ${
                  loadPct >= 70 ? 'bg-gradient-to-r from-red-600 to-red-400' :
                  loadPct >= 50 ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                  'bg-gradient-to-r from-emerald-700 to-emerald-400'
                }`}
                animate={{ width: `${Math.max(loadPct, 2)}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-800 rounded-lg p-2">
                <div className="text-lg font-black text-white">{filledCount}</div>
                <div className="text-xs text-gray-500">Filled</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2">
                <div className="text-lg font-black text-white">{tSize - filledCount}</div>
                <div className="text-xs text-gray-500">Empty</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2">
                <div className="text-lg font-black text-white">{tSize}</div>
                <div className="text-xs text-gray-500">Size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { color: 'bg-amber-500', label: 'Target Slot' },
            { color: 'bg-red-700', label: 'Collision' },
            { color: 'bg-orange-600', label: 'Probed' },
            { color: 'bg-emerald-600', label: 'Inserted' },
            { color: 'bg-blue-700', label: 'Occupied' },
            { color: 'bg-gray-800 border border-gray-600', label: 'Empty' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-gray-400">
              <div className={`w-3 h-3 rounded-sm ${color}`} />
              {label}
            </div>
          ))}
        </div>

        {/* Hash Table — Vertical bucket layout */}
        <div className="w-full flex gap-6 justify-center items-start">
          {[0, 1].map(col => {
            const half = Math.ceil(tSize / 2);
            const start = col === 0 ? 0 : half;
            const end   = col === 0 ? (tSize <= 10 ? tSize : half) : tSize;
            if (tSize <= 10 && col === 1) return null;
            const slice = tableData.slice(start, end);
            return (
              <div key={col} className="flex-1 min-w-0">
                <div className="flex items-center mb-1 gap-2">
                  <div className="w-14 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500">Index</div>
                  <div className="flex-1 text-center text-[10px] font-mono uppercase tracking-widest text-gray-500">Value</div>
                </div>
                <div className="flex flex-col gap-1">
                  {slice.map((value, i) => {
                    const idx = start + i;
                    const isInserted = idx === step?.insertedIndex && (phase === 'insert' || phase === 'rehash');
                    const isCompute  = idx === step?.targetSlot && phase === 'compute';
                    const isCollide  = step?.collisionSlots?.includes(idx);
                    const isProbed   = step?.probedSlots?.includes(idx);

                    const rowBg =
                      isInserted && phase === 'rehash' ? 'border-violet-500 bg-violet-900/40' :
                      isInserted                       ? 'border-emerald-500 bg-emerald-900/40' :
                      isCompute                        ? 'border-amber-400 bg-amber-900/30' :
                      isCollide                        ? 'border-red-500 bg-red-900/40' :
                      isProbed                         ? 'border-orange-400 bg-orange-900/30' :
                      'border-gray-700 bg-gray-800/40';

                    const valBg =
                      isInserted && phase === 'rehash' ? 'bg-violet-600 text-white' :
                      isInserted                       ? 'bg-emerald-600 text-white' :
                      isCompute                        ? 'bg-amber-500 text-black' :
                      isCollide                        ? 'bg-red-700 text-white' :
                      isProbed                         ? 'bg-orange-600 text-white' :
                      value !== null                   ? 'bg-blue-700 text-white' :
                      'bg-gray-800 text-gray-600';

                    return (
                      <motion.div
                        key={`slot-${idx}`}
                        layout
                        animate={{
                          scale: isInserted || isCompute ? 1.03 : 1,
                          x: isCollide ? [-4, 4, -3, 3, 0] : 0,
                        }}
                        transition={{
                          scale: { type: 'spring', stiffness: 400, damping: 20 },
                          x: { duration: 0.3 },
                        }}
                        className={`flex items-stretch rounded-lg border overflow-hidden transition-colors duration-200 ${rowBg}`}
                      >
                        <div className="w-14 flex items-center justify-center bg-gray-900/60 border-r border-gray-700/60 py-2.5">
                          <span className="font-mono text-xs text-gray-400 font-semibold">[{idx}]</span>
                        </div>
                        <div className={`flex-1 flex items-center justify-center py-2.5 ${valBg} transition-colors duration-200`}>
                          <span className="font-bold text-sm font-mono">
                            {value !== null ? value : '—'}
                          </span>
                          {isCompute && (
                            <span className="ml-2 text-[9px] font-mono bg-amber-900/60 text-amber-200 px-1 rounded">h(k)</span>
                          )}
                          {isInserted && (
                            <span className="ml-2 text-[10px]">✓</span>
                          )}
                          {isCollide && (
                            <span className="ml-2 text-[10px]">✗</span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Collision probe trail */}
        {(step?.collisionSlots?.length > 0 || step?.probedSlots?.length > 0) && (
          <div className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">Probe Trail for Key {step.currentKey}</div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 rounded-lg px-3 py-1.5">
                <span className="text-xs text-amber-400 font-mono">h({step.currentKey})=[{step.computedHash}]</span>
              </div>
              {step.collisionSlots?.map((slot, i) => (
                <>
                  <span key={`arrow-${i}`} className="text-red-500 font-bold">→</span>
                  <div key={`col-${i}`} className="flex items-center gap-1.5 bg-red-700/30 border border-red-600/60 rounded-lg px-3 py-1.5">
                    <span className="text-xs text-red-300 font-mono">[{slot}] ✗</span>
                  </div>
                </>
              ))}
              {step.insertedIndex >= 0 && (
                <>
                  <span className="text-emerald-500 font-bold">→</span>
                  <div className="flex items-center gap-1.5 bg-emerald-600/30 border border-emerald-500/60 rounded-lg px-3 py-1.5">
                    <span className="text-xs text-emerald-300 font-mono">[{step.insertedIndex}] ✓</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Determine if it is a generic trace algorithm or a Data Structure
  const isRunnableAlgo = algorithm.type !== "DataStructure" && algorithm.id !== "treeTraversal";
  const isDataStructure = algorithm.type === "DataStructure";
  const isConfigurable = algorithm.type === "Searching" || algorithm.type === "Sorting" || algorithm.type === "StringMatching" || algorithm.type === "Tree" || algorithm.type === "Graph" || algorithm.type === "Hashing";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-5xl mx-auto py-8 px-4"
    >
       <div className="bg-gray-900 border border-gray-700/50 rounded-3xl overflow-hidden relative shadow-2xl">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b border-gray-800">
           <h3 className="text-2xl font-bold text-white mb-4 md:mb-0">
             {isDataStructure ? "Interactive Data Structure" : "Algorithm Tracing Output"}
           </h3>
           
           {isConfigurable && (
             <button 
                onClick={() => setShowConfig(!showConfig)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-sm font-semibold transition-all ${
                  showConfig ? 'bg-gray-800 border-gray-600 text-white' : 'border-gray-700 text-gray-400 hover:text-white'
                }`}
             >
               <Settings2 className="w-4 h-4" />
               Configure Data Input
             </button>
           )}
        </div>
        
        <AnimatePresence>
          {showConfig && isConfigurable && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-gray-950 border-b border-gray-800 overflow-hidden"
            >
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {(algorithm.type === "Searching" || algorithm.type === "Sorting") && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Input Array (comma separated)</label>
                      <input 
                        type="text" 
                        value={arrayInput}
                        onChange={(e) => setArrayInput(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                    {algorithm.type === "Searching" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Target Element</label>
                        <input 
                          type="number" 
                          value={targetInput}
                          onChange={(e) => setTargetInput(e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    )}
                  </>
                )}

                {algorithm.type === "StringMatching" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Source Text</label>
                      <input 
                        type="text" 
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Pattern to Match</label>
                      <input 
                        type="text" 
                        value={patternInput}
                        onChange={(e) => setPatternInput(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </>
                )}

                {algorithm.type === "Tree" && (
                  <>
                    <div className="col-span-1 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Operation</label>
                      <select 
                        value={treeTraversalMode}
                        onChange={(e) => {
                          setTreeTraversalMode(e.target.value);
                          handleReset();
                        }}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                      >
                        <optgroup label="Traversals">
                          <option value="Preorder">Preorder (Root, Left, Right)</option>
                          <option value="Inorder">Inorder (Left, Root, Right)</option>
                          <option value="Postorder">Postorder (Left, Right, Root)</option>
                          <option value="Breadth-First">Breadth-First (Level Order)</option>
                        </optgroup>
                        <optgroup label="Search Operations">
                          <option value="Find Min">Find Minimum</option>
                          <option value="Find Max">Find Maximum</option>
                          <option value="Find Kth Min">Find Kth Minimum</option>
                          <option value="Find Kth Max">Find Kth Maximum</option>
                        </optgroup>
                      </select>
                    </div>
                    
                    {(treeTraversalMode === "Find Kth Min" || treeTraversalMode === "Find Kth Max") && (
                      <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-2">K Value</label>
                        <input 
                          type="number" 
                          value={kthValue}
                          onChange={(e) => setKthValue(e.target.value)}
                          min="1"
                          max="7"
                          className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        />
                      </div>
                    )}
                  </>
                )}

                {algorithm.type === "Graph" && (
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Starting Node</label>
                    <select 
                      value={graphStartNode}
                      onChange={(e) => {
                        setGraphStartNode(e.target.value);
                        handleReset();
                      }}
                      className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                    >
                      <option value="1">Node 1</option>
                      <option value="2">Node 2</option>
                      <option value="3">Node 3</option>
                      <option value="4">Node 4</option>
                      <option value="5">Node 5</option>
                      <option value="6">Node 6</option>
                    </select>
                  </div>
                )}

                {algorithm.type === "Hashing" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Keys to Insert (comma separated)</label>
                      <input 
                        type="text" 
                        value={hashInput}
                        onChange={(e) => setHashInput(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        placeholder="45, 23, 67, 12, 89, 34"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Hash Table Size</label>
                      <input 
                        type="number" 
                        value={tableSize}
                        onChange={(e) => setTableSize(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-700 text-white rounded-lg py-2.5 px-4 focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none"
                        min="5"
                        max="20"
                      />
                    </div>
                  </>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-[#0b0e14] p-4 md:p-6 lg:p-10 min-h-[22rem] flex flex-col justify-center overflow-hidden">
          {algorithm.type === "Searching" && renderSearching()}
          {algorithm.type === "Sorting" && renderSorting()}
          {algorithm.type === "StringMatching" && renderStringMatching()}
          {algorithm.type === "DataStructure" && renderDataStructure()}
          {algorithm.type === "Graph" && renderGraph()}
          {algorithm.type === "Tree" && renderTree()}
          {algorithm.type === "Hashing" && renderHash()}
        </div>
        
        {/* Only show Play/Pause controls for trace algorithms */}
        {isRunnableAlgo && (
          <div className="p-6 bg-gray-900 border-t border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={isPlaying ? handleStop : handlePlay}
                disabled={steps.length > 0 && stepIdx >= steps.length - 1 && !isPlaying}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-semibold transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(8,145,178,0.4)] hover:shadow-[0_0_25px_rgba(8,145,178,0.6)] focus:outline-none"
              >
                {isPlaying ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                {isPlaying ? 'Pause' : steps.length > 0 && stepIdx >= steps.length - 1 ? 'Replay' : 'Play Simulation'}
              </button>
              <button 
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 text-white rounded-full font-semibold transition-all focus:outline-none"
                title="Reset"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            
            {steps.length > 0 && (
              <div className="text-gray-400 font-mono text-sm">
                Step {stepIdx + 1} / {steps.length}
              </div>
            )}
          </div>
        )}
       </div>
    </motion.div>
  );
};

export default Visualizer;
