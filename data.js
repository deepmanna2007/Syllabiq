/**
 * Default syllabus data with comprehensive notes, quizzes, and assessments.
 */
const DEFAULT_SYLLABI = [
  {
    id: "cs-dsa",
    title: "Computer Science: Data Structures & Algorithms",
    category: "Computer Science",
    icon: "💻",
    description: "Core computer science fundamentals covering linear & non-linear structures, complexity, and algorithmic patterns.",
    targetWeeks: 6,
    units: [
      {
        id: "unit-1",
        title: "Unit 1: Algorithmic Complexity & Arrays",
        description: "Asymptotic notation, memory layout of arrays, and two-pointer techniques.",
        topics: [
          {
            id: "topic-1-1",
            title: "Big-O Notation & Time Complexity",
            duration: "30 min read",
            summary: "Big-O characterizes functions according to their growth rate, formalizing worst-case runtimes.",
            notes: `
### 1. Understanding Asymptotic Analysis
Asymptotic notation allows us to evaluate the efficiency of algorithms independently of machine hardware, compiler optimizations, or programming language nuances.

#### Key Notations:
- **$O(g(n))$ (Big-O)**: Asymptotic upper bound (worst-case scenario). Represents the maximum time or space an algorithm requires.
- **$\\\\Omega(g(n))$ (Big-Omega)**: Asymptotic lower bound (best-case scenario).
- **$\\\\Theta(g(n))$ (Big-Theta)**: Asymptotic tight bound (both upper and lower bound).

---

### 2. Common Time Complexities Ranked
1. **$O(1)$ - Constant**: Hash map lookup, array index access.
2. **$O(\\\\log n)$ - Logarithmic**: Binary search, balanced BST search.
3. **$O(n)$ - Linear**: Linear search, traversing an array or linked list.
4. **$O(n \\\\log n)$ - Linearithmic**: Merge sort, Heap sort, Quick sort (average case).
5. **$O(n^2)$ - Quadratic**: Nested loops, Bubble sort, Selection sort.
6. **$O(2^n)$ - Exponential**: Recursive Fibonacci without memoization, power set generation.
7. **$O(n!)$ - Factorial**: Traveling Salesperson Problem (brute force), generating all permutations.

> **Key Rule of Thumb:** If an algorithm divides the problem space in half at each step (e.g. dividing by 2), it almost always has $O(\\\\log n)$ complexity.

---

### 3. Space Complexity Essentials
Memory is evaluated in terms of **auxiliary space** (extra space used beyond input storage) and total space.
- Recursion call stacks take memory proportional to the depth of recursion!
- Beware of hidden copies when slicing arrays in Python or JavaScript (e.g., \`arr.slice()\` creates an $O(n)$ copy).
            `,
            keyTakeaways: [
              "Drop constant factors ($O(2n) \\rightarrow O(n)$) and lower-order terms.",
              "Logarithmic operations are exceptionally fast even for billions of inputs.",
              "Recursive functions incur stack frame overhead proportional to recursion depth."
            ],
            quiz: [
              {
                id: "q-1-1-1",
                question: "What is the worst-case time complexity of Binary Search on a sorted array of size n?",
                options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                correctIndex: 1,
                explanation: "Binary search repeatedly halves the search interval, resulting in O(log n) comparisons in the worst case."
              },
              {
                id: "q-1-1-2",
                question: "Which of the following functions grows fastest as n becomes arbitrarily large?",
                options: ["O(n^3)", "O(2^n)", "O(n log n)", "O(n!)"],
                correctIndex: 3,
                explanation: "Factorial growth O(n!) grows even faster than exponential growth O(2^n)."
              },
              {
                id: "q-1-1-3",
                question: "What is the auxiliary space complexity of an in-place array reversal?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                correctIndex: 0,
                explanation: "In-place reversal only needs two pointer variables (left, right) and a temp variable, which requires constant O(1) extra space."
              }
            ]
          },
          {
            id: "topic-1-2",
            title: "Dynamic Arrays & Sliding Window",
            duration: "40 min read",
            summary: "Amortized expansion mechanics, memory allocation, and the sliding window optimization pattern.",
            notes: `
### 1. Static vs. Dynamic Arrays
- **Static Array**: Fixed size in contiguous memory. Insertion past capacity requires reallocating a new buffer.
- **Dynamic Array** (e.g., \`vector\` in C++, \`ArrayList\` in Java, \`Array\` in JS):
  - Automatically doubles capacity when full.
  - Doubling factor ensures an **amortized $O(1)$** insertion time, even though resizing takes $O(n)$.

---

### 2. The Sliding Window Pattern
Sliding window is an algorithmic technique used to transform nested loop $O(n^2)$ array/string problems into linear $O(n)$ time.

#### When to use:
- Working with contiguous subarrays or substrings.
- Seeking minimum, maximum, longest, or shortest subarray satisfying a condition (e.g., target sum, unique characters).

#### Pseudocode Template:
\`\`\`javascript
function slidingWindow(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  let left = 0;

  for (let right = 0; right < arr.length; right++) {
    windowSum += arr[right]; // expand right boundary

    // maintain window size or condition
    if (right >= k - 1) {
      maxSum = Math.max(maxSum, windowSum);
      windowSum -= arr[left]; // shrink left boundary
      left++;
    }
  }
  return maxSum;
}
\`\`\`
            `,
            keyTakeaways: [
              "Dynamic arrays double their buffer size to maintain amortized O(1) push operations.",
              "Sliding window eliminates redundant calculations across overlapping contiguous ranges.",
              "Two pointers can move at the same speed or adaptively based on constraint validity."
            ],
            quiz: [
              {
                id: "q-1-2-1",
                question: "Why does dynamic array appending have an amortized O(1) time complexity?",
                options: [
                  "Because resizing never happens in real programs",
                  "Because the expensive O(n) resize happens exponentially infrequently",
                  "Because memory reallocation is performed in hardware instantaneously",
                  "Because arrays store elements in linked nodes"
                ],
                correctIndex: 1,
                explanation: "When doubling capacity, n appends cost 1, 2, 4, 8... operations; spread across all elements, each append effectively costs under 3 operations."
              },
              {
                id: "q-1-2-2",
                question: "For finding the maximum sum of any contiguous subarray of fixed size k, sliding window reduces time complexity from O(n*k) to:",
                options: ["O(log n)", "O(n)", "O(k log n)", "O(1)"],
                correctIndex: 1,
                explanation: "By subtracting the exiting left element and adding the new right element, each step is O(1), making total time O(n)."
              }
            ]
          }
        ],
        assessment: {
          title: "Unit 1 Assessment: Complexity & Arrays Mastery",
          timeLimitMinutes: 15,
          passingScore: 70,
          questions: [
            {
              id: "as-1-1",
              question: "If an algorithm runs in T(n) = 3T(n/2) + O(n), what is its asymptotic complexity via Master Theorem?",
              options: ["O(n)", "O(n log n)", "O(n^(log2 3)) ≈ O(n^1.58)", "O(n^2)"],
              correctIndex: 2,
              explanation: "Since log_2(3) > 1, the work is dominated by the leaves, resulting in O(n^(log_b a)) = O(n^(log_2 3))."
            },
            {
              id: "as-1-2",
              question: "Consider an array of size n. Inserting an element at index 0 requires shifting how many elements?",
              options: ["0 elements", "1 element", "n elements", "log n elements"],
              correctIndex: 2,
              explanation: "To place a value at index 0, every existing element from 0 to n-1 must be shifted right by one position, an O(n) operation."
            },
            {
              id: "as-1-3",
              question: "What is the best technique to check if an array contains two numbers that sum up to target 'T' if the array is already sorted?",
              options: ["Two-pointer approach (left at start, right at end)", "Quadratic nested loops", "Binary search on every index", "Depth-first search"],
              correctIndex: 0,
              explanation: "Two pointers converging from both ends can find the pair in O(n) time and O(1) extra space because the input is sorted."
            },
            {
              id: "as-1-4",
              question: "Which of the following is an example of an in-place sorting algorithm with O(n log n) worst-case time?",
              options: ["Merge Sort", "Heap Sort", "Bubble Sort", "Counting Sort"],
              correctIndex: 1,
              explanation: "Heap Sort sorts in-place using O(1) auxiliary space and guarantees O(n log n) runtime in all cases."
            }
          ]
        }
      },
      {
        id: "unit-2",
        title: "Unit 2: Linked Lists, Stacks & Queues",
        description: "Pointer-based chains, LIFO/FIFO principles, monotonic structures, and cycle detection.",
        topics: [
          {
            id: "topic-2-1",
            title: "Singly & Doubly Linked Lists",
            duration: "35 min read",
            summary: "Node manipulation, sentinel dummy heads, and Floyd's Cycle-Finding Algorithm (Tortoise and Hare).",
            notes: `
### 1. Linked List Fundamentals
Unlike arrays, linked lists do not require contiguous memory blocks. Each node contains:
- \`val\`: The payload data.
- \`next\`: Pointer/reference to the subsequent node (and \`prev\` for doubly linked lists).

#### Pros & Cons:
- **Pros**: $O(1)$ insertions/deletions at known positions; flexible size without upfront buffer allocation.
- **Cons**: $O(n)$ random access (no direct indexing); cache-unfriendly due to non-contiguous heap pointers; pointer storage overhead.

---

### 2. The Dummy (Sentinel) Node Trick
When mutating head nodes or merging lists, prepend a \`dummy\` node:
\`\`\`javascript
const dummy = new ListNode(0);
let current = dummy;
// Perform stitching...
return dummy.next;
\`\`\`
This prevents edge cases where the head changes or is deleted.

---

### 3. Floyd's Cycle Detection (Tortoise & Hare)
- Initialize \`slow = head\` and \`fast = head\`.
- Advance \`slow\` by 1 step, and \`fast\` by 2 steps.
- If \`fast\` reaches \`null\`, there is no cycle.
- If \`slow === fast\`, a loop exists!
            `,
            keyTakeaways: [
              "Sentinel nodes eliminate repetitive null-checks when updating the head.",
              "Floyd's algorithm detects cycles in O(n) time with zero extra space O(1).",
              "Reversing a singly linked list requires tracking prev, curr, and next pointers."
            ],
            quiz: [
              {
                id: "q-2-1-1",
                question: "What is the time complexity to insert a node at the head of a singly linked list?",
                options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
                correctIndex: 0,
                explanation: "Inserting at the head simply updates the new node's next pointer to point to the current head, requiring constant O(1) time."
              },
              {
                id: "q-2-1-2",
                question: "In Floyd's cycle detection algorithm, if a cycle of length C exists, how many steps does it take for fast to catch slow?",
                options: ["O(C)", "O(C^2)", "O(log C)", "It may never catch up"],
                correctIndex: 0,
                explanation: "Each iteration closes the distance between fast and slow by 1 node, guaranteeing they meet in at most C steps."
              }
            ]
          },
          {
            id: "topic-2-2",
            title: "Stacks, Queues & Monotonic Patterns",
            duration: "35 min read",
            summary: "LIFO vs FIFO architectures, circular buffers, and solving next-greater-element with monotonic stacks.",
            notes: `
### 1. Stacks (LIFO - Last In, First Out)
- **Primary Operations**: \`push()\`, \`pop()\`, \`peek()\` all in $O(1)$.
- **Applications**:
  - Balanced parentheses validation.
  - Backtracking & undo history.
  - DFS graph traversal and recursive activation records.

### 2. Queues (FIFO - First In, First Out)
- **Primary Operations**: \`enqueue()\`, \`dequeue()\`, \`front()\` in $O(1)$.
- Implement using doubly linked lists or circular arrays with ring pointers.
- **Applications**: Breadth-First Search (BFS), task scheduling, print queues.

### 3. Monotonic Stack Concept
A monotonic stack keeps elements in either strictly increasing or decreasing order.
Used for finding the **Next Greater Element** or **Nearest Smaller Element** in $O(n)$ time.
            `,
            keyTakeaways: [
              "Stacks follow LIFO; Queues follow FIFO.",
              "Never use naive array shift() for queues in JS/Python without deque, as shift() is O(n).",
              "Monotonic stacks process each element at most twice (pushed once, popped once) = O(n)."
            ],
            quiz: [
              {
                id: "q-2-2-1",
                question: "Which data structure is primarily used to implement Breadth-First Search (BFS)?",
                options: ["Stack", "Queue", "Heap", "Hash Map"],
                correctIndex: 1,
                explanation: "Queue's FIFO behavior ensures nodes at the current level are visited before deeper levels."
              },
              {
                id: "q-2-2-2",
                question: "Evaluating a postfix expression (Reverse Polish Notation) like '3 4 + 2 *' is cleanest using a:",
                options: ["Queue", "Binary Search Tree", "Stack", "Priority Queue"],
                correctIndex: 2,
                explanation: "Operands are pushed onto a stack; operators pop the top two operands, compute, and push the result back."
              }
            ]
          }
        ],
        assessment: {
          title: "Unit 2 Assessment: Linear Data Structures Exam",
          timeLimitMinutes: 20,
          passingScore: 70,
          questions: [
            {
              id: "as-2-1",
              question: "How can you implement a FIFO Queue using two LIFO Stacks (stackIn, stackOut)?",
              options: [
                "Push to stackIn; to dequeue, if stackOut is empty, pop all from stackIn to stackOut, then pop stackOut",
                "Alternate pushes between stackIn and stackOut",
                "Use recursion without storing elements",
                "It is mathematically impossible to implement a queue with stacks"
              ],
              correctIndex: 0,
              explanation: "Reversing the stack order once by transferring elements between stacks yields FIFO output with amortized O(1) time per operation."
            },
            {
              id: "as-2-2",
              question: "What is the maximum depth of an activation call stack during an iterative tree traversal compared to recursive?",
              options: [
                "Iterative uses O(1) always",
                "Both have the same maximum auxiliary stack space equal to tree height O(h)",
                "Iterative always takes O(n^2)",
                "Recursive uses less memory because the compiler cleans it up instantly"
              ],
              correctIndex: 1,
              explanation: "Both iterative (explicit stack) and recursive (call stack) mirror the call path, bounded by the height of the tree."
            },
            {
              id: "as-2-3",
              question: "In a circular queue implemented via array of capacity N, what is the formula for the next index after 'curr'?",
              options: ["(curr + 1) / N", "(curr + 1) % N", "curr + N", "curr % (N + 1)"],
              correctIndex: 1,
              explanation: "Modulo arithmetic wraps the index back to 0 once it reaches capacity N."
            }
          ]
        }
      },
      {
        id: "unit-3",
        title: "Unit 3: Trees, Binary Search Trees & Heaps",
        description: "Hierarchical data representation, traversals, BST balancing, and priority heaps.",
        topics: [
          {
            id: "topic-3-1",
            title: "Binary Trees & Traversal Techniques",
            duration: "40 min read",
            summary: "Pre-order, In-order, Post-order (DFS), and Level-order (BFS) traversals with recursion and iteration.",
            notes: `
### 1. Tree Terminology
- **Root**: Topmost node without parent.
- **Leaf**: Node with zero children.
- **Height**: Number of edges from node to deepest leaf.
- **Balanced Tree**: Tree where left and right subtree heights differ by at most 1 for every node.

---

### 2. Depth-First Search (DFS) Traversals
Given a binary node:
1. **Pre-Order (Node, Left, Right)**: Great for cloning/serializing a tree.
2. **In-Order (Left, Node, Right)**: In a Binary Search Tree (BST), this visits keys in **strictly ascending sorted order**!
3. **Post-Order (Left, Right, Node)**: Perfect for bottom-up computation (e.g. deleting a tree, computing subtree height/size).

---

### 3. Binary Search Tree (BST) Property
For any node $X$:
- All nodes in $X$'s left subtree have values $< X.val$.
- All nodes in $X$'s right subtree have values $> X.val$.
- Search, insertion, and deletion: Average $O(\\\\log n)$, Worst $O(n)$ if degenerate (skewed like a linked list).
            `,
            keyTakeaways: [
              "In-order traversal of a valid BST always yields values in sorted order.",
              "Post-order traversal computes child properties before processing the parent.",
              "Degenerate BSTs degrade to O(n); self-balancing trees (AVL, Red-Black) maintain O(log n)."
            ],
            quiz: [
              {
                id: "q-3-1-1",
                question: "Which traversal of a Binary Search Tree produces elements in sorted ascending order?",
                options: ["Pre-order", "In-order", "Post-order", "Level-order"],
                correctIndex: 1,
                explanation: "In-order processes Left -> Root -> Right, which strictly adheres to BST key ordering."
              },
              {
                id: "q-3-1-2",
                question: "What is the maximum number of nodes in a binary tree of height h (where a single root has height 0)?",
                options: ["2^h", "2^(h + 1) - 1", "2h", "h^2"],
                correctIndex: 1,
                explanation: "The sum of powers of 2 from level 0 to h is 2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1."
              }
            ]
          }
        ],
        assessment: {
          title: "Unit 3 Assessment: Tree Architectures",
          timeLimitMinutes: 15,
          passingScore: 70,
          questions: [
            {
              id: "as-3-1",
              question: "In a Min-Heap with N elements, what is the time complexity to extract the minimum element?",
              options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
              correctIndex: 1,
              explanation: "Retrieving the min root is O(1), but swapping the last leaf to root and sifting down takes O(log N)."
            },
            {
              id: "as-3-2",
              question: "Which property distinguishes an AVL tree from a standard BST?",
              options: [
                "It can only store positive numbers",
                "The height difference between left and right subtrees is at most 1 for all nodes",
                "All leaf nodes must be at the exact same depth",
                "Nodes cannot have duplicate keys"
              ],
              correctIndex: 1,
              explanation: "AVL trees strictly enforce a balance factor in {-1, 0, 1} through rotations upon insertion and deletion."
            }
          ]
        }
      }
    ]
  },
  {
    id: "bio-genetics",
    title: "Biology: Molecular Genetics & Cell Biology",
    category: "Natural Sciences",
    icon: "🧬",
    description: "Cellular structures, DNA replication, transcription, translation, and Mendelian inheritance models.",
    targetWeeks: 4,
    units: [
      {
        id: "bio-u1",
        title: "Unit 1: The Cell, Membranes & Energy",
        description: "Prokaryotic vs eukaryotic architecture, fluid mosaic model, and ATP synthesis.",
        topics: [
          {
            id: "bio-t-1-1",
            title: "Prokaryotes vs. Eukaryotes & Organelles",
            duration: "25 min read",
            summary: "Structural differences, endosymbiotic theory, and compartmentalization of cellular work.",
            notes: `
### 1. Cellular Classification
- **Prokaryotes** (Bacteria, Archaea):
  - No membrane-bound nucleus; genetic material resides in a **nucleoid** region.
  - Lack complex membrane-bound organelles (mitochondria, chloroplasts, Golgi).
  - Usually smaller ($0.1 - 5.0 \\\\,\\\\mu m$) with circular DNA plasmids and 70S ribosomes.

- **Eukaryotes** (Plants, Animals, Fungi, Protists):
  - True nucleus enveloped by double membrane.
  - Linear chromosomes bound by histone proteins.
  - Distinct organelles permitting specialized micro-environments (80S ribosomes).

---

### 2. Essential Organelles & Functions
- **Mitochondria**: Site of cellular respiration (Krebs cycle & oxidative phosphorylation). Contains maternal circular DNA.
- **Endoplasmic Reticulum (ER)**:
  - *Rough ER*: Studded with ribosomes; synthesizes secretory and membrane proteins.
  - *Smooth ER*: Synthesizes lipids, metabolizes carbohydrates, detoxifies drugs.
- **Golgi Apparatus**: Modifies, packages, and sorts proteins for secretion or lysosomal delivery.
- **Chloroplasts** (Plants/Algae): Thylakoid membranes capture photons for photosynthesis.
            `,
            keyTakeaways: [
              "Prokaryotes lack membrane-bound organelles and a true nuclear envelope.",
              "Endosymbiotic theory explains the origin of mitochondria and chloroplasts from engulfed aerobic bacteria.",
              "Compartmentalization in eukaryotes increases metabolic efficiency."
            ],
            quiz: [
              {
                id: "q-bio-1",
                question: "Which organelle contains its own circular DNA and reproduces independently inside eukaryotic cells?",
                options: ["Golgi apparatus", "Mitochondria", "Lysosome", "Centrosome"],
                correctIndex: 1,
                explanation: "Mitochondria (and chloroplasts) have their own circular genome and 70S ribosomes, supporting the endosymbiotic origin."
              },
              {
                id: "q-bio-2",
                question: "Where are ribosomal RNA (rRNA) subunits assembled in eukaryotic cells?",
                options: ["Nucleolus", "Smooth ER", "Peroxisome", "Vacuole"],
                correctIndex: 0,
                explanation: "The nucleolus is the dense sub-nuclear region where rRNA is transcribed and combined with proteins to form ribosome subunits."
              }
            ]
          }
        ],
        assessment: {
          title: "Unit 1 Assessment: Cell Biology Diagnostic",
          timeLimitMinutes: 15,
          passingScore: 75,
          questions: [
            {
              id: "as-bio-1",
              question: "The fluid mosaic model describes plasma membranes as composed of:",
              options: [
                "Rigid cellulose sheets interleaved with proteins",
                "A phospholipid bilayer with mobile embedded proteins and cholesterol",
                "A continuous single layer of triglycerides",
                "Pure glycoprotein polymers"
              ],
              correctIndex: 1,
              explanation: "Amphipathic phospholipids arrange in a bilayer with hydrophilic heads facing aqueous sides, while proteins drift laterally."
            },
            {
              id: "as-bio-2",
              question: "During aerobic cellular respiration, the bulk of ATP is produced by:",
              options: ["Glycolysis in cytoplasm", "Fermentation", "ATP synthase via oxidative phosphorylation", "Light reactions in stroma"],
              correctIndex: 2,
              explanation: "The proton gradient established across the inner mitochondrial membrane drives ATP synthase, generating approximately 26-28 ATP."
            }
          ]
        }
      }
    ]
  }
];
