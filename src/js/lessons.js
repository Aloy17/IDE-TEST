const lessons = {
  1: {
    id: 1,
    title: "Getting Started",
    content: `Welcome to RID! In this lesson you'll learn how to print text and simple expressions using the <code>out()</code> function.

The <code>out()</code> function is your primary way to display output in RID. It can print strings, numbers, and expressions. You can pass multiple values separated by commas, and they will be concatenated together.

Let's start with a simple greeting program and then move on to printing calculated values.`,
    code: `# hello.rid
out("Namaste RID!")       ~ Prints a greeting ~

# basic arithmetic with out
Let a = 5
Let b = 3
out("Sum: ", a + b)       ~ prints: Sum: 8 ~`,
    output: `Namaste RID!
Sum: 8`
  },

  2: {
    id: 2,
    title: "Variables & Types",
    content: `Variables are containers for storing data values. In RID, you can declare variables without specifying their type - RID figures it out automatically!

RID supports several basic types:
• <strong>Numbers</strong> - integers and decimals (20, 3.14)
• <strong>Strings</strong> - text in quotes ("Asha")
• <strong>Booleans</strong> - true or false values

You can reassign variables to new values at any time. Let's see how to work with different types and perform operations on them.`,
    code: `# variables.rid
Let name = "Asha"
Let age = 20
Let is_student = true

out("Name: ", name)
out("Age next year: ", age + 1)

# reassign
age = age + 1
out("Updated age: ", age)`,
    output: `Name: Asha
Age next year: 21
Updated age: 21`
  },

  3: {
    id: 3,
    title: "Conditionals",
    content: `Conditionals allow your program to make decisions and execute different code based on conditions. RID uses Hindi-inspired keywords for conditional logic:

• <code>agar</code> - if (check a condition)
• <code>ya_fir</code> - elif (check another condition)
• <code>warna</code> - else (default case)

Conditions use comparison operators like <code>>=</code>, <code>==</code>, <code><</code>, etc. The condition goes in parentheses, and the code block is wrapped in curly braces <code>{}</code>.

Let's build a simple grade calculator using conditionals.`,
    code: `# conditionals.rid
Let score = 78

agar(score >= 90) {
    out("Grade: A")
}
ya_fir(score >= 75) {
    out("Grade: B")
}
warna {
    out("Grade: C or below")
}`,
    output: `Grade: B`
  },

  4: {
    id: 4,
    title: "Loops",
    content: `Loops let you repeat code multiple times. RID provides two main types of loops:

<strong>Fixed-count loops</strong> use <code>Run(X)</code> to execute a block exactly X times. This is perfect when you know exactly how many iterations you need.

<strong>Conditional loops</strong> use <code>Run while(condition)</code> to repeat as long as a condition is true. This is useful when you don't know how many iterations you'll need in advance.

Let's see both types in action: counting to 5, and calculating a factorial.`,
    code: `# loops.rid

# Fixed-count
Let i = 1
Run(5) {
    out("Count: ", i)
    i = i + 1
}

# Conditional (while-style)
Let n = 5
Let fact = 1
Run while(n > 1) {
    fact = fact * n
    n = n - 1
}

out("Factorial: ", fact)`,
    output: `Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
Factorial: 120`
  },

  5: {
    id: 5,
    title: "Functions",
    content: `Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.

In RID, you define functions using the <code>func</code> keyword, followed by the function name and parameters in parentheses. Functions can return values using the <code>give</code> keyword (similar to "return" in other languages).

<strong>Key concepts:</strong>
• Functions can accept parameters (inputs)
• Use <code>give</code> to return a value
• Call functions by name with arguments
• Code blocks are wrapped in curly braces <code>{}</code>

Let's create a simple calculator function and a greeting function.`,
    code: `# functions.rid

func add(x, y) {
    Let sum = x + y
    give sum
}

Let result = add(7, 8)
out("Result: ", result)

# Void-like function
func greet(name) {
    out("Namaste, ", name)
}

greet("Riya")`,
    output: `Result: 15
Namaste, Riya`
  },

  6: {
    id: 6,
    title: "Complete Projects",
    content: `Now let's combine everything you've learned to build a complete mini-project: a number guessing game!

This project demonstrates:
• Functions (<code>func</code> and <code>give</code>)
• Conditionals (<code>agar</code>, <code>ya_fir</code>, <code>warna</code>)
• Loops (<code>Run while</code>)
• Variables and user interaction with <code>in()</code>

The game generates a secret number and asks the player to guess it. After each guess, it provides feedback ("too low" or "too high") until the player guesses correctly.

This is a preview of how RID can handle more complex programs!`,
    code: `# guesser.rid
Let secret = 12
Let attempts = 0
Let guessing = true

Run while(guessing) {
    Let guess = num(in("Guess (1-20): "))
    attempts = attempts + 1
    
    agar(guess == secret) {
        out("Correct! Attempts: ", attempts)
        guessing = false
    }
    ya_fir(guess < secret) {
        out("Too low, try again.")
    }
    warna {
        out("Too high, try again.")
    }
}`,
    output: `Guess (1-20): 10
Too low, try again.
Guess (1-20): 15
Too high, try again.
Guess (1-20): 12
Correct! Attempts: 3`
  }
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lessons;
}
