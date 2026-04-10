export const algorithms = {
  binarySearch: {
    id: "binarySearch",
    name: "Binary Search",
    type: "Searching",
    condition: "Data is sorted",
    complexity: { time: "O(log n)", space: "O(1)", timeVal: 2, spaceVal: 1 },
    explanation: "Binary search repeatedly divides the search interval in half. It is highly efficient for sorted arrays.",
    alternatives: ["Linear Search (if unsorted)"],
    code: `int binarySearch(vector<int>& arr, int target) {
  int left = 0, right = arr.size() - 1;
  while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target)  left = mid + 1;
    else                    right = mid - 1;
  }
  return -1; // Not found
}`
  },
  linearSearch: {
    id: "linearSearch",
    name: "Linear Search",
    type: "Searching",
    condition: "Data is unsorted",
    complexity: { time: "O(n)", space: "O(1)", timeVal: 3, spaceVal: 1 },
    explanation: "Linear search checks every element one by one until the target is found. Useful primarily when data is unsorted and small.",
    alternatives: ["Binary Search (if sorted)"],
    code: `int linearSearch(vector<int>& arr, int target) {
  for (int i = 0; i < arr.size(); i++) {
    if (arr[i] == target) return i;
  }
  return -1; // Not found
}`
  },
  quickSort: {
    id: "quickSort",
    name: "Quick Sort",
    type: "Sorting",
    condition: "Large dataset, average case",
    complexity: { time: "O(n log n)", space: "O(log n)", timeVal: 4, spaceVal: 2 },
    explanation: "Quick sort is a divide-and-conquer strategy that selects a pivot and partitions the array into two sub-arrays. Excellent for large general-purpose datasets.",
    alternatives: ["Merge Sort (stable)", "Insertion Sort (small arrays)"],
    code: `int partition(vector<int>& arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);
  return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}`
  },
  mergeSort: {
    id: "mergeSort",
    name: "Merge Sort",
    type: "Sorting",
    condition: "Stable sort for large datasets",
    complexity: { time: "O(n log n)", space: "O(n)", timeVal: 4, spaceVal: 3 },
    explanation: "Divides the array into halves, recursively sorts them, and merges them. Requires extra space but guarantees O(n log n) stable sorting.",
    alternatives: ["Quick Sort", "Heap Sort"],
    code: `void merge(vector<int>& arr, int l, int m, int r) {
  vector<int> left(arr.begin()+l, arr.begin()+m+1);
  vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
  int i = 0, j = 0, k = l;
  while (i < left.size() && j < right.size())
    arr[k++] = (left[i] <= right[j]) ? left[i++] : right[j++];
  while (i < left.size())  arr[k++] = left[i++];
  while (j < right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
  if (l >= r) return;
  int m = l + (r - l) / 2;
  mergeSort(arr, l, m);
  mergeSort(arr, m + 1, r);
  merge(arr, l, m, r);
}`
  },
  insertionSort: {
    id: "insertionSort",
    name: "Insertion Sort",
    type: "Sorting",
    condition: "Small or nearly sorted dataset",
    complexity: { time: "O(n²)", space: "O(1)", timeVal: 5, spaceVal: 1 },
    explanation: "Builds the sorted array one item at a time. Very efficient for small or already partially sorted datasets.",
    alternatives: ["Quick Sort", "Merge Sort"],
    code: `void insertionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}`
  },
  selectionSort: {
    id: "selectionSort",
    name: "Selection Sort",
    type: "Sorting",
    condition: "Minimal memory writes needed",
    complexity: { time: "O(n²)", space: "O(1)", timeVal: 5, spaceVal: 1 },
    explanation: "Repeatedly selects the minimum element from the unsorted portion and moves it to the sorted portion. Useful when memory write is a costly operation.",
    alternatives: ["Insertion Sort"],
    code: `void selectionSort(vector<int>& arr) {
  int n = arr.size();
  for (int i = 0; i < n - 1; i++) {
    int minIdx = i;
    for (int j = i + 1; j < n; j++)
      if (arr[j] < arr[minIdx]) minIdx = j;
    swap(arr[i], arr[minIdx]);
  }
}`
  },
  bfs: {
    id: "bfs",
    name: "Breadth-First Search (BFS)",
    type: "Graph",
    condition: "Shortest unweighted path",
    complexity: { time: "O(V + E)", space: "O(V)", timeVal: 3.5, spaceVal: 3 },
    explanation: "Explores all neighbors at the present depth prior to moving on to the nodes at the next depth level.",
    alternatives: ["DFS (for deep paths)", "Dijkstra (weighted)"],
    code: `void bfs(vector<vector<int>>& graph, int start) {
  int V = graph.size();
  vector<bool> visited(V, false);
  queue<int> q;

  visited[start] = true;
  q.push(start);

  while (!q.empty()) {
    int node = q.front(); q.pop();
    cout << node << " ";
    for (int neighbor : graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        q.push(neighbor);
      }
    }
  }
}`
  },
  dfs: {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    type: 'Graph',
    condition: 'Exploring all paths / topological sort',
    complexity: { time: 'O(V + E)', space: 'O(V)', timeVal: 3.5, spaceVal: 3 },
    explanation: 'Explores as far as possible along each branch before backtracking.',
    alternatives: ['BFS (for shortest unweighted path)'],
    code: `void dfs(vector<vector<int>>& graph,
         int node, vector<bool>& visited) {
  if (visited[node]) return;
  visited[node] = true;
  cout << node << " ";
  for (int neighbor : graph[node])
    dfs(graph, neighbor, visited);
}`
  },
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    type: 'Graph',
    condition: 'Shortest path in positive weighted graph',
    complexity: { time: 'O((V + E) log V)', space: 'O(V)', timeVal: 4.5, spaceVal: 3 },
    explanation: 'Finds the shortest paths between nodes in a graph with positive edge weights.',
    alternatives: ['BFS (unweighted)', 'Bellman-Ford (negative weights)'],
    code: `vector<int> dijkstra(vector<vector<pair<int,int>>>& graph,
                      int src, int V) {
  vector<int> dist(V, INT_MAX);
  priority_queue<pair<int,int>,
    vector<pair<int,int>>, greater<>> pq;

  dist[src] = 0;
  pq.push({0, src});

  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [w, v] : graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`
  },
  bellmanFord: {
    id: 'bellmanFord',
    name: "Bellman-Ford",
    type: 'Graph',
    condition: 'Shortest path with negative weights',
    complexity: { time: 'O(V * E)', space: 'O(V)', timeVal: 4.8, spaceVal: 3 },
    explanation: 'Computes shortest paths from a source to all vertices. Unlike Dijkstra, it handles negative weight edges safely.',
    alternatives: ['Dijkstra (if positive weights)'],
    code: `struct Edge { int u, v, weight; };

vector<int> bellmanFord(vector<Edge>& edges,
                        int V, int src) {
  vector<int> dist(V, INT_MAX);
  dist[src] = 0;

  for (int i = 0; i < V - 1; i++) {
    for (auto& e : edges) {
      if (dist[e.u] != INT_MAX &&
          dist[e.u] + e.weight < dist[e.v])
        dist[e.v] = dist[e.u] + e.weight;
    }
  }
  return dist;
}`
  },
  naiveStringMatch: {
    id: "naiveStringMatch",
    name: "Naive String Match",
    type: "StringMatching",
    condition: "Short text, straightforward match",
    complexity: { time: "O(n*m)", space: "O(1)", timeVal: 5, spaceVal: 1 },
    explanation: "Checks for the presence of a pattern by sliding over the text one character at a time.",
    alternatives: ["KMP", "Rabin-Karp"],
    code: `int naiveSearch(const string& text,
                const string& pattern) {
  int n = text.size(), m = pattern.size();
  for (int i = 0; i <= n - m; i++) {
    int j = 0;
    while (j < m && text[i + j] == pattern[j]) j++;
    if (j == m) return i; // Match at index i
  }
  return -1;
}`
  },
  kmpSearch: {
    id: "kmpSearch",
    name: "Knuth-Morris-Pratt (KMP)",
    type: "StringMatching",
    condition: "Efficient matching avoiding redundant checks",
    complexity: { time: "O(n + m)", space: "O(m)", timeVal: 3, spaceVal: 2 },
    explanation: "Constructs a longest prefix-suffix (LPS) array to skip redundant comparisons during the search.",
    alternatives: ["Naive Match", "Rabin-Karp"],
    code: `vector<int> buildLPS(const string& pattern) {
  int m = pattern.size();
  vector<int> lps(m, 0);
  int len = 0, i = 1;
  while (i < m) {
    if (pattern[i] == pattern[len]) lps[i++] = ++len;
    else if (len) len = lps[len - 1];
    else lps[i++] = 0;
  }
  return lps;
}

int kmpSearch(const string& text, const string& pat) {
  auto lps = buildLPS(pat);
  int i = 0, j = 0;
  while (i < text.size()) {
    if (text[i] == pat[j]) { i++; j++; }
    else if (j) j = lps[j - 1];
    else i++;
    if (j == pat.size()) return i - j;
  }
  return -1;
}`
  },
  stackDS: {
    id: "stackDS",
    name: "Stack",
    type: "DataStructure",
    condition: "Last-In-First-Out (LIFO) access",
    complexity: { time: "O(1)", space: "O(n)", timeVal: 1, spaceVal: 2 },
    explanation: "A linear data structure following LIFO principle. Elements are pushed and popped from the top exclusively.",
    alternatives: ["Queue"],
    code: `// Stack — LIFO (Last-In, First-Out)
// Uses: function call stack, undo operations, DFS

template <typename T>
class Stack {
  vector<T> data;
public:
  // Push element onto top — O(1)
  void push(const T& x)  { data.push_back(x); }

  // Remove top element — O(1)
  void pop() {
    if (!empty()) data.pop_back();
  }

  // Peek at top without removing — O(1)
  T& top() { return data.back(); }

  bool empty() const { return data.empty(); }
  int  size()  const { return data.size(); }
};`
  },
  queueDS: {
    id: "queueDS",
    name: "Queue",
    type: "DataStructure",
    condition: "First-In-First-Out (FIFO) access",
    complexity: { time: "O(1)", space: "O(n)", timeVal: 1, spaceVal: 2 },
    explanation: "A linear data structure following FIFO principle. Elements are enqueued at the back and dequeued from the front.",
    alternatives: ["Stack"],
    code: `// Queue — FIFO (First-In, First-Out)
// Uses: BFS traversal, scheduling, buffering

template <typename T>
class Queue {
  vector<T> data;
  int head = 0;
public:
  // Enqueue at rear — O(1)
  void push(const T& x) { data.push_back(x); }

  // Dequeue from front — O(1) amortized
  void pop() {
    if (!empty()) head++;
  }

  // Peek at front without removing — O(1)
  T& front() { return data[head]; }

  bool empty() const { return head >= (int)data.size(); }
  int  size()  const { return (int)data.size() - head; }
};`
  },
  linkedListDS: {
    id: "linkedListDS",
    name: "Linked List",
    type: "DataStructure",
    condition: "Dynamic memory allocation / chaining",
    complexity: { time: "O(n)", space: "O(n)", timeVal: 3, spaceVal: 2 },
    explanation: "Nodes connected via pointers. Efficient for dynamic insertion/deletion without shifting contiguous blocks of memory.",
    alternatives: ["Array"],
    code: `struct Node {
  int data;
  Node* next;
  Node(int d) : data(d), next(nullptr) {}
};

class LinkedList {
  Node* head = nullptr;
public:
  void prepend(int val) {
    Node* n = new Node(val);
    n->next = head;
    head = n;
  }
  void append(int val) {
    Node* n = new Node(val);
    if (!head) { head = n; return; }
    Node* cur = head;
    while (cur->next) cur = cur->next;
    cur->next = n;
  }
  void deleteHead() {
    if (!head) return;
    Node* tmp = head;
    head = head->next;
    delete tmp;
  }
};`
  },
  treeTraversal: {
    id: "treeTraversal",
    name: "Tree Traversals",
    type: "Tree",
    condition: "Structured Hierarchical Data",
    complexity: { time: "O(n)", space: "O(h)", timeVal: 3.2, spaceVal: 2.5 },
    explanation: "Visit all nodes in a tree systematically. Four main methods: Preorder (Root-Left-Right), Inorder (Left-Root-Right), Postorder (Left-Right-Root), and Breadth-First (Level Order). Choose based on your processing needs.",
    alternatives: ["Graph BFS/DFS"],
    code: `struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

// Preorder: Root, Left, Right
void preorder(TreeNode* node) {
  if (!node) return;
  cout << node->val << " ";
  preorder(node->left);
  preorder(node->right);
}

// Inorder: Left, Root, Right (sorted for BST)
void inorder(TreeNode* node) {
  if (!node) return;
  inorder(node->left);
  cout << node->val << " ";
  inorder(node->right);
}

// Postorder: Left, Right, Root
void postorder(TreeNode* node) {
  if (!node) return;
  postorder(node->left);
  postorder(node->right);
  cout << node->val << " ";
}

// Breadth-First (Level Order)
void bfs(TreeNode* root) {
  if (!root) return;
  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* n = q.front(); q.pop();
    cout << n->val << " ";
    if (n->left)  q.push(n->left);
    if (n->right) q.push(n->right);
  }
}`
  },
  findMinBST: {
    id: "findMinBST",
    name: "Find Minimum",
    type: "Tree",
    condition: "Binary Search Tree lookup",
    complexity: { time: "O(h)", space: "O(1)", timeVal: 2.5, spaceVal: 1 },
    explanation: "Finds the minimum element in a BST by traversing to the leftmost node. The minimum is always at the leftmost position.",
    alternatives: ["Linear scan (unordered tree)"],
    code: `TreeNode* findMin(TreeNode* node) {
  if (!node) return nullptr;
  while (node->left)
    node = node->left;
  return node; // Leftmost node = minimum
}`
  },
  findMaxBST: {
    id: "findMaxBST",
    name: "Find Maximum",
    type: "Tree",
    condition: "Binary Search Tree lookup",
    complexity: { time: "O(h)", space: "O(1)", timeVal: 2.5, spaceVal: 1 },
    explanation: "Finds the maximum element in a BST by traversing to the rightmost node. The maximum is always at the rightmost position.",
    alternatives: ["Linear scan (unordered tree)"],
    code: `TreeNode* findMax(TreeNode* node) {
  if (!node) return nullptr;
  while (node->right)
    node = node->right;
  return node; // Rightmost node = maximum
}`
  },
  findKthMin: {
    id: "findKthMin",
    name: "Find Kth Minimum",
    type: "Tree",
    condition: "Kth smallest element in BST",
    complexity: { time: "O(h + k)", space: "O(h)", timeVal: 3, spaceVal: 2 },
    explanation: "Finds the Kth smallest element using inorder traversal. Inorder traversal of BST gives sorted order, so the Kth element is the Kth smallest.",
    alternatives: ["Kth maximum", "Quick select"],
    code: `int count = 0, result = -1;

void inorder(TreeNode* node, int k) {
  if (!node || count >= k) return;
  inorder(node->left, k);
  count++;
  if (count == k) { result = node->val; return; }
  inorder(node->right, k);
}

int findKthMin(TreeNode* root, int k) {
  count = 0; result = -1;
  inorder(root, k);
  return result;
}`
  },
  findKthMax: {
    id: "findKthMax",
    name: "Find Kth Maximum",
    type: "Tree",
    condition: "Kth largest element in BST",
    complexity: { time: "O(h + k)", space: "O(h)", timeVal: 3, spaceVal: 2 },
    explanation: "Finds the Kth largest element using reverse inorder traversal (Right-Root-Left). This gives elements in descending order.",
    alternatives: ["Kth minimum", "Quick select"],
    code: `int count = 0, result = -1;

void reverseInorder(TreeNode* node, int k) {
  if (!node || count >= k) return;
  reverseInorder(node->right, k);
  count++;
  if (count == k) { result = node->val; return; }
  reverseInorder(node->left, k);
}

int findKthMax(TreeNode* root, int k) {
  count = 0; result = -1;
  reverseInorder(root, k);
  return result;
}`
  },
  linearProbing: {
    id: "linearProbing",
    name: "Linear Probing",
    type: "Hashing",
    condition: "Open addressing with linear probing",
    complexity: { time: "O(1) avg, O(n) worst", space: "O(n)", timeVal: 3.5, spaceVal: 2 },
    explanation: "Resolves collisions by checking the next slot sequentially. Simple but can suffer from clustering.",
    alternatives: ["Quadratic Probing", "Double Hashing"],
    code: `const int EMPTY = -1;

int h(int key, int size) { return key % size; }

int linearProbe(vector<int>& table, int key) {
  int n = table.size();
  int idx = h(key, n);
  int start = idx;
  do {
    if (table[idx] == EMPTY) {
      table[idx] = key; // Insert
      return idx;
    }
    idx = (idx + 1) % n; // Linear step
  } while (idx != start);
  return -1; // Table full
}`
  },
  quadraticProbing: {
    id: "quadraticProbing",
    name: "Quadratic Probing",
    type: "Hashing",
    condition: "Open addressing with quadratic probing",
    complexity: { time: "O(1) avg, O(n) worst", space: "O(n)", timeVal: 3.5, spaceVal: 2 },
    explanation: "Resolves collisions by checking slots at quadratic distances (i², 4i², 9i²...). Reduces clustering compared to linear probing.",
    alternatives: ["Linear Probing", "Double Hashing"],
    code: `const int EMPTY = -1;

int h(int key, int size) { return key % size; }

int quadraticProbe(vector<int>& table, int key) {
  int n = table.size();
  int idx = h(key, n);

  for (int i = 0; i < n; i++) {
    int probe = (idx + i * i) % n;
    if (table[probe] == EMPTY) {
      table[probe] = key;
      return probe;
    }
  }
  return -1; // Table full
}`
  },
  doubleHashing: {
    id: "doubleHashing",
    name: "Double Hashing",
    type: "Hashing",
    condition: "Open addressing with double hashing",
    complexity: { time: "O(1) avg, O(n) worst", space: "O(n)", timeVal: 3.5, spaceVal: 2 },
    explanation: "Resolves collisions using a second hash function. Provides better distribution and minimizes clustering.",
    alternatives: ["Linear Probing", "Quadratic Probing"],
    code: `const int EMPTY = -1;

int h1(int key, int n) { return key % n; }
int h2(int key)        { return 7 - (key % 7); }

int doubleHash(vector<int>& table, int key) {
  int n = table.size();
  int idx  = h1(key, n);
  int step = h2(key);

  for (int i = 0; i < n; i++) {
    int probe = (idx + i * step) % n;
    if (table[probe] == EMPTY) {
      table[probe] = key;
      return probe;
    }
  }
  return -1; // Table full
}`
  },
  randomProbing: {
    id: "randomProbing",
    name: "Random Probing",
    type: "Hashing",
    condition: "Closed hashing with random probing",
    complexity: { time: "O(1) avg, O(n) worst", space: "O(n)", timeVal: 4, spaceVal: 2 },
    explanation: "Resolves collisions by probing random positions. Depends on pseudo-random number generation.",
    alternatives: ["Rehashing"],
    code: `const int EMPTY = -1;
// Pseudo-random offsets (deterministic seed)
int offsets[] = {3, 7, 1, 5, 9, 2, 8, 4, 6, 0};

int randomProbe(vector<int>& table, int key) {
  int n = table.size();
  int idx = key % n;
  if (table[idx] == EMPTY) {
    table[idx] = key; return idx;
  }
  for (int i = 0; i < 10; i++) {
    int probe = (idx + offsets[i]) % n;
    if (table[probe] == EMPTY) {
      table[probe] = key; return probe;
    }
  }
  return -1; // Could not insert
}`
  },
  rehashing: {
    id: "rehashing",
    name: "Rehashing",
    type: "Hashing",
    condition: "Dynamic resizing with rehashing",
    complexity: { time: "O(n) rebuild, O(1) avg insert", space: "O(n)", timeVal: 4.5, spaceVal: 3 },
    explanation: "When load factor exceeds threshold, creates a larger table and rehashes all entries. Maintains better performance as table grows.",
    alternatives: ["Random Probing"],
    code: `const int EMPTY = -1;

vector<int> rehash(vector<int>& old, int newSize) {
  vector<int> newTable(newSize, EMPTY);
  for (int key : old) {
    if (key == EMPTY) continue;
    int idx = key % newSize;
    while (newTable[idx] != EMPTY)
      idx = (idx + 1) % newSize;
    newTable[idx] = key;
  }
  return newTable;
}`
  }
};

export const problemTypes = [
  {
    id: "searching", label: "Searching Algorithms", 
    questions: [
      { id: "sorted", label: "Is the data sorted?", options: ["Yes", "No"] }
    ]
  },
  {
    id: "sorting", label: "Sorting Algorithms",
    questions: [
      { id: "size", label: "Dataset size/nature?", options: ["Large, random", "Large, needs stability", "Small (or nearly sorted)", "Minimize memory writes"] }
    ]
  },
  {
    id: "graph", label: "Graph Algorithms",
    questions: [
      { id: "goal", label: "What is your goal?", options: ["Shortest path (unweighted)", "Shortest path (positive weights)", "Shortest path (negative weights)", "Explore all paths / topology"] }
    ]
  },
  {
    id: "stringMatch", label: "String Matching",
    questions: [
      { id: "performance", label: "Dataset size/performance needs?", options: ["Short text (simple match)", "Long text (efficient match)"] }
    ]
  },
  {
    id: "dataStructures", label: "Data Structures",
    questions: [
      { id: "access", label: "Select the data structure you want to visualize.", options: ["Stack (LIFO)", "Queue (FIFO)", "Single Linked List"] }
    ]
  },
  {
    id: "tree", label: "Tree Algorithms",
    questions: [
      { id: "action", label: "Select the tree operation you want to visualize.", options: ["Traversals", "Minimum Element", "Maximum Element", "Kth Minimum Element", "Kth Maximum Element"] }
    ]
  },
  {
    id: "hashing", label: "Hashing",
    questions: [
      { id: "hashType", label: "Which hashing technique?", options: ["Open Hashing (Linear Probing)", "Open Hashing (Quadratic Probing)", "Open Hashing (Double Hashing)", "Closed Hashing (Random Probing)", "Closed Hashing (Rehashing)"] }
    ]
  }
];

export const deduceAlgorithm = (problemType, answers) => {
  if (problemType === "searching") {
    return answers.sorted === "Yes" ? algorithms.binarySearch : algorithms.linearSearch;
  }
  if (problemType === "sorting") {
    if (answers.size === "Small (or nearly sorted)") return algorithms.insertionSort;
    if (answers.size === "Large, needs stability") return algorithms.mergeSort;
    if (answers.size === "Minimize memory writes") return algorithms.selectionSort;
    return algorithms.quickSort;
  }
  if (problemType === "graph") {
    if (answers.goal === "Shortest path (unweighted)") return algorithms.bfs;
    if (answers.goal === "Shortest path (positive weights)") return algorithms.dijkstra;
    if (answers.goal === "Shortest path (negative weights)") return algorithms.bellmanFord;
    return algorithms.dfs;
  }
  if (problemType === "stringMatch") {
    if (answers.performance === "Short text (simple match)") return algorithms.naiveStringMatch;
    return algorithms.kmpSearch;
  }
  if (problemType === "dataStructures") {
    if (answers.access === "Stack (LIFO)") return algorithms.stackDS;
    if (answers.access === "Queue (FIFO)") return algorithms.queueDS;
    return algorithms.linkedListDS;
  }
  if (problemType === "tree") {
    if (answers.action === "Minimum Element") return algorithms.findMinBST;
    if (answers.action === "Maximum Element") return algorithms.findMaxBST;
    if (answers.action === "Kth Minimum Element") return algorithms.findKthMin;
    if (answers.action === "Kth Maximum Element") return algorithms.findKthMax;
    return algorithms.treeTraversal;
  }
  if (problemType === "hashing") {
    if (answers.hashType === "Open Hashing (Linear Probing)") return algorithms.linearProbing;
    if (answers.hashType === "Open Hashing (Quadratic Probing)") return algorithms.quadraticProbing;
    if (answers.hashType === "Open Hashing (Double Hashing)") return algorithms.doubleHashing;
    if (answers.hashType === "Closed Hashing (Random Probing)") return algorithms.randomProbing;
    if (answers.hashType === "Closed Hashing (Rehashing)") return algorithms.rehashing;
  }
  return null;
};
