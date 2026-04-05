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

function TCSPrimePage() {
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

  const codingQuestions = [
    {
      id: 1,
      question: "Check whether a number is prime.",
      java: `public static boolean isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}`,
      cpp: `bool isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0)
            return false;
    }
    return true;
}`,
      python: `def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True`
    },
    {
      id: 2,
      question: "Find the factorial of a number.",
      java: `public static long factorial(int n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
      cpp: `long factorial(int n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    
    long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
      python: `def factorial(n):
    if n < 0:
        return -1
    if n == 0 or n == 1:
        return 1
    
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result`
    },
    {
      id: 3,
      question: "Check whether a string or number is a palindrome.",
      java: `// Check number palindrome
public static boolean isPalindromeNumber(int n) {
    int original = n;
    int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n /= 10;
    }
    return original == reversed;
}

// Check string palindrome
public static boolean isPalindromeString(String s) {
    s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right))
            return false;
        left++; right--;
    }
    return true;
}`,
      cpp: `// Check number palindrome
bool isPalindromeNumber(int n) {
    int original = n;
    int reversed = 0;
    while (n > 0) {
        reversed = reversed * 10 + (n % 10);
        n /= 10;
    }
    return original == reversed;
}

// Check string palindrome
bool isPalindromeString(string s) {
    string cleaned = "";
    for (char c : s) {
        if (isalnum(c)) {
            cleaned += tolower(c);
        }
    }
    int left = 0, right = cleaned.length() - 1;
    while (left < right) {
        if (cleaned[left] != cleaned[right])
            return false;
        left++; right--;
    }
    return true;
}`,
      python: `# Check number palindrome
def is_palindrome_number(n):
    original = n
    reversed_num = 0
    while n > 0:
        reversed_num = reversed_num * 10 + (n % 10)
        n //= 10
    return original == reversed_num

# Check string palindrome
def is_palindrome_string(s):
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    left, right = 0, len(cleaned) - 1
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False
        left += 1
        right -= 1
    return True`
    },
    {
      id: 4,
      question: "Find the Fibonacci series up to N terms.",
      java: `public static void fibonacci(int n) {
    if (n <= 0) return;
    
    long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        System.out.print(a + " ");
        long temp = a + b;
        a = b;
        b = temp;
    }
}

// Return as array
public static long[] fibonacciArray(int n) {
    long[] arr = new long[n];
    if (n >= 1) arr[0] = 0;
    if (n >= 2) arr[1] = 1;
    
    for (int i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr;
}`,
      cpp: `void fibonacci(int n) {
    if (n <= 0) return;
    
    long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        cout << a << " ";
        long temp = a + b;
        a = b;
        b = temp;
    }
}

// Return as vector
vector<long> fibonacciArray(int n) {
    vector<long> arr(n);
    if (n >= 1) arr[0] = 0;
    if (n >= 2) arr[1] = 1;
    
    for (int i = 2; i < n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2];
    }
    return arr;
}`,
      python: `def fibonacci(n):
    if n <= 0:
        return []
    
    fib_series = []
    a, b = 0, 1
    for _ in range(n):
        fib_series.append(a)
        a, b = b, a + b
    
    return fib_series

# Print Fibonacci series
def print_fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b`
    },
    {
      id: 5,
      question: "Find the largest and second largest element in an array.",
      java: `public static void findLargestAndSecondLargest(int[] arr) {
    if (arr.length < 2) {
        System.out.println("Array must have at least 2 elements");
        return;
    }
    
    int largest = Integer.MIN_VALUE;
    int secondLargest = Integer.MIN_VALUE;
    
    for (int num : arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num != largest) {
            secondLargest = num;
        }
    }
    
    System.out.println("Largest: " + largest);
    System.out.println("Second Largest: " + secondLargest);
}`,
      cpp: `void findLargestAndSecondLargest(vector<int>& arr) {
    if (arr.size() < 2) {
        cout << "Array must have at least 2 elements";
        return;
    }
    
    int largest = INT_MIN;
    int secondLargest = INT_MIN;
    
    for (int num : arr) {
        if (num > largest) {
            secondLargest = largest;
            largest = num;
        } else if (num > secondLargest && num != largest) {
            secondLargest = num;
        }
    }
    
    cout << "Largest: " << largest << endl;
    cout << "Second Largest: " << secondLargest << endl;
}`,
      python: `def find_largest_and_second_largest(arr):
    if len(arr) < 2:
        print("Array must have at least 2 elements")
        return
    
    largest = float('-inf')
    second_largest = float('-inf')
    
    for num in arr:
        if num > largest:
            second_largest = largest
            largest = num
        elif num > second_largest and num != largest:
            second_largest = num
    
    print(f"Largest: {largest}")
    print(f"Second Largest: {second_largest}")`
    },
    {
      id: 6,
      question: "Reverse a string or array.",
      java: `// Reverse string
public static String reverseString(String s) {
    return new StringBuilder(s).reverse().toString();
}

// Reverse string without built-in
public static String reverseStringManual(String s) {
    char[] arr = s.toCharArray();
    int left = 0, right = arr.length - 1;
    while (left < right) {
        char temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++; right--;
    }
    return new String(arr);
}

// Reverse array
public static void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++; right--;
    }
}`,
      cpp: `// Reverse string
string reverseString(string s) {
    reverse(s.begin(), s.end());
    return s;
}

// Reverse string without built-in
string reverseStringManual(string s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        swap(s[left], s[right]);
        left++; right--;
    }
    return s;
}

// Reverse array
void reverseArray(vector<int>& arr) {
    int left = 0, right = arr.size() - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++; right--;
    }
}`,
      python: `# Reverse string
def reverse_string(s):
    return s[::-1]

# Reverse string manually
def reverse_string_manual(s):
    arr = list(s)
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return ''.join(arr)

# Reverse array
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1`
    },
    {
      id: 7,
      question: "Count the number of vowels and consonants in a string.",
      java: `public static void countVowelsConsonants(String s) {
    int vowels = 0, consonants = 0;
    s = s.toLowerCase();
    
    for (char c : s.toCharArray()) {
        if (c >= 'a' && c <= 'z') {
            if ("aeiou".indexOf(c) != -1) {
                vowels++;
            } else {
                consonants++;
            }
        }
    }
    
    System.out.println("Vowels: " + vowels);
    System.out.println("Consonants: " + consonants);
}`,
      cpp: `void countVowelsConsonants(string s) {
    int vowels = 0, consonants = 0;
    transform(s.begin(), s.end(), s.begin(), ::tolower);
    
    for (char c : s) {
        if (c >= 'a' && c <= 'z') {
            if (string("aeiou").find(c) != string::npos) {
                vowels++;
            } else {
                consonants++;
            }
        }
    }
    
    cout << "Vowels: " << vowels << endl;
    cout << "Consonants: " << consonants << endl;
}`,
      python: `def count_vowels_consonants(s):
    vowels = 0
    consonants = 0
    s = s.lower()
    
    for c in s:
        if c.isalpha():
            if c in 'aeiou':
                vowels += 1
            else:
                consonants += 1
    
    print(f"Vowels: {vowels}")
    print(f"Consonants: {consonants}")`
    },
    {
      id: 8,
      question: "Find the missing number in a sequence.",
      java: `public static int findMissing(int[] arr) {
    int n = arr.length + 1;
    long expectedSum = (long) n * (n + 1) / 2;
    long actualSum = 0;
    
    for (int num : arr) {
        actualSum += num;
    }
    
    return (int) (expectedSum - actualSum);
}

// Alternative using XOR
public static int findMissingXOR(int[] arr) {
    int xor1 = 0, xor2 = 0;
    int n = arr.length + 1;
    
    for (int i = 1; i <= n; i++) {
        xor1 ^= i;
    }
    
    for (int num : arr) {
        xor2 ^= num;
    }
    
    return xor1 ^ xor2;
}`,
      cpp: `int findMissing(vector<int>& arr) {
    int n = arr.size() + 1;
    long expectedSum = (long) n * (n + 1) / 2;
    long actualSum = 0;
    
    for (int num : arr) {
        actualSum += num;
    }
    
    return expectedSum - actualSum;
}

// Alternative using XOR
int findMissingXOR(vector<int>& arr) {
    int xor1 = 0, xor2 = 0;
    int n = arr.size() + 1;
    
    for (int i = 1; i <= n; i++) {
        xor1 ^= i;
    }
    
    for (int num : arr) {
        xor2 ^= num;
    }
    
    return xor1 ^ xor2;
}`,
      python: `def find_missing(arr):
    n = len(arr) + 1
    expected_sum = n * (n + 1) // 2
    actual_sum = sum(arr)
    
    return expected_sum - actual_sum

# Alternative using XOR
def find_missing_xor(arr):
    xor1 = 0
    xor2 = 0
    n = len(arr) + 1
    
    for i in range(1, n + 1):
        xor1 ^= i
    
    for num in arr:
        xor2 ^= num
    
    return xor1 ^ xor2`
    },
    {
      id: 9,
      question: "Check whether a number is an Armstrong number.",
      java: `public static boolean isArmstrong(int n) {
    int original = n;
    int numDigits = String.valueOf(n).length();
    int sum = 0;
    
    while (n > 0) {
        int digit = n % 10;
        sum += Math.pow(digit, numDigits);
        n /= 10;
    }
    
    return sum == original;
}`,
      cpp: `bool isArmstrong(int n) {
    int original = n;
    int numDigits = to_string(n).length();
    int sum = 0;
    
    while (n > 0) {
        int digit = n % 10;
        sum += pow(digit, numDigits);
        n /= 10;
    }
    
    return sum == original;
}`,
      python: `def is_armstrong(n):
    original = n
    num_digits = len(str(n))
    total = 0
    
    while n > 0:
        digit = n % 10
        total += digit ** num_digits
        n //= 10
    
    return total == original`
    },
    {
      id: 10,
      question: "Implement basic sorting algorithms (Bubble, Insertion, Selection).",
      java: `// Bubble Sort
public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Insertion Sort
public static void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Selection Sort
public static void selectionSort(int[] arr) {
    for (int i = 0; i < arr.length - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
      cpp: `// Bubble Sort
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Insertion Sort
void insertionSort(vector<int>& arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Selection Sort
void selectionSort(vector<int>& arr) {
    for (int i = 0; i < arr.size() - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < arr.size(); j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
      python: `# Bubble Sort
def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

# Insertion Sort
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key

# Selection Sort
def selection_sort(arr):
    for i in range(len(arr) - 1):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`
    }
  ];

  const sqlQuestions = [
    {
      id: 1,
      question: "Write a query to find the second highest salary from an Employee table.",
      answer: `SELECT MAX(salary) AS second_highest_salary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

-- Alternative using OFFSET
SELECT salary FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;`
    },
    {
      id: 2,
      question: "Write a query to retrieve the highest salary in each department.",
      answer: `SELECT d.department_name, MAX(e.salary) AS highest_salary
FROM Employee e
JOIN Department d ON e.department_id = d.department_id
GROUP BY d.department_id, d.department_name
ORDER BY highest_salary DESC;`
    },
    {
      id: 3,
      question: "Write a query to find employees who earn more than their manager.",
      answer: `SELECT e.employee_id, e.name, e.salary, m.name AS manager_name, m.salary AS manager_salary
FROM Employee e
INNER JOIN Employee m ON e.manager_id = m.employee_id
WHERE e.salary > m.salary
ORDER BY e.salary DESC;`
    },
    {
      id: 4,
      question: "Write a query to get duplicate records from a table.",
      answer: `SELECT employee_id, name, email, COUNT(*) AS occurrences
FROM Employee
GROUP BY employee_id, name, email
HAVING COUNT(*) > 1;`
    },
    {
      id: 5,
      question: "Write a query to delete duplicate rows while keeping one record.",
      answer: `-- Method 1: Using NOT IN with MIN
DELETE FROM Employee
WHERE employee_id NOT IN (
    SELECT MIN(employee_id)
    FROM Employee
    GROUP BY email, name
);

-- Method 2: Using CTE and ROW_NUMBER
WITH cte AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY email, name ORDER BY employee_id) AS rn
    FROM Employee
)
DELETE FROM cte WHERE rn > 1;`
    },
    {
      id: 6,
      question: "Write a query to find the average salary of employees in each department.",
      answer: `SELECT d.department_id, d.department_name, 
       AVG(e.salary) AS average_salary,
       COUNT(e.employee_id) AS employee_count
FROM Employee e
RIGHT JOIN Department d ON e.department_id = d.department_id
GROUP BY d.department_id, d.department_name
ORDER BY average_salary DESC;`
    },
    {
      id: 7,
      question: "Write a query to fetch the top 3 highest-paid employees.",
      answer: `SELECT employee_id, name, salary
FROM Employee
ORDER BY salary DESC
LIMIT 3;`
    },
    {
      id: 8,
      question: "Write a query to find departments with more than 5 employees.",
      answer: `SELECT d.department_id, d.department_name, COUNT(e.employee_id) AS employee_count
FROM Department d
LEFT JOIN Employee e ON d.department_id = e.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(e.employee_id) > 5
ORDER BY employee_count DESC;`
    },
    {
      id: 9,
      question: "Write a query to get employees who did not receive any bonus.",
      answer: `SELECT e.employee_id, e.name, e.salary
FROM Employee e
LEFT JOIN Bonus b ON e.employee_id = b.employee_id
WHERE b.employee_id IS NULL
ORDER BY e.name;`
    },
    {
      id: 10,
      question: "Write a query to display the second highest salary in each department.",
      answer: `SELECT d.department_name, e.salary AS second_highest
FROM (
    SELECT department_id, salary,
           ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk
    FROM Employee
) e
JOIN Department d ON e.department_id = d.department_id
WHERE e.rnk = 2
ORDER BY d.department_name;`
    }
  ];

  const technicalQuestions = [
    {
      id: 1,
      question: "Explain OOPS concepts (Encapsulation, Inheritance, Polymorphism, Abstraction) with examples.",
      answer: "OOPS has 4 main pillars: 1) Encapsulation (bundling data and methods, hiding internal details, example: Bank Account with private balance and public deposit/withdraw methods), 2) Inheritance (reusing code, parent-child relationship, example: Vehicle → Car, Bike, Animal → Dog, Cat), 3) Polymorphism (many forms, same method different behavior, example: Shape.draw() works for Circle and Rectangle differently), 4) Abstraction (hiding complexity, showing only essential features, example: ATM interface hiding internal operations). These concepts improve code reusability, maintainability, and modularity."
    },
    {
      id: 2,
      question: "Difference between abstract class and interface.",
      answer: "Abstract class: can have abstract and concrete methods, constructors, access modifiers (private, protected, public), instance variables, single inheritance. Interface: only abstract methods (before Java 8), no constructors, all public by default, only constants, multiple inheritance. Java 8+ added default and static methods in interfaces. Use abstract class for 'is-a' relationship and shared code, use interface for 'can-do' capability and contract."
    },
    {
      id: 3,
      question: "What is SDLC and its phases?",
      answer: "SDLC (Software Development Life Cycle) is a process for designing, developing, and testing software. Phases: 1) Planning (feasibility, requirements, resources), 2) Analysis (detailed requirements gathering, system specifications), 3) Design (architecture, database design, UI/UX design), 4) Development (coding, unit testing), 5) Testing (QA testing, bug fixing), 6) Deployment (release to production), 7) Maintenance (bug fixes, updates, support). Common models: Waterfall (sequential), Agile (iterative), DevOps (continuous integration)."
    },
    {
      id: 4,
      question: "Explain stack vs heap memory.",
      answer: "Stack: stores primitive values and object references, LIFO (Last In First Out), faster access, automatically freed when out of scope, limited size, thread-safe per thread. Heap: stores actual objects and arrays, slower access than stack, managed by garbage collector, larger size, shared among threads (not thread-safe for concurrent access). Stack overflow occurs with deep recursion, Heap overflow with too many objects. Each thread has its own stack but shares the heap."
    },
    {
      id: 5,
      question: "What is a database index and why is it used?",
      answer: "Database index is a data structure (like B-tree) that improves query performance by reducing the number of disk accesses. Types: Primary key index (unique, enforces uniqueness), Unique index (ensures unique values), Composite index (index on multiple columns), Full-text index (for text search). Benefits: faster data retrieval, faster sorting/grouping. Drawbacks: slower insert/update/delete operations, consumes extra disk space. Use indexes on columns frequently used in WHERE clauses and joins."
    },
    {
      id: 6,
      question: "Difference between DELETE, TRUNCATE, and DROP in SQL.",
      answer: "DELETE: removes specific rows based on WHERE condition, slower (logs each deletion), can rollback in transaction, triggers fire, identity seed stays. TRUNCATE: removes all rows without WHERE condition, faster (minimum logging), can rollback in transaction, triggers don't fire, resets identity seed. DROP: removes entire table structure and data, very fast, non-recoverable (unless from backup), frees table space. Use DELETE for specific rows, TRUNCATE for all rows with recovery option, DROP to remove entire table."
    },
    {
      id: 7,
      question: "What is normalization? Explain 1NF, 2NF, 3NF.",
      answer: "Normalization organizes database tables to reduce data redundancy and improve integrity. 1NF (First Normal Form): eliminate duplicate columns, ensure atomic values (no repeating groups). 2NF (Second Normal Form): 1NF + remove partial dependencies (non-key attributes depend on entire primary key). 3NF (Third Normal Form): 2NF + remove transitive dependencies (non-key attributes depend only on primary key, not on other non-key attributes). Higher normal forms ensure data consistency but may require more joins during queries."
    },
    {
      id: 8,
      question: "Explain time complexity with examples of O(n), O(log n), O(n²).",
      answer: "Time complexity measures algorithm efficiency relative to input size. O(1): constant (direct array access), O(log n): logarithmic (binary search), O(n): linear (single loop through array), O(n log n): efficient sorting (merge sort, quick sort), O(n²): quadratic (nested loops, bubble sort), O(2^n): exponential (recursive without memoization, very slow). Generally, O(log n) > O(n) > O(n²) > O(2^n) in performance. Choose algorithms with lower complexity for large datasets."
    },
    {
      id: 9,
      question: "What are threads and processes? Difference between them.",
      answer: "Process: independent program execution with separate memory space, heavier (slower to create), isolated from other processes. Thread: lightweight process within a process, shares memory with other threads, faster to create, more efficient. Multiple threads in one process can communicate via shared memory but require synchronization to avoid race conditions. Context switching between threads is faster. Each process has its own memory, while threads share heap memory."
    },
    {
      id: 10,
      question: "What is a REST API? Explain GET, POST, PUT, DELETE methods.",
      answer: "REST (Representational State Transfer) is an architecture for web services using HTTP protocols. HTTP Methods: GET (retrieve data, safe, idempotent), POST (create new resource, not idempotent), PUT (update entire resource, idempotent), DELETE (remove resource, idempotent), PATCH (partial update). REST uses standard HTTP status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found, 500 Internal Server Error). Stateless communication, client-server model, typically uses JSON/XML for data exchange."
    }
  ];

  const managerialQuestions = [
    {
      id: 1,
      question: "Tell me about a time you led a team and how you handled it.",
      answer: "Describe team size, project, and your leadership approach. Highlight: delegation of tasks, motivation techniques, conflict resolution, decision-making, how you achieved project goals, and team member growth. Share specific metrics or outcomes. Show that you inspire trust, listen to team input, and focus on collective success over personal achievement."
    },
    {
      id: 2,
      question: "How do you prioritize tasks when multiple deadlines clash?",
      answer: "Explain your systematic approach: assess urgency (deadline proximity) and importance (business impact, stakeholder priority). Use tools like Eisenhower matrix or project management software. Break large tasks into smaller ones. Communicate with stakeholders about realistic timelines. Delegate when possible. Focus on high-impact items first. Show flexibility and ability to reprioritize based on changing needs."
    },
    {
      id: 3,
      question: "Describe a situation where you resolved a conflict in your team.",
      answer: "Use STAR method: describe the conflict (different opinions, personality clash), your role, how you approached it professionally (listened to both sides, found common ground, focused on project goals), solution implemented, and positive outcome. Emphasize communication, empathy, and collaborative problem-solving. Show that you prioritize team harmony and project success."
    },
    {
      id: 4,
      question: "Have you ever failed at a task? How did you handle it?",
      answer: "Be honest about a failure without making excuses. Explain what went wrong, your responsibility, immediate actions taken to mitigate damage, root cause analysis, lessons learned, and how you prevented similar failures. Show resilience, accountability, and growth mindset. Demonstrate that you can bounce back and use failures as learning opportunities."
    },
    {
      id: 5,
      question: "How do you motivate team members when performance is low?",
      answer: "Explain your approach: understand root causes (lack of clarity, skills gap, personal issues), provide support and resources, set clear expectations and achievable goals, recognize effort and progress, lead by example. Mention one-on-one conversations, mentoring, training opportunities, team building activities. Show that you balance accountability with empathy and invest in team development."
    },
    {
      id: 6,
      question: "Describe a time you took ownership of a difficult problem.",
      answer: "Share an example where you identified a major issue, didn't wait for direction, took initiative, invested significant effort, and solved it. Highlight: problem analysis, resourcefulness, collaboration with team, persistence despite obstacles, and positive impact on project/team. Show accountability, proactivity, and commitment to success beyond role responsibilities."
    },
    {
      id: 7,
      question: "How do you handle disagreements with your manager or peers?",
      answer: "Demonstrate maturity: listen to understand their perspective, express your viewpoint respectfully without being defensive, seek common ground, focus on best outcome for project/team not ego. If you believe you're right, present data/evidence calmly. Know when to escalate. Show that you can accept decisions even if you disagree and implement them professionally."
    },
    {
      id: 8,
      question: "How do you ensure effective communication in a team project?",
      answer: "Describe your approach: regular standups/syncs, clear written documentation, open-door policy, active listening, asking clarifying questions, using collaboration tools. Ensure all stakeholders are informed. Adapt communication style to audience. Share examples of preventing misunderstandings or conflicts through proactive communication. Show you prioritize clarity and transparency."
    },
    {
      id: 9,
      question: "What steps do you take to adapt to new technologies or processes?",
      answer: "Show learning initiative: identify resources (documentation, online courses, mentors, peer learning), allocate time for learning, practice hands-on, apply learning to actual work, seek feedback, mentor others. Mention specific technologies/processes you learned quickly and impact on projects. Demonstrate curiosity, resourcefulness, willingness to invest effort in professional development, and comfort with change."
    },
    {
      id: 10,
      question: "Give an example of when you made a decision under pressure.",
      answer: "Share a high-stakes situation with tight deadline. Explain: the pressure/constraints, how you stayed calm, gathered available information quickly, evaluated options, made decision with available data, took responsibility, and outcome. Highlight decision-making ability, stress management, and confidence. Show that you can prioritize and act decisively even with incomplete information."
    }
  ];

  const hrQuestions = [
    {
      id: 1,
      question: "Tell me about yourself.",
      answer: "Provide a 2-3 minute overview: educational background, relevant experience, key technical and soft skills, major achievements, and why you're interested in TCS Prime. Keep it structured, engaging, and tailored to the role. Include what excites you about the opportunity. Show confidence and enthusiasm. Avoid lengthy personal details; focus on professional qualifications."
    },
    {
      id: 2,
      question: "Why do you want to join TCS Prime?",
      answer: "Research TCS Prime: premium program for top talents, focus on core technologies, mentorship opportunities, career growth, challenging projects. Mention specific reasons: learning from experienced mentors, access to premium resources, exposure to enterprise-scale systems, career advancement opportunities. Show genuine interest in Prime's focus on foundation building and excellence. Demonstrate alignment with company values."
    },
    {
      id: 3,
      question: "What are your strengths and weaknesses?",
      answer: "Strengths: choose 2-3 relevant to the Prime role with specific examples (problem-solving, learning ability, teamwork, technical skills). Weaknesses: pick real ones, explain how you're actively improving them with concrete steps (training, mentorship, practice). Show self-awareness, honesty, and commitment to continuous improvement. Avoid generic answers or strengths unrelated to the role."
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      answer: "Short-term goals: develop expertise in core technologies, deliver quality projects, grow technically and professionally. Long-term vision: technical leadership, architecture roles, team mentoring, or specialized domain expertise. Align with company's growth and industry trends. Show ambition but realistic expectations. Emphasize continuous learning and value creation. Show readiness for Prime program's growth trajectory."
    },
    {
      id: 5,
      question: "Why should we hire you for the Prime program?",
      answer: "Highlight unique value: strong technical foundation, quick learning ability, problem-solving skills, team player, communication skills. Mention achievements and how they demonstrate potential. Connect qualifications to Prime program benefits (mentorship, growth, technical excellence). Show cultural fit, enthusiasm for learning, and commitment to excellence. Explain why Prime program matches your career goals."
    },
    {
      id: 6,
      question: "Are you willing to relocate or work in shifts?",
      answer: "Be honest and realistic. If yes, express willingness clearly. If concerns exist (family, location preference), discuss them professionally and show openness to explore possibilities. Understand TCS Prime's requirements and be prepared to negotiate if needed. Show that it's important but not a dealbreaker. Demonstrate flexibility while being authentic about your situation."
    },
    {
      id: 7,
      question: "Describe a situation where you worked under pressure.",
      answer: "Use STAR method: tight deadline project, critical issue, or multiple priorities. Explain how you stayed calm, prioritized effectively, communicated with team, managed stress, and delivered quality work. Highlight your ability to perform under pressure, problem-solving, and positive attitude. Show resilience and work ethic. Give specific metrics if possible (completed on time, customer satisfaction, quality metrics)."
    },
    {
      id: 8,
      question: "How do you handle conflict or disagreements at work?",
      answer: "Emphasize professionalism and maturity: listen to understand other perspective, express your viewpoint respectfully, avoid blame, focus on solutions, respect different viewpoints. Give a constructive example of disagreement you resolved positively. Show emotional intelligence, communication skills, and that you can separate emotions from issues. Demonstrate commitment to team goals over individual ego."
    },
    {
      id: 9,
      question: "What do you know about TCS and its values?",
      answer: "Research TCS: company size (top 5 IT services), global presence, business segments (consulting, IT services, business solutions), reputation for excellence, values (client focus, integrity, teamwork, excellence). Mention TCS Prime's premium program focus, commitment to developing top talent, and role in digital transformation. Show genuine interest and respect. Reference recent achievements, awards, or CSR initiatives if possible."
    },
    {
      id: 10,
      question: "Do you have any questions for us?",
      answer: "Always ask thoughtful questions: Prime program structure and mentorship model, typical project types and tech stack, learning and development opportunities, team structure and dynamics, career progression paths, company culture in Prime program. Shows genuine interest, engagement, and that you're evaluating fit both ways. Avoid only salary/benefits questions early in interview."
    }
  ];

  const preparationTips = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Master Core Concepts",
      description: "Focus on fundamentals of Data Structures, Algorithms, OOP, and DBMS. Strong foundations make problem-solving easier."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Practice Coding Problems",
      description: "Solve problems on LeetCode, HackerRank, and CodeChef. Start with easy, progress to medium and hard. Aim for 100+ problems."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Prepare Behavioral Stories",
      description: "Create 5-6 STAR-format stories about projects, challenges, teamwork, and achievements. Practice articulating them clearly."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Optimize Your Resume",
      description: "Highlight relevant projects, skills, and achievements. Quantify your impact. Keep it concise (1 page for freshers, 2 for experienced)."
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Mock Interview Practice",
      description: "Practice with friends, mentors, or online platforms. Record yourself, identify areas of improvement, and iterate."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Research the Company",
      description: "Learn about TCS Prime: program structure, mentorship, projects, values, and growth opportunities. Show genuine interest during interviews."
    }
  ];


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
                      animate={{
                        rotate: expandedQuestion === item.id ? 180 : 0,
                      }}
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
                          {/* Language Selector */}
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
                          
                          {/* Code Display */}
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
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
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
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 space-y-8">
            {/* Logo/Back Button */}
            <Link href="/" className="flex items-center gap-2 text-blue-500 dark:text-purple-400 hover:text-indigo-700 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back to Home</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      setExpandedQuestion(null);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      activeSection === item.id
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

            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h3 className="font-semibold text-indigo-900 text-sm mb-2">Pro Tip</h3>
              <p className="text-xs text-indigo-800 leading-relaxed">
                Practice at least 5-10 questions daily for consistent improvement in your interview preparation.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <section className="bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="px-8 py-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">⭐</span>
                  <div>
                    <h1 className="text-4xl font-bold text-black dark:text-white">TCS Prime Profile</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Build Strong Foundations for a Premium Career Path</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Questions Section */}
          <section className="px-8 py-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-4xl font-bold text-center mb-2 text-black dark:text-white">
                {getSectionTitle()}
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                Click on any question to reveal the detailed answer. Study these questions thoroughly for your TCS Prime interview.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <QuestionCard 
                questions={getSectionQuestions()} 
                title={getSectionTitle()}
                isCoding={activeSection === "coding"}
              />

              {/* See More Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-12"
              >
                <Link href="/prime/more">
                  <Button className="rounded-full px-10 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all">
                    See More Questions & Advanced Topics for Prime Profile →
                  </Button>
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Preparation Tips Section */}
          <section className="px-8 py-16 bg-gradient-to-r from-indigo-50 to-blue-50">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-center mb-4 text-black dark:text-white"
            >
              Interview Preparation Tips
            </motion.h2>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
              Essential strategies to excel in your TCS Prime interview
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {preparationTips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-md transition-all h-full">
                    <CardContent className="p-6">
                      <div className="text-blue-500 dark:text-purple-400 mb-4 text-2xl">{tip.icon}</div>
                      <h3 className="text-lg font-bold mb-2 text-black dark:text-white">{tip.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{tip.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-8 py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-3xl p-12 shadow-lg"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Master Your TCS Prime Interview?
              </h2>
              <p className="text-lg mb-8 text-indigo-100">
                Practice these questions daily, master the concepts, and build the confidence to crack your interview. Consistency is key to success!
              </p>
              <Button className="rounded-full px-8 py-4 text-lg font-semibold bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 text-blue-500 dark:text-purple-400 hover:bg-gray-100 dark:hover:bg-[#242424] transition-all">
                Start Your Daily Preparation Plan
              </Button>
            </motion.div>
          </section>

          {/* Footer */}
          <footer className="px-8 py-12 border-t border-gray-200 dark:border-gray-700 text-center bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Build strong foundations. Master core concepts. Ace your TCS Prime interview.
            </p>
            <p className="text-gray-500 text-sm">
              © 2026 TCS Interview Bundle. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function PrimePage() {
  return (
    <ProtectedRoute>
      <TCSPrimePage />
    </ProtectedRoute>
  );
}
