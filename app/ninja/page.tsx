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

function TCSNinjaPage() {
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
      question: "Check whether a number is Prime or not",
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
      question: "Find the Factorial of a number",
      java: `public static int factorial(int n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    
    int result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
      cpp: `int factorial(int n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    
    int result = 1;
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
      question: "Check whether a number is Palindrome",
      java: `public static boolean isPalindrome(int n) {
    int original = n;
    int reversed = 0;
    
    while (n > 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    
    return original == reversed;
}`,
      cpp: `bool isPalindrome(int n) {
    int original = n;
    int reversed = 0;
    
    while (n > 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    
    return original == reversed;
}`,
      python: `def is_palindrome(n):
    original = n
    reversed = 0
    
    while n > 0:
        digit = n % 10
        reversed = reversed * 10 + digit
        n //= 10
    
    return original == reversed`
    },
    {
      id: 4,
      question: "Find the Fibonacci series up to N terms",
      java: `public static void printFibonacci(int n) {
    if (n <= 0) return;
    
    long a = 0, b = 1;
    System.out.print(a + " ");
    
    for (int i = 1; i < n; i++) {
        System.out.print(b + " ");
        long temp = a + b;
        a = b;
        b = temp;
    }
}`,
      cpp: `void printFibonacci(int n) {
    if (n <= 0) return;
    
    long a = 0, b = 1;
    cout << a << " ";
    
    for (int i = 1; i < n; i++) {
        cout << b << " ";
        long temp = a + b;
        a = b;
        b = temp;
    }
}`,
      python: `def print_fibonacci(n):
    if n <= 0:
        return
    
    a, b = 0, 1
    print(a, end=" ")
    
    for i in range(1, n):
        print(b, end=" ")
        a, b = b, a + b`
    },
    {
      id: 5,
      question: "Check whether a number is an Armstrong number",
      java: `public static boolean isArmstrong(int n) {
    String str = String.valueOf(n);
    int numDigits = str.length();
    int sum = 0;
    int temp = n;
    
    while (temp > 0) {
        int digit = temp % 10;
        sum += (int) Math.pow(digit, numDigits);
        temp /= 10;
    }
    
    return sum == n;
}`,
      cpp: `bool isArmstrong(int n) {
    string str = to_string(n);
    int numDigits = str.length();
    int sum = 0;
    int temp = n;
    
    while (temp > 0) {
        int digit = temp % 10;
        sum += pow(digit, numDigits);
        temp /= 10;
    }
    
    return sum == n;
}`,
      python: `def is_armstrong(n):
    str_n = str(n)
    num_digits = len(str_n)
    total = 0
    
    for digit in str_n:
        total += int(digit) ** num_digits
    
    return total == n`
    },
    {
      id: 6,
      question: "Reverse a number without using built-in functions",
      java: `public static int reverseNumber(int n) {
    int reversed = 0;
    boolean isNegative = n < 0;
    n = Math.abs(n);
    
    while (n > 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    
    return isNegative ? -reversed : reversed;
}`,
      cpp: `int reverseNumber(int n) {
    int reversed = 0;
    bool isNegative = n < 0;
    n = abs(n);
    
    while (n > 0) {
        int digit = n % 10;
        reversed = reversed * 10 + digit;
        n /= 10;
    }
    
    return isNegative ? -reversed : reversed;
}`,
      python: `def reverse_number(n):
    is_negative = n < 0
    n = abs(n)
    reversed = 0
    
    while n > 0:
        digit = n % 10
        reversed = reversed * 10 + digit
        n //= 10
    
    return -reversed if is_negative else reversed`
    },
    {
      id: 7,
      question: "Find the largest element in an array",
      java: `public static int findMax(int[] arr) {
    if (arr == null || arr.length == 0)
        throw new IllegalArgumentException("Array is empty");
    
    int max = arr[0];
    for (int i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
      cpp: `int findMax(vector<int>& arr) {
    if (arr.empty())
        throw invalid_argument("Array is empty");
    
    int max = arr[0];
    for (int i = 1; i < arr.size(); i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}`,
      python: `def find_max(arr):
    if not arr:
        raise ValueError("Array is empty")
    
    max_val = arr[0]
    for num in arr[1:]:
        if num > max_val:
            max_val = num
    return max_val`
    },
    {
      id: 8,
      question: "Find the second largest element in an array",
      java: `public static int findSecondMax(int[] arr) {
    if (arr == null || arr.length < 2)
        throw new IllegalArgumentException("Array must have >= 2 elements");
    
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
    if (arr.size() < 2)
        throw invalid_argument("Array must have >= 2 elements");
    
    int max = INT_MIN;
    int secondMax = INT_MIN;
    
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
      python: `def find_second_max(arr):
    if len(arr) < 2:
        raise ValueError("Array must have >= 2 elements")
    
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
      id: 9,
      question: "Check whether a string is a palindrome",
      java: `public static boolean isStringPalindrome(String s) {
    s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right))
            return false;
        left++;
        right--;
    }
    return true;
}`,
      cpp: `bool isStringPalindrome(string s) {
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
        left++;
        right--;
    }
    return true;
}`,
      python: `def is_string_palindrome(s):
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
      id: 10,
      question: "Count the number of vowels and consonants in a string",
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
    System.out.println("Vowels: " + vowels + ", Consonants: " + consonants);
}`,
      cpp: `void countVowelsConsonants(string s) {
    int vowels = 0, consonants = 0;
    
    for (char c : s) {
        c = tolower(c);
        if (c >= 'a' && c <= 'z') {
            if (string("aeiou").find(c) != string::npos) {
                vowels++;
            } else {
                consonants++;
            }
        }
    }
    cout << "Vowels: " << vowels << ", Consonants: " << consonants << endl;
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
    
    print(f"Vowels: {vowels}, Consonants: {consonants}")`
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
      question: "Write a query to display all employees whose salary is greater than the average salary.",
      answer: `SELECT * FROM Employee
WHERE salary > (SELECT AVG(salary) FROM Employee)
ORDER BY salary DESC;`
    },
    {
      id: 3,
      question: "Write a query to find the number of employees in each department.",
      answer: `SELECT department_id, department_name, COUNT(employee_id) AS employee_count
FROM Employee
JOIN Department ON Employee.department_id = Department.department_id
GROUP BY department_id, department_name
ORDER BY employee_count DESC;`
    },
    {
      id: 4,
      question: "Write a query to find duplicate records in a table.",
      answer: `SELECT employee_id, name, email, COUNT(*) AS occurrence
FROM Employee
GROUP BY employee_id, name, email
HAVING COUNT(*) > 1;

-- Find duplicate emails
SELECT email, COUNT(*) AS duplicate_count
FROM Employee
GROUP BY email
HAVING COUNT(*) > 1;`
    },
    {
      id: 5,
      question: "Write a query to retrieve the highest salary in each department.",
      answer: `SELECT department_name, MAX(salary) AS highest_salary
FROM Employee
JOIN Department ON Employee.department_id = Department.department_id
GROUP BY department_name
ORDER BY highest_salary DESC;

-- Include employee details
SELECT e.employee_id, e.name, d.department_name, e.salary
FROM Employee e
JOIN Department d ON e.department_id = d.department_id
WHERE (e.department_id, e.salary) IN (
    SELECT department_id, MAX(salary)
    FROM Employee
    GROUP BY department_id
);`
    },
    {
      id: 6,
      question: "Write a query to display employees who do not have a manager.",
      answer: `SELECT employee_id, name, manager_id
FROM Employee
WHERE manager_id IS NULL;

-- Alternative using LEFT JOIN
SELECT e.employee_id, e.name
FROM Employee e
LEFT JOIN Employee m ON e.manager_id = m.employee_id
WHERE e.manager_id IS NULL;`
    },
    {
      id: 7,
      question: "Write a query to fetch only even-numbered records from a table.",
      answer: `-- Using ROW_NUMBER (SQL Server, PostgreSQL)
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (ORDER BY employee_id) AS rn
    FROM Employee
) t
WHERE rn % 2 = 0;

-- Using MOD function
SELECT * FROM Employee
WHERE MOD(employee_id, 2) = 0;

-- Using modulo operator
SELECT * FROM Employee
WHERE employee_id % 2 = 0;`
    },
    {
      id: 8,
      question: "Write a query to find the Nth highest salary.",
      answer: `-- For N = 3 (find 3rd highest salary)
SELECT DISTINCT salary FROM Employee e1
WHERE (SELECT COUNT(DISTINCT salary) FROM Employee e2
    WHERE e2.salary >= e1.salary) = 3;

-- Using OFFSET
SELECT salary FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 2;  -- N-1 offset for Nth highest

-- Using window function
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM Employee
) t
WHERE rnk = 3;`
    },
    {
      id: 9,
      question: "Write a query to delete duplicate rows from a table.",
      answer: `-- Delete keeping the first occurrence
DELETE FROM Employee
WHERE employee_id NOT IN (
    SELECT MIN(employee_id)
    FROM Employee
    GROUP BY name, email
);

-- Using CTE
WITH cte AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY name, email ORDER BY employee_id) AS rn
    FROM Employee
)
DELETE FROM cte WHERE rn > 1;`
    },
    {
      id: 10,
      question: "Write a query to get the details of employees whose names start with 'A'.",
      answer: `SELECT * FROM Employee
WHERE name LIKE 'A%'
ORDER BY name;

-- Case-insensitive search
SELECT * FROM Employee
WHERE UPPER(name) LIKE 'A%'
ORDER BY name;

-- Using SUBSTR function
SELECT * FROM Employee
WHERE SUBSTR(name, 1, 1) = 'A'
ORDER BY name;`
    }
  ];

  const technicalQuestions = [
    {
      id: 1,
      question: "What is the difference between Array and ArrayList in Java?",
      answer: "Array is a fixed-size data structure with compile-time size, while ArrayList is a dynamic data structure that can grow or shrink at runtime. ArrayList uses generics and is type-safe."
    },
    {
      id: 2,
      question: "Explain the concept of Constructor Overloading with an example.",
      answer: "Constructor overloading allows a class to have multiple constructors with different parameter lists. Example: Student(String name) and Student(String name, int age). Java distinguishes them by parameter types/count."
    },
    {
      id: 3,
      question: "What is the difference between == and .equals() in Java?",
      answer: "== compares object references (memory addresses), while .equals() compares the actual content/values of objects. For strings, always use .equals() for content comparison."
    },
    {
      id: 4,
      question: "What is Inheritance? Explain with a real-world example.",
      answer: "Inheritance allows one class to inherit properties and methods from another class. Example: Animal is a parent class, Dog and Cat inherit from it, reusing common properties like name, age."
    },
    {
      id: 5,
      question: "Explain Polymorphism with method overriding and overloading.",
      answer: "Polymorphism means 'many forms'. Method overloading (compile-time) has same method name with different parameters. Method overriding (runtime) is when a child class redefines a parent method."
    },
    {
      id: 6,
      question: "What are Collections in Java? List the main types.",
      answer: "Collections are containers for storing multiple objects. Main types: List (ArrayList, LinkedList), Set (HashSet, TreeSet), Map (HashMap, TreeMap). Each has unique properties and use cases."
    },
    {
      id: 7,
      question: "What is Exception Handling? Explain try-catch-finally.",
      answer: "Exception handling manages runtime errors. try block contains code that might throw exception, catch block handles it, finally block executes regardless. Prevents program crashes and enables graceful error handling."
    },
    {
      id: 8,
      question: "What is the difference between String, StringBuilder, and StringBuffer?",
      answer: "String is immutable, StringBuilder and StringBuffer are mutable. StringBuffer is synchronized (thread-safe), StringBuilder is not. For single-threaded applications, use StringBuilder for better performance."
    },
    {
      id: 9,
      question: "Explain the concept of Encapsulation with an example.",
      answer: "Encapsulation hides internal implementation details and protects data. Use private variables with public getter/setter methods. Example: Employee class with private salary and public getSalary() method."
    },
    {
      id: 10,
      question: "What is the difference between Abstract Class and Interface?",
      answer: "Abstract class can have constructor and non-abstract methods, interface cannot. Abstract class uses 'extends', interface uses 'implements'. A class can implement multiple interfaces but extend only one abstract class."
    }
  ];

  const managerialQuestions = [
    {
      id: 1,
      question: "Tell us about a time you worked in a team. What was your role?",
      answer: "Describe a specific project where you collaborated. Highlight your contributions, teamwork, communication, and how you handled disagreements. Focus on positive outcomes and lessons learned."
    },
    {
      id: 2,
      question: "How do you prioritize tasks when you have multiple deadlines?",
      answer: "Explain your approach: assess urgency and importance, create a timeline, communicate with stakeholders, and adjust as needed. Mention tools like Kanban or priority matrices you use."
    },
    {
      id: 3,
      question: "Describe a challenging situation you faced and how you resolved it.",
      answer: "Use the STAR method (Situation, Task, Action, Result). Be specific about the challenge, your approach, and the positive outcome. Show problem-solving and leadership qualities."
    },
    {
      id: 4,
      question: "How do you handle feedback and criticism?",
      answer: "Show maturity by accepting constructive criticism positively. Explain how you analyze feedback, learn from it, and implement improvements. Give a real example of acting on feedback."
    },
    {
      id: 5,
      question: "What motivates you in your work?",
      answer: "Share genuine motivations: learning, problem-solving, team success, delivering quality work, or career growth. Align your motivations with the company's values and the role requirements."
    },
    {
      id: 6,
      question: "How do you communicate with team members and stakeholders?",
      answer: "Describe your communication style: clear, regular updates, active listening, and adapting to audience. Mention tools used (meetings, emails, documentation) and how you ensure clarity."
    },
    {
      id: 7,
      question: "Tell us about a time you failed. What did you learn?",
      answer: "Be honest about a setback. Explain what went wrong, your responsibility, what you learned, and how you applied that learning. Show growth mindset and resilience."
    },
    {
      id: 8,
      question: "How do you stay updated with industry trends and technologies?",
      answer: "Mention specific resources: online courses, tech blogs, podcasts, communities, certifications. Show initiative in continuous learning and how you apply new knowledge practically."
    },
    {
      id: 9,
      question: "Describe your leadership style and how you motivate others.",
      answer: "Discuss your approach: whether collaborative, empowering, supportive, or directive. Give examples of how you've motivated team members, solved conflicts, and fostered positive culture."
    },
    {
      id: 10,
      question: "Why do you want to join TCS? What do you know about us?",
      answer: "Research TCS thoroughly. Mention their values, projects, impact, and why you're interested. Connect their offerings with your career goals. Show genuine interest, not just job-hunting."
    }
  ];

  const hrQuestions = [
    {
      id: 1,
      question: "Tell us about yourself in 2 minutes.",
      answer: "Brief overview: educational background, relevant experience, key skills, achievements, and why you're interested in the role. Keep it concise, engaging, and tailored to the position."
    },
    {
      id: 2,
      question: "What are your strengths and weaknesses?",
      answer: "Strengths: choose 2-3 relevant to the job with examples. Weaknesses: pick a real one, explain how you're improving it with specific actions. Show self-awareness and growth mindset."
    },
    {
      id: 3,
      question: "What are your career aspirations?",
      answer: "Discuss short-term (1-2 years) and long-term (5 years) goals. Align them with the role and company. Show ambition but realistic expectations. Emphasize continuous learning and growth."
    },
    {
      id: 4,
      question: "Why should we hire you?",
      answer: "Highlight unique value: relevant skills, experiences, achievements, and cultural fit. Connect your qualifications to the job requirements. Show enthusiasm for the role and company."
    },
    {
      id: 5,
      question: "How do you handle workplace stress and pressure?",
      answer: "Describe healthy coping mechanisms: prioritization, breaks, exercise, talking to mentors, or meditation. Give an example of managing high-pressure situations successfully."
    },
    {
      id: 6,
      question: "What is your expected salary?",
      answer: "Research industry standards for your role/location. Give a range based on data. Show flexibility and that compensation is important but not the only factor. Ask about benefits too."
    },
    {
      id: 7,
      question: "Where do you see yourself in 5 years?",
      answer: "Vision should align with company growth and role progression. Mention specific skills you want to develop, responsibilities you want, without limiting yourself to one company."
    },
    {
      id: 8,
      question: "Do you have any questions for us?",
      answer: "Always ask thoughtful questions: about team structure, project types, growth opportunities, company culture, or learning initiatives. Shows genuine interest and engagement."
    },
    {
      id: 9,
      question: "How do you handle disagreements with colleagues or seniors?",
      answer: "Emphasize professionalism: listening to understand, finding common ground, focusing on solutions, and escalating respectfully if needed. Share a constructive example."
    },
    {
      id: 10,
      question: "Can you relocate/travel if required by the company?",
      answer: "Be honest about your flexibility regarding location changes, travel, or remote work. Understand company requirements and show willingness to discuss possibilities. Negotiate if needed."
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
      description: "Learn about TCS: culture, values, recent projects, news, and growth opportunities. Show genuine interest during interviews."
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
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] transition-colors duration-300">
      <div className="flex min-h-screen">
        {/* Sidebar Menu */}
        <aside className="w-64 bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
          <div className="p-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-500 dark:text-purple-400 hover:text-indigo-700 mb-8 transition font-semibold"
            >
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
                  <span className="text-5xl">🥷</span>
                  <div>
                    <h1 className="text-4xl font-bold text-black dark:text-white">TCS Ninja Profile</h1>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">Master Foundation-Building Interview Skills</p>
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
                Click on any question to reveal the detailed answer. Study these questions thoroughly for your TCS Ninja interview.
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
                <Link href="/ninja/more">
                  <Button className="rounded-full px-10 py-4 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white transition-all">
                    See More Questions & Advanced Topics for Ninja Profile →
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
              Essential strategies to excel in your TCS Ninja interview
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
                Ready to Master Your TCS Ninja Interview?
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
              Master the fundamentals. Build a strong foundation. Crack your TCS Ninja interview.
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

export default function NinjaPage() {
  return (
    <ProtectedRoute>
      <TCSNinjaPage />
    </ProtectedRoute>
  );
}
