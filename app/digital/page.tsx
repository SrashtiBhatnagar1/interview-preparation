"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, Code, MessageSquare, Briefcase, BarChart3, ArrowLeft, BookOpen, Lightbulb, Users } from "lucide-react";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

function TCSDigitalPage() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("coding");
  const [selectedLanguage, setSelectedLanguage] = useState<"java" | "cpp" | "python">("java");

  const toggleQuestion = (id: number) =>
    setExpandedQuestion((prev) => (prev === id ? null : id));

  const handleKeyToggle = (event: React.KeyboardEvent, id: number) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleQuestion(id);
    }
  };

  const menuItems = [
    { id: "coding", label: "Coding Questions", icon: Code },
    { id: "sql", label: "SQL Questions", icon: BarChart3 },
    { id: "technical", label: "Technical Questions", icon: BarChart3 },
    { id: "managerial", label: "Managerial Questions", icon: Briefcase },
    { id: "hr", label: "HR Questions", icon: MessageSquare }
  ];

  /* =============================
     CODING QUESTIONS — DIGITAL
     ============================= */

  const codingQuestions = [
    {
      id: 1,
      question: "Check whether a string is an anagram of another string",
      java: `public static boolean isAnagram(String a, String b) {
    if (a == null || b == null) return false;
    a = a.replaceAll("\\s", "").toLowerCase();
    b = b.replaceAll("\\s", "").toLowerCase();
    if (a.length() != b.length()) return false;

    int[] freq = new int[26];
    for (int i = 0; i < a.length(); i++) {
        freq[a.charAt(i) - 'a']++;
        freq[b.charAt(i) - 'a']--;
    }

    for (int count : freq) {
        if (count != 0) return false;
    }
    return true;
}`,
      cpp: `bool isAnagram(string a, string b) {
    if (a.size() != b.size()) return false;
    vector<int> freq(26, 0);

    for (int i = 0; i < a.size(); i++) {
        freq[a[i] - 'a']++;
        freq[b[i] - 'a']--;
    }

    for (int c : freq) {
        if (c != 0) return false;
    }
    return true;
}`,
      python: `def is_anagram(a, b):
    a = a.replace(" ", "").lower()
    b = b.replace(" ", "").lower()
    if len(a) != len(b):
        return False

    freq = [0] * 26
    for i in range(len(a)):
        freq[ord(a[i]) - 97] += 1
        freq[ord(b[i]) - 97] -= 1

    return all(c == 0 for c in freq)`
    },
    {
      id: 2,
      question: "Find the longest substring without repeating characters",
      java: `public static int longestUniqueSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left++));
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      cpp: `int longestUniqueSubstring(string s) {
    unordered_set<char> st;
    int left = 0, maxLen = 0;

    for (int right = 0; right < s.size(); right++) {
        while (st.count(s[right])) {
            st.erase(s[left++]);
        }
        st.insert(s[right]);
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      python: `def longest_unique_substring(s):
    char_set = set()
    left = 0
    max_len = 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)

    return max_len`
    },
    {
      id: 3,
      question: "Find the second largest element in an array",
      java: `public static int findSecondMax(int[] arr) {
    int max = Integer.MIN_VALUE;
    int secondMax = Integer.MIN_VALUE;

    for (int num : arr) {
        if (num > max) {
            secondMax = max;
            max = num;
        } else if (num > secondMax && num != max) {
            secondMax = num;
        }
    }
    return secondMax;
}`,
      cpp: `int findSecondMax(vector<int>& arr) {
    int maxVal = INT_MIN, secondMax = INT_MIN;
    for (int num : arr) {
        if (num > maxVal) {
            secondMax = maxVal;
            maxVal = num;
        } else if (num > secondMax && num != maxVal) {
            secondMax = num;
        }
    }
    return secondMax;
}`,
      python: `def find_second_max(arr):
    max_val = float('-inf')
    second_max = float('-inf')

    for num in arr:
        if num > max_val:
            second_max = max_val
            max_val = num
        elif num > second_max and num != max_val:
            second_max = num

    return second_max`
    },
    {
      id: 4,
      question: "Reverse a string using recursion",
      java: `public static String reverseString(String s) {
    if (s.isEmpty()) return s;
    return reverseString(s.substring(1)) + s.charAt(0);
}`,
      cpp: `string reverseString(string s) {
    if (s.empty()) return s;
    return reverseString(s.substr(1)) + s[0];
}`,
      python: `def reverse_string(s):
    if s == "":
        return s
    return reverse_string(s[1:]) + s[0]`
    },
    {
      id: 5,
      question: "Find the first non-repeating character in a string",
      java: `public static char firstNonRepeating(String s) {
    Map<Character, Integer> freq = new LinkedHashMap<>();
    for (char c : s.toCharArray()) {
        freq.put(c, freq.getOrDefault(c, 0) + 1);
    }
    for (Map.Entry<Character, Integer> entry : freq.entrySet()) {
        if (entry.getValue() == 1) return entry.getKey();
    }
    return '_';
}`,
      cpp: `char firstNonRepeating(string s) {
    unordered_map<char, int> freq;
    for (char c : s) freq[c]++;
    for (char c : s) {
        if (freq[c] == 1) return c;
    }
    return '_';
}`,
      python: `from collections import OrderedDict

def first_non_repeating(s):
    freq = OrderedDict()
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    for k, v in freq.items():
        if v == 1:
            return k
    return '_'`
    },
    {
      id: 6,
      question: "Check whether a linked list has a loop (cycle detection)",
      java: `class Node {
    int data;
    Node next;
}

public static boolean hasCycle(Node head) {
    Node slow = head, fast = head;

    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      cpp: `struct Node {
    int data;
    Node* next;
};

bool hasCycle(Node* head) {
    Node* slow = head;
    Node* fast = head;

    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
      python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


def has_cycle(head):
    slow = head
    fast = head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`
    },
    {
      id: 7,
      question: "Find the missing number in an array from 1 to N",
      java: `public static int findMissing(int[] arr, int n) {
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : arr) actualSum += num;
    return expectedSum - actualSum;
}`,
      cpp: `int findMissing(vector<int>& arr, int n) {
    int expectedSum = n * (n + 1) / 2;
    int actualSum = 0;
    for (int num : arr) actualSum += num;
    return expectedSum - actualSum;
}`,
      python: `def find_missing(arr, n):
    expected_sum = n * (n + 1) // 2
    return expected_sum - sum(arr)`
    },
    {
      id: 8,
      question: "Find the maximum subarray sum (Kadane’s Algorithm)",
      java: `public static int maxSubArray(int[] nums) {
    int maxSoFar = nums[0];
    int currMax = nums[0];

    for (int i = 1; i < nums.length; i++) {
        currMax = Math.max(nums[i], currMax + nums[i]);
        maxSoFar = Math.max(maxSoFar, currMax);
    }
    return maxSoFar;
}`,
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxSoFar = nums[0];
    int currMax = nums[0];

    for (int i = 1; i < nums.size(); i++) {
        currMax = max(nums[i], currMax + nums[i]);
        maxSoFar = max(maxSoFar, currMax);
    }
    return maxSoFar;
}`,
      python: `def max_subarray(nums):
    max_so_far = nums[0]
    curr_max = nums[0]

    for i in range(1, len(nums)):
        curr_max = max(nums[i], curr_max + nums[i])
        max_so_far = max(max_so_far, curr_max)

    return max_so_far`
    },
    {
      id: 9,
      question: "Check whether a number is a power of two",
      java: `public static boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      cpp: `bool isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      python: `def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`
    },
    {
      id: 10,
      question: "Sort an array using merge sort",
      java: `public static void mergeSort(int[] arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

private static void merge(int[] arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    int[] L = new int[n1];
    int[] R = new int[n2];

    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`,
      cpp: `void merge(vector<int>& arr, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;

    vector<int> L(n1), R(n2);
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }

    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l < r) {
        int m = (l + r) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}`,
      python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]

        merge_sort(L)
        merge_sort(R)

        i = j = k = 0
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1

        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1

        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1

    return arr`
    }
  ];

  /* =============================
     SQL QUESTIONS — DIGITAL
     ============================= */

  const sqlQuestions = [
    {
      id: 1,
      question: "Write a query to find the Nth highest salary from an Employee table.",
      answer: `SELECT DISTINCT salary
FROM Employee e1
WHERE (
    SELECT COUNT(DISTINCT salary)
    FROM Employee e2
    WHERE e2.salary >= e1.salary
) = N;`
    },
    {
      id: 2,
      question: "Write a query to get the highest salary in each department.",
      answer: `SELECT department_id, MAX(salary) AS highest_salary
FROM Employee
GROUP BY department_id;`
    },
    {
      id: 3,
      question: "Write a query to find employees who earn more than their manager.",
      answer: `SELECT e.name
FROM Employee e
JOIN Employee m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;`
    },
    {
      id: 4,
      question: "Write a query to retrieve duplicate records from a table.",
      answer: `SELECT name, email, COUNT(*)
FROM Employee
GROUP BY name, email
HAVING COUNT(*) > 1;`
    },
    {
      id: 5,
      question: "Write a query to delete duplicate rows while keeping one record.",
      answer: `WITH cte AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY employee_id) AS rn
  FROM Employee
)
DELETE FROM cte WHERE rn > 1;`
    },
    {
      id: 6,
      question: "Write a query to get the department-wise average salary.",
      answer: `SELECT department_id, AVG(salary) AS avg_salary
FROM Employee
GROUP BY department_id;`
    },
    {
      id: 7,
      question: "Write a query to fetch the top 3 highest-paid employees.",
      answer: `SELECT *
FROM Employee
ORDER BY salary DESC
LIMIT 3;`
    },
    {
      id: 8,
      question: "Write a query to find departments with more than 5 employees.",
      answer: `SELECT department_id
FROM Employee
GROUP BY department_id
HAVING COUNT(*) > 5;`
    },
    {
      id: 9,
      question: "Write a query to get employees who did not receive any bonus.",
      answer: `SELECT *
FROM Employee
WHERE bonus IS NULL OR bonus = 0;`
    },
    {
      id: 10,
      question: "Write a query to display the second highest salary in each department.",
      answer: `SELECT department_id, salary
FROM (
  SELECT department_id, salary,
         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
  FROM Employee
) t
WHERE rnk = 2;`
    }
  ];

  /* =============================
     TECHNICAL — DIGITAL
     ============================= */

  const technicalQuestions = [
    { id: 1, question: "Explain OOPS concepts with real-time examples.", answer: "OOPS includes Encapsulation (hiding data with getters/setters, e.g., BankAccount), Inheritance (reusing code, e.g., Vehicle → Car), Polymorphism (same interface, different behavior, e.g., draw() in Shape), and Abstraction (exposing only essential features, e.g., ATM interface)." },
    { id: 2, question: "What is the difference between abstract class and interface?", answer: "Abstract class can have method implementations and state, supports single inheritance. Interface defines a contract, supports multiple inheritance, and methods are public by default." },
    { id: 3, question: "Explain JVM architecture and how Java code is executed.", answer: "Java source → compiled to bytecode → ClassLoader loads it → Bytecode Verifier checks → Execution Engine (Interpreter/JIT) runs it → Runtime Data Areas (Heap, Stack, Method Area) manage memory." },
    { id: 4, question: "What is the difference between process and thread?", answer: "Process is an independent program in execution with its own memory space. Thread is a lightweight unit within a process sharing memory. Threads are faster to create and communicate." },
    { id: 5, question: "What are deadlocks? How can they be prevented?", answer: "Deadlock is a situation where processes wait indefinitely for resources. Prevent by avoiding circular wait, using timeouts, resource ordering, or deadlock detection algorithms." },
    { id: 6, question: "Explain normalization and its different forms.", answer: "Normalization organizes data to reduce redundancy. 1NF: atomic values, 2NF: no partial dependency, 3NF: no transitive dependency, BCNF: stricter version of 3NF." },
    { id: 7, question: "What is REST API? Explain GET, POST, PUT, and DELETE.", answer: "REST API uses HTTP methods. GET retrieves data, POST creates data, PUT updates existing data, DELETE removes data. It is stateless and resource-based." },
    { id: 8, question: "What is the difference between Stack and Heap memory?", answer: "Stack stores method calls and local variables, fast and limited. Heap stores objects, dynamic and larger, managed by garbage collection." },
    { id: 9, question: "Explain time complexity. What is O(n), O(log n), and O(n²)?", answer: "Time complexity measures performance. O(n) is linear, O(log n) is logarithmic (binary search), O(n²) is quadratic (nested loops)." },
    { id: 10, question: "What is cloud computing? Explain IaaS, PaaS, and SaaS.", answer: "Cloud computing provides computing services over the internet. IaaS: infrastructure (AWS EC2), PaaS: platform for development (Heroku), SaaS: software apps (Gmail)." }
  ];

  /* =============================
     MANAGERIAL — DIGITAL
     ============================= */

  const managerialQuestions = [
    { id: 1, question: "Tell me about a time you handled a conflict in a team.", answer: "Describe the situation, how you listened to both sides, facilitated communication, and helped reach a solution." },
    { id: 2, question: "How do you prioritize tasks when working under tight deadlines?", answer: "Explain using urgency vs importance, breaking tasks, and communicating early about blockers." },
    { id: 3, question: "Describe a situation where you took ownership of a problem.", answer: "Use STAR method and show accountability, initiative, and positive results." },
    { id: 4, question: "How do you handle failure or criticism?", answer: "Show learning mindset, accepting feedback, and improving performance." },
    { id: 5, question: "Have you ever led a team? What was your leadership style?", answer: "Explain collaborative or supportive leadership with example." },
    { id: 6, question: "How do you adapt to new technologies or tools quickly?", answer: "Mention self-learning, documentation, hands-on practice, and asking for mentorship." },
    { id: 7, question: "Describe a time you worked with a difficult team member.", answer: "Explain empathy, communication, and conflict resolution." },
    { id: 8, question: "How do you ensure effective communication in a team?", answer: "Mention regular updates, documentation, and active listening." },
    { id: 9, question: "What would you do if your team disagrees with your approach?", answer: "Explain open discussion, evaluating alternatives, and aligning with team goals." },
    { id: 10, question: "Why do you want to join TCS Digital, and how do you see yourself contributing?", answer: "Talk about innovation, digital transformation, and your technical strengths." }
  ];

  /* =============================
     HR — DIGITAL
     ============================= */

  const hrQuestions = [
    { id: 1, question: "Tell me about yourself.", answer: "Brief education, skills, projects, and career goals aligned with digital technologies." },
    { id: 2, question: "Why do you want to join TCS Digital?", answer: "Mention innovation, digital transformation, and learning opportunities." },
    { id: 3, question: "What are your strengths and weaknesses?", answer: "Highlight technical strengths and a weakness you are improving." },
    { id: 4, question: "Where do you see yourself in 5 years?", answer: "Talk about becoming a strong digital/tech professional and leader." },
    { id: 5, question: "Why should we hire you for the Digital role?", answer: "Explain problem-solving skills, technical knowledge, and adaptability." },
    { id: 6, question: "Are you willing to relocate or work in shifts?", answer: "Be honest and flexible." },
    { id: 7, question: "Describe a situation where you worked under pressure.", answer: "Give example of handling deadlines successfully." },
    { id: 8, question: "How do you handle conflict or disagreement at work?", answer: "Explain professional and solution-oriented approach." },
    { id: 9, question: "What do you know about TCS and its values?", answer: "Mention integrity, innovation, and customer focus." },
    { id: 10, question: "Do you have any questions for us?", answer: "Ask about growth, learning, and projects." }
  ];

  /* =============================
     SHARED COMPONENTS (UNCHANGED)
     ============================= */

  type QuestionType = {
    id: number;
    question: string;
    java?: string;
    cpp?: string;
    python?: string;
    answer?: string;
  };

  const QuestionCard = ({ questions, title, isCoding }: { questions: QuestionType[]; title: string; isCoding?: boolean }) => (
    <div className="mb-12">
      <h3 className="text-2xl md:text-3xl font-bold mb-8 text-blue-500 dark:text-purple-400">{title}</h3>
      <div className="space-y-4">
        {questions.map((item: QuestionType) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              role="button"
              tabIndex={0}
              onClick={() => toggleQuestion(item.id)}
              onKeyDown={(e) => handleKeyToggle(e, item.id)}
              className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <CardContent className="p-6 w-full text-left">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-semibold text-black dark:text-white mb-2">
                      Q{item.id}. {item.question}
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: expandedQuestion === item.id ? 180 : 0 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDown className="w-5 h-5 text-blue-500 dark:text-purple-400" />
                  </motion.div>
                </div>

                {expandedQuestion === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  >
                    {isCoding ? (
                      <div>
                        <div className="flex gap-2 mb-4">
                          {["java", "cpp", "python"].map((lang) => (
                            <button
                              key={lang}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedLanguage(lang as "java" | "cpp" | "python");
                              }}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                                selectedLanguage === lang
                                  ? "bg-indigo-600 text-white"
                                  : "bg-gray-100 text-gray-600 dark:text-gray-300 hover:bg-gray-200"
                              }`}
                            >
                              {lang.toUpperCase()}
                            </button>
                          ))}
                        </div>

                        <SyntaxHighlighter
                          language={selectedLanguage === "cpp" ? "cpp" : selectedLanguage}
                          style={vscDarkPlus}
                          wrapLongLines
                          customStyle={{
                            margin: 0,
                            borderRadius: 8,
                            padding: "1rem",
                            border: "1px solid #1f2937",
                            backgroundColor: "#0f172a",
                          }}
                        >
                          {(selectedLanguage === "java"
                            ? item.java
                            : selectedLanguage === "cpp"
                            ? item.cpp
                            : item.python) || ""}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <div>
                        <span className="text-blue-500 dark:text-purple-400 font-semibold block mb-3">Answer:</span>
                        {activeSection === "sql" ? (
                          <SyntaxHighlighter
                            language="sql"
                            style={vscDarkPlus}
                            wrapLongLines
                            customStyle={{
                              margin: 0,
                              borderRadius: 8,
                              padding: "1rem",
                              border: "1px solid #1f2937",
                              backgroundColor: "#0f172a",
                            }}
                          >
                            {item.answer || ""}
                          </SyntaxHighlighter>
                        ) : (
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const getSectionQuestions = () => {
    switch (activeSection) {
      case "coding":
        return codingQuestions;
      case "sql":
        return sqlQuestions;
      case "technical":
        return technicalQuestions;
      case "managerial":
        return managerialQuestions;
      case "hr":
        return hrQuestions;
      default:
        return codingQuestions;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case "coding":
        return "Coding Questions";
      case "sql":
        return "SQL Questions";
      case "technical":
        return "Technical Interview Questions";
      case "managerial":
        return "Managerial Interview Questions";
      case "hr":
        return "HR Interview Questions";
      default:
        return "Coding Questions";
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="flex min-h-screen">
        <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <Link href="/" className="inline-flex items-center gap-2 text-blue-500 dark:text-purple-400 hover:text-indigo-700 mb-8 transition font-semibold">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="mb-8">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Menu</h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setExpandedQuestion(null);
                        setActiveSection(item.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                        isActive
                          ? "bg-gray-900 text-white font-semibold"
                          : "text-gray-600 dark:text-gray-300 hover:text-black dark:text-white hover:bg-gray-100"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 text-sm mb-2">Pro Tip</h3>
              <p className="text-xs text-indigo-800 leading-relaxed">
                Practice advanced DSA and SQL daily to stay sharp for the Digital profile.
              </p>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <section className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="px-8 py-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">⚡</span>
                  <div>
                    <h1 className="text-4xl font-bold text-black dark:text-white">TCS Digital Profile</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Advanced Problem-Solving & System Thinking</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-8 py-12">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} className="mb-12">
              <h2 className="text-4xl font-bold text-center mb-2 text-black dark:text-white">{getSectionTitle()}</h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                These questions focus on deeper technical understanding and real-world problem solving for the TCS Digital profile.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <QuestionCard questions={getSectionQuestions()} title={getSectionTitle()} isCoding={activeSection === "coding"} />

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mt-12">
                <Link href="/digital/more">
                  <Button className="rounded-full px-10 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all">
                    See More Digital-Level Challenges →
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          <footer className="px-8 py-12 border-t border-gray-200 dark:border-gray-700 text-center bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Think deeper. Code smarter. Lead with impact.</p>
            <p className="text-gray-500 text-sm">© 2026 TCS Interview Bundle. All rights reserved.</p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function DigitalPage() {
  return (
    <ProtectedRoute>
      <TCSDigitalPage />
    </ProtectedRoute>
  );
}
