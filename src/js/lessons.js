const lessons = {
  1: {
    id: 1,
    title: "Getting Started with RID",
    content: `Welcome to RID (Rapid Interactive Development)! RID is a beginner-friendly programming language with Hindi-inspired keywords that makes coding intuitive and fun.

<strong>What you'll learn in this lesson:</strong>
• How to use the <code>out()</code> function to display text and values
• Basic syntax and structure of RID programs
• How to write comments in your code
• String concatenation and arithmetic operations
• The <code>line</code> function for adding line breaks

<strong>Key RID Features:</strong>
• <code>out()</code> - Your primary output function (like print in other languages)
• <code>in()</code> - Gets user input from keyboard (like input in other languages)
• <code>line</code> - Adds a new line to your output
• Comments use <code>~</code> symbols
• Variables are declared with <code>Let</code>
• String concatenation with <code>+</code> operator

<strong>Understanding the Code:</strong>
The <code>out()</code> function can accept multiple parameters separated by commas. When you pass multiple values, RID automatically concatenates them together. You can mix strings, numbers, and variables in a single <code>out()</code> statement.

<strong>Best Practices:</strong>
• Always use meaningful variable names
• Add comments to explain complex logic
• Use <code>line</code> to make output readable
• Test your code frequently as you write it`,
    code: `~ Hello World Program in RID ~
~ This demonstrates basic output and comments ~

out("Namaste RID!")                    ~ Prints a greeting ~
line                                   ~ Adds a blank line ~
out("Welcome to RID Programming!")     ~ Another message ~
line

~ Basic arithmetic with variables ~
Let a = 5
Let b = 3
Let sum = a + b

out("First number: ", a)               ~ Display first number ~
out("Second number: ", b)              ~ Display second number ~
out("Sum: ", sum)                      ~ Display calculated sum ~
line

~ String concatenation examples ~
Let name = "Riya"
Let age = 20
out("Hello, " + name + "!")            ~ Concatenate strings ~
out("You are " + word(age) + " years old")  ~ Convert number to string ~
line

~ Multiple values in one out() statement ~
Let x = 10
Let y = 15
out("x = ", x, ", y = ", y, ", x + y = ", x + y)
line

~ User input example (simulated) ~
~ In a real program, you would use: Let user_name = in("What's your name? ") ~
Let user_name = "RID Learner"  ~ Simulated input ~
out("Hello, ", user_name, "! Welcome to RID programming!")`,
    output: `Namaste RID!

Welcome to RID Programming!

First number: 5
Second number: 3
Sum: 8

Hello, Riya!
You are 20 years old

x = 10, y = 15, x + y = 25

Hello, RID Learner! Welcome to RID programming!`
  },
  2: {
    id: 2,
    title: "Variables and Data Types",
    content: `Variables are the foundation of programming - they store and manage data in your programs. RID uses dynamic typing, meaning you don't need to specify what type of data a variable will hold.

<strong>What you'll learn in this lesson:</strong>
• How to declare variables with <code>Let</code>
• RID's three main data types: Numbers, Strings, and Booleans
• Variable reassignment and modification
• Type conversion functions: <code>num()</code>, <code>word()</code>, <code>bool()</code>
• Arithmetic operations with different data types

<strong>RID Data Types:</strong>
• <strong>Numbers</strong> - Integers (42) and decimals (3.14)
• <strong>Strings</strong> - Text enclosed in quotes ("Hello")
• <strong>Booleans</strong> - True or False values

<strong>Variable Rules:</strong>
• Always start with <code>Let</code> for new variables
• Use descriptive names (avoid single letters)
• Variables can be reassigned without <code>Let</code>
• RID automatically determines the data type

<strong>Type Conversion Functions:</strong>
• <code>num()</code> - Convert string to integer number
• <code>dec()</code> - Convert string to decimal number
• <code>word()</code> - Convert number to string
• <code>bool()</code> - Convert to boolean (0 = False, anything else = True)

<strong>Common Mistakes to Avoid:</strong>
• Forgetting <code>Let</code> when declaring new variables
• Mixing data types without proper conversion
• Using undefined variables`,
    code: `~ Variables and Data Types in RID ~
~ Demonstrates different data types and operations ~

~ String variables ~
Let name = "Asha"
Let city = "Mumbai"
Let message = "Welcome to RID!"

out("Name: ", name)
out("City: ", city)
out("Message: ", message)
line

~ Number variables ~
Let age = 20
Let height = 5.6
Let score = 95
Let temperature = 23.5
Let price = 19.99

out("Age: ", age, " years")
out("Height: ", height, " feet")
out("Score: ", score, " points")
out("Temperature: ", temperature, "°C")
out("Price: $", price)
line

~ Boolean variables ~
Let is_student = True
Let is_employed = False
Let has_license = True

out("Is student: ", word(is_student))
out("Is employed: ", word(is_employed))
out("Has license: ", word(has_license))
line

~ Variable reassignment ~
out("Original age: ", age)
age = age + 1                    ~ Reassign without Let ~
out("Age next year: ", age)
line

~ Type conversion examples ~
Let age_string = "25"
Let age_number = num(age_string)  ~ Convert string to integer ~
out("Age as string: ", age_string)
out("Age as number: ", age_number)
out("Age + 5: ", age_number + 5)
line

~ Decimal conversion examples ~
Let price_string = "19.99"
Let price_decimal = dec(price_string)  ~ Convert string to decimal ~
out("Price as string: ", price_string)
out("Price as decimal: ", price_decimal)
out("Price with tax: ", price_decimal * 1.1)
line

~ More decimal conversion examples ~
Let temp_string = "25.7"
Let temp_decimal = dec(temp_string)
out("Temperature string: ", temp_string)
out("Temperature decimal: ", temp_decimal)
out("Temperature in Fahrenheit: ", temp_decimal * 1.8 + 32)
line

Let weight_string = "65.5"
Let weight_decimal = dec(weight_string)
out("Weight as string: ", weight_string, " kg")
out("Weight as decimal: ", weight_decimal, " kg")
out("Weight in pounds: ", weight_decimal * 2.205, " lbs")
line

Let score_number = 88
Let score_text = word(score_number)  ~ Convert number to string ~
out("Score as number: ", score_number)
out("Score as text: '", score_text, "'")
line

~ Boolean conversion ~
Let zero = 0
Let one = 1
Let text = "hello"

out("bool(0): ", word(bool(zero)))      ~ False ~
out("bool(1): ", word(bool(one)))       ~ True ~
out("bool('hello'): ", word(bool(text))) ~ True ~
line

~ Arithmetic with different types ~
Let a = 10
Let b = "5"
Let c = num(b)                    ~ Convert string to integer ~
out("a + c = ", a + c)            ~ 10 + 5 = 15 ~
line

~ Decimal arithmetic examples ~
Let rate_string = "3.14"
Let rate_decimal = dec(rate_string)
Let radius = 5
Let area = rate_decimal * radius * radius
out("Rate as string: ", rate_string)
out("Rate as decimal: ", rate_decimal)
out("Area of circle (radius 5): ", area)
line

Let price1 = "12.50"
Let price2 = "8.75"
Let total = dec(price1) + dec(price2)
out("Price 1: $", price1)
out("Price 2: $", price2)
out("Total: $", total)`,
    output: `Name: Asha
City: Mumbai
Message: Welcome to RID!

Age: 20 years
Height: 5.6 feet
Score: 95 points
Temperature: 23.5°C
Price: $19.99

Is student: True
Is employed: False
Has license: True

Original age: 20
Age next year: 21

Age as string: 25
Age as number: 25
Age + 5: 30

Price as string: 19.99
Price as decimal: 19.99
Price with tax: 21.989

Temperature string: 25.7
Temperature decimal: 25.7
Temperature in Fahrenheit: 78.26

Weight as string: 65.5 kg
Weight as decimal: 65.5 kg
Weight in pounds: 144.4275 lbs

Score as number: 88
Score as text: '88'

bool(0): False
bool(1): True
bool('hello'): True

a + c = 15

Rate as string: 3.14
Rate as decimal: 3.14
Area of circle (radius 5): 78.5

Price 1: $12.50
Price 2: $8.75
Total: $21.25`
  },
  3: {
    id: 3,
    title: "Control Flow with Conditionals",
    content: `Conditionals are the decision-making backbone of programming. They allow your program to choose different paths based on conditions, making your code intelligent and responsive.

<strong>What you'll learn in this lesson:</strong>
• How to use <code>agar</code> (if) statements for decision making
• Using <code>ya_fir</code> (elif) for multiple conditions
• The <code>warna</code> (else) clause for default cases
• Comparison operators: <code>==</code>, <code>!=</code>, <code><</code>, <code>></code>, <code><=</code>, <code>>=</code>
• Logical operators and complex conditions
• Nested conditionals for advanced logic

<strong>RID Conditional Keywords:</strong>
• <code>agar</code> - "if" (checks a condition)
• <code>ya_fir</code> - "elif" (checks another condition if the first is false)
• <code>warna</code> - "else" (default case when all conditions are false)

<strong>Comparison Operators:</strong>
• <code>==</code> - Equal to
• <code>!=</code> - Not equal to
• <code><</code> - Less than
• <code>></code> - Greater than
• <code><=</code> - Less than or equal to
• <code>>=</code> - Greater than or equal to

<strong>Syntax Rules:</strong>
• Conditions go in parentheses: <code>agar(condition)</code>
• Code blocks use curly braces: <code>{ }</code>
• Each condition is checked in order
• Only the first true condition executes

<strong>Best Practices:</strong>
• Use meaningful variable names in conditions
• Keep conditions simple and readable
• Use proper indentation for nested blocks
• Test all possible conditions`,
    code: `~ Control Flow with Conditionals ~
~ Demonstrates decision-making in RID ~

~ Basic if statement ~
Let age = 18
out("Age: ", age)
agar(age >= 18) {
    out("You are an adult!")
}
line

~ if-else statement ~
Let temperature = 25
out("Temperature: ", temperature, "°C")
agar(temperature > 30) {
    out("It's hot outside!")
}
warna {
    out("It's comfortable weather.")
}
line

~ Multiple conditions with ya_fir ~
Let score = 85
out("Test score: ", score)
agar(score >= 90) {
    out("Grade: A - Excellent!")
}
ya_fir(score >= 80) {
    out("Grade: B - Good job!")
}
ya_fir(score >= 70) {
    out("Grade: C - Satisfactory")
}
ya_fir(score >= 60) {
    out("Grade: D - Needs improvement")
}
warna {
    out("Grade: F - Failed")
}
line

~ Complex conditions ~
Let age = 20
Let has_license = True
Let has_car = False

out("Age: ", age, ", Has license: ", word(has_license), ", Has car: ", word(has_car))
agar(age >= 18 && has_license) {
    out("You can drive!")
    agar(has_car) {
        out("And you have a car to drive!")
    }
    warna {
        out("But you need to get a car first.")
    }
}
warna {
    out("You cannot drive yet.")
}
line

~ Comparison operators examples ~
Let a = 10
Let b = 20
out("a = ", a, ", b = ", b)
line

agar(a == b) {
    out("a equals b")
}
warna {
    out("a does not equal b")
}

agar(a < b) {
    out("a is less than b")
}

agar(a <= b) {
    out("a is less than or equal to b")
}

agar(a > b) {
    out("a is greater than b")
}
warna {
    out("a is not greater than b")
}
line

~ Nested conditionals ~
Let weather = "sunny"
Let temperature = 28
out("Weather: ", weather, ", Temperature: ", temperature, "°C")

agar(weather == "sunny") {
    out("It's sunny!")
    agar(temperature > 25) {
        out("Perfect beach weather!")
    }
    ya_fir(temperature > 15) {
        out("Nice day for a walk.")
    }
    warna {
        out("Sunny but chilly.")
    }
}
ya_fir(weather == "rainy") {
    out("It's raining - stay indoors!")
}
warna {
    out("Weather is unclear.")
}`,
    output: `Age: 18
You are an adult!

Temperature: 25°C
It's comfortable weather.

Test score: 85
Grade: B - Good job!

Age: 20, Has license: True, Has car: False
You can drive!
But you need to get a car first.

a = 10, b = 20

a does not equal b
a is less than b
a is less than or equal to b
a is not greater than b

Weather: sunny, Temperature: 28°C
It's sunny!
Perfect beach weather!`
  },
  4: {
    id: 4,
    title: "Loops and Repetition",
    content: `Loops are powerful tools that allow you to repeat code multiple times, making your programs efficient and dynamic. RID provides two main types of loops to handle different repetition scenarios.

<strong>What you'll learn in this lesson:</strong>
• Fixed-count loops with <code>Run(X)</code> for known iterations
• Conditional loops with <code>Run while(condition)</code> for dynamic repetition
• Loop control and variable management
• Nested loops for complex patterns
• Common loop patterns and best practices
• Avoiding infinite loops

<strong>RID Loop Types:</strong>
• <strong>Fixed-count loops</strong> - <code>Run(X)</code> executes exactly X times
• <strong>Conditional loops</strong> - <code>Run while(condition)</code> repeats while condition is true

<strong>When to Use Each Loop:</strong>
• Use <code>Run(X)</code> when you know exactly how many times to repeat
• Use <code>Run while(condition)</code> when repetition depends on a condition
• Use <code>Run while</code> for user input validation, searching, or dynamic calculations

<strong>Loop Best Practices:</strong>
• Always initialize loop variables before the loop
• Update loop variables inside the loop to avoid infinite loops
• Use meaningful variable names for loop counters
• Test your loops with different values
• Be careful with nested loops - they can be slow

<strong>Common Loop Patterns:</strong>
• Counting up/down
• Accumulating values (sum, product)
• Searching through data
• Input validation
• Pattern generation`,
    code: `~ Loops and Repetition in RID ~
~ Demonstrates different loop types and patterns ~

~ Fixed-count loop: Run(X) ~
out("=== Fixed-Count Loop Examples ===")
line

out("Counting from 1 to 5:")
Let i = 1
Run(5) {
    out("Count: ", i)
    i = i + 1
}
line

out("Printing 'Hello' 3 times:")
Run(3) {
    out("Hello!")
}
line

~ Conditional loop: Run while(condition) ~
out("=== Conditional Loop Examples ===")
line

out("Countdown from 5:")
Let countdown = 5
Run while(countdown > 0) {
    out("Countdown: ", countdown)
    countdown = countdown - 1
}
out("Liftoff!")
line

~ Accumulating values with loops ~
out("Sum of numbers 1 to 10:")
Let sum = 0
Let num = 1
Run while(num <= 10) {
    sum = sum + num
    num = num + 1
}
out("Sum = ", sum)
line

~ Factorial calculation ~
out("Calculating factorial of 5:")
Let n = 5
Let factorial = 1
Let original_n = n

Run while(n > 1) {
    factorial = factorial * n
    out("Step: ", n, " * ", factorial / n, " = ", factorial)
    n = n - 1
}
out("Factorial of ", original_n, " = ", factorial)
line

~ Nested loops ~
out("=== Nested Loop Example ===")
out("Multiplication table (1-3):")
Let outer = 1
Run while(outer <= 3) {
    Let inner = 1
    Run while(inner <= 3) {
        Let product = outer * inner
        out(outer, " x ", inner, " = ", product)
        inner = inner + 1
    }
    line
    outer = outer + 1
}

~ Pattern generation ~
out("=== Pattern Generation ===")
out("Number triangle:")
Let row = 1
Run while(row <= 4) {
    Let col = 1
    Run while(col <= row) {
        out(col, " ")
        col = col + 1
    }
    line
    row = row + 1
}
line

~ Loop with conditions ~
out("=== Loop with Conditions ===")
out("Finding first even number divisible by 7:")
Let number = 1
Let found = False

Run while(!found) {
    agar(number % 2 == 0 && number % 7 == 0) {
        out("Found: ", number)
        found = True
    }
    warna {
        number = number + 1
    }
}
line

~ Input validation loop (simulated) ~
out("=== Input Validation Example ===")
out("Simulating age validation:")
Let age = 0
Let valid = False

~ Simulate getting age input ~
age = 15  ~ This would normally come from in() function ~

Run while(!valid) {
    agar(age >= 18) {
        out("Valid age: ", age)
        valid = True
    }
    warna {
        out("Age ", age, " is too young. Please enter age >= 18")
        ~ In real program: age = num(in("Enter age: ")) ~
        age = 20  ~ Simulate valid input ~
    }
}`,
    output: `=== Fixed-Count Loop Examples ===

Counting from 1 to 5:
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5

Printing 'Hello' 3 times:
Hello!
Hello!
Hello!

=== Conditional Loop Examples ===

Countdown from 5:
Countdown: 5
Countdown: 4
Countdown: 3
Countdown: 2
Countdown: 1
Liftoff!

Sum of numbers 1 to 10:
Sum = 55

Calculating factorial of 5:
Step: 5 * 1 = 5
Step: 4 * 5 = 20
Step: 3 * 20 = 60
Step: 2 * 60 = 120
Step: 1 * 120 = 120
Factorial of 5 = 120

=== Nested Loop Example ===
Multiplication table (1-3):
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3

2 x 1 = 2
2 x 2 = 4
2 x 3 = 6

3 x 1 = 3
3 x 2 = 6
3 x 3 = 9

=== Pattern Generation ===
Number triangle:
1 
1 2 
1 2 3 
1 2 3 4 

=== Loop with Conditions ===
Finding first even number divisible by 7:
Found: 14

=== Input Validation Example ===
Simulating age validation:
Age 15 is too young. Please enter age >= 18
Valid age: 20`
  },
  5: {
    id: 5,
    title: "Functions and Code Organization",
    content: `Functions are the building blocks of well-organized programs. They allow you to break down complex problems into smaller, manageable pieces and create reusable code that can be called multiple times.

<strong>What you'll learn in this lesson:</strong>
• How to define functions with <code>func</code> keyword
• Function parameters and arguments
• Returning values with <code>give</code> statement
• Function calls and how to use returned values
• Void functions (functions that don't return values)
• Function scope and variable access
• Recursive functions and advanced patterns

<strong>Function Syntax:</strong>
• <code>func functionName(parameters) { }</code> - Define a function
• <code>give value</code> - Return a value from function
• <code>functionName(arguments)</code> - Call a function

<strong>Function Types:</strong>
• <strong>Value-returning functions</strong> - Use <code>give</code> to return data
• <strong>Void functions</strong> - Perform actions without returning values
• <strong>Parameterized functions</strong> - Accept input parameters
• <strong>Recursive functions</strong> - Call themselves

<strong>Benefits of Functions:</strong>
• Code reusability - write once, use many times
• Better organization - break complex problems into parts
• Easier testing - test individual functions
• Improved readability - descriptive function names
• Modularity - change one function without affecting others

<strong>Best Practices:</strong>
• Use descriptive function names
• Keep functions focused on one task
• Use parameters to make functions flexible
• Always return consistent data types
• Document what your function does`,
    code: `~ Functions and Code Organization in RID ~
~ Demonstrates function definition, calling, and patterns ~

~ Basic function with return value ~
func add(x, y) {
    Let sum = x + y
    give sum
}

Let result1 = add(5, 3)
Let result2 = add(10, 20)
out("5 + 3 = ", result1)
out("10 + 20 = ", result2)
line

~ Function with multiple parameters ~
func calculate(a, b, c) {
    Let result = a * b + c
    give result
}

Let calc_result = calculate(2, 3, 4)
out("calculate(2, 3, 4) = ", calc_result)
line

~ Void function (no return value) ~
func greet(name) {
    out("Namaste, ", name, "!")
    out("Welcome to RID programming!")
}

greet("Riya")
greet("Arjun")
line

~ Function with conditional logic ~
func max(a, b) {
    agar(a > b) {
        give a
    }
    warna {
        give b
    }
}

Let maximum = max(15, 23)
out("Maximum of 15 and 23: ", maximum)
line

~ Function for mathematical operations ~
func power(base, exponent) {
    Let result = 1
    Let count = 0
    
    Run while(count < exponent) {
        result = result * base
        count = count + 1
    }
    
    give result
}

Let power_result = power(2, 3)
out("2 to the power of 3: ", power_result)
line

~ Function with string operations ~
func create_greeting(name, age) {
    Let greeting = "Hello, " + name + "! You are " + word(age) + " years old."
    give greeting
}

Let message = create_greeting("Priya", 25)
out(message)
line

~ Recursive function: Factorial ~
func factorial(n) {
    agar(n <= 1) {
        give 1
    }
    warna {
        give n * factorial(n - 1)
    }
}

Let fact5 = factorial(5)
out("Factorial of 5: ", fact5)
line

~ Recursive function: Fibonacci ~
func fibonacci(n) {
    agar(n <= 1) {
        give n
    }
    warna {
        give fibonacci(n - 1) + fibonacci(n - 2)
    }
}

out("Fibonacci sequence (first 8 numbers):")
Let i = 0
Run while(i < 8) {
    out(fibonacci(i), " ")
    i = i + 1
}
line
line

~ Function with validation ~
func divide(a, b) {
    agar(b == 0) {
        out("Error: Cannot divide by zero!")
        give 0
    }
    warna {
        give a / b
    }
}

Let div1 = divide(10, 2)
Let div2 = divide(10, 0)
out("10 / 2 = ", div1)
out("10 / 0 = ", div2)
line

~ Function that calls other functions ~
func calculate_area(length, width) {
    give length * width
}

func calculate_perimeter(length, width) {
    give 2 * (length + width)
}

func rectangle_info(length, width) {
    Let area = calculate_area(length, width)
    Let perimeter = calculate_perimeter(length, width)
    
    out("Rectangle with length ", length, " and width ", width)
    out("Area: ", area)
    out("Perimeter: ", perimeter)
}

rectangle_info(5, 3)
line

~ Function with multiple return scenarios ~
func grade_calculator(score) {
    agar(score >= 90) {
        give "A"
    }
    ya_fir(score >= 80) {
        give "B"
    }
    ya_fir(score >= 70) {
        give "C"
    }
    ya_fir(score >= 60) {
        give "D"
    }
    warna {
        give "F"
    }
}

Let grade1 = grade_calculator(95)
Let grade2 = grade_calculator(75)
out("Score 95 gets grade: ", grade1)
out("Score 75 gets grade: ", grade2)`,
    output: `5 + 3 = 8
10 + 20 = 30

Namaste, Riya!
Welcome to RID programming!
Namaste, Arjun!
Welcome to RID programming!

Maximum of 15 and 23: 23

2 to the power of 3: 8

Hello, Priya! You are 25 years old.

Factorial of 5: 120

Fibonacci sequence (first 8 numbers):
0 1 1 2 3 5 8 13 

10 / 2 = 5
Error: Cannot divide by zero!
10 / 0 = 0

Rectangle with length 5 and width 3
Area: 15
Perimeter: 16

Score 95 gets grade: A
Score 75 gets grade: C`
  },
  6: {
    id: 6,
    title: "Advanced Features and Best Practices",
    content: `Congratulations! You've learned the fundamentals of RID programming. This final lesson covers advanced features, best practices, and real-world programming techniques that will make you a proficient RID developer.

<strong>What you'll learn in this lesson:</strong>
• User input with <code>in()</code> function
• Advanced type conversion techniques
• Error handling and input validation
• Complex program structure and organization
• Performance considerations and optimization
• Debugging techniques and common pitfalls
• Real-world project examples

<strong>Advanced RID Features:</strong>
• <code>in()</code> - Get user input from keyboard
• <code>num()</code>, <code>word()</code>, <code>bool()</code> - Type conversion functions
• <code>dec()</code> - Convert to decimal numbers
• Complex nested structures and algorithms

<strong>Programming Best Practices:</strong>
• Write clear, readable code with good variable names
• Use comments to explain complex logic
• Break large problems into smaller functions
• Validate user input before processing
• Handle errors gracefully
• Test your code with different inputs

<strong>Common Programming Patterns:</strong>
• Input validation loops
• Menu-driven programs
• Data processing pipelines
• Mathematical calculations
• String manipulation
• File processing (conceptual)

<strong>Debugging Tips:</strong>
• Use <code>out()</code> statements to trace program flow
• Check variable values at different points
• Test with simple inputs first
• Read error messages carefully
• Use meaningful variable names

<strong>Next Steps:</strong>
• Practice with the example programs in the examples folder
• Try building your own projects
• Experiment with different algorithms
• Join the RID community for support and inspiration`,
    code: `~ Advanced Features and Best Practices in RID ~
~ Demonstrates real-world programming techniques ~

~ User input and validation ~
out("=== User Input and Validation ===")
line

~ Simulate user input (in real program, use in() function) ~
out("Welcome to the RID Calculator!")
line

~ Function to get and validate number input ~
func get_number(prompt) {
    ~ In real program: Let input = in(prompt) ~
    Let input = "25"  ~ Simulate user input ~
    Let number = num(input)
    give number
}

Let num1 = get_number("Enter first number: ")
Let num2 = get_number("Enter second number: ")

out("You entered: ", num1, " and ", num2)
line

~ Advanced calculator with menu ~
func calculator() {
    out("=== Advanced Calculator ===")
    out("1. Add")
    out("2. Subtract") 
    out("3. Multiply")
    out("4. Divide")
    out("5. Power")
    out("6. Exit")
    line
    
    ~ Simulate menu choice ~
    Let choice = 1  ~ In real program: Let choice = num(in("Choose operation: ")) ~
    
    agar(choice == 1) {
        out("Result: ", num1 + num2)
    }
    ya_fir(choice == 2) {
        out("Result: ", num1 - num2)
    }
    ya_fir(choice == 3) {
        out("Result: ", num1 * num2)
    }
    ya_fir(choice == 4) {
        agar(num2 != 0) {
            out("Result: ", num1 / num2)
        }
        warna {
            out("Error: Cannot divide by zero!")
        }
    }
    ya_fir(choice == 5) {
        Let result = 1
        Let count = 0
        Run while(count < num2) {
            result = result * num1
            count = count + 1
        }
        out("Result: ", result)
    }
    warna {
        out("Invalid choice!")
    }
}

calculator()
line

~ String processing and manipulation ~
out("=== String Processing ===")
line

func process_name(name) {
    Let length = 0
    Let temp = name
    
    ~ Calculate string length (simplified) ~
    ~ In real RID, you might have built-in length function ~
    out("Processing name: ", name)
    out("Name contains: ", name)
    
    ~ Check if name starts with vowel ~
    Let first_char = "A"  ~ Simplified for demo ~
    agar(first_char == "A" || first_char == "E" || first_char == "I" || first_char == "O" || first_char == "U") {
        out("Name starts with a vowel!")
    }
    warna {
        out("Name starts with a consonant!")
    }
}

process_name("Alice")
line

~ Data processing example ~
out("=== Data Processing Example ===")
line

func analyze_scores() {
    out("Analyzing test scores...")
    line
    
    ~ Simulate multiple test scores ~
    Let scores = 0  ~ In real program, this would be an array ~
    Let total = 0
    Let count = 0
    Let max_score = 0
    Let min_score = 100
    
    ~ Process 5 scores ~
    Let i = 1
    Run while(i <= 5) {
        ~ Simulate getting score ~
        Let score = 85 + i  ~ Simulate different scores ~
        
        out("Score ", i, ": ", score)
        total = total + score
        count = count + 1
        
        agar(score > max_score) {
            max_score = score
        }
        
        agar(score < min_score) {
            min_score = score
        }
        
        i = i + 1
    }
    
    Let average = total / count
    out("Total: ", total)
    out("Average: ", average)
    out("Highest: ", max_score)
    out("Lowest: ", min_score)
}

analyze_scores()
line

~ Complex algorithm: Prime number checker ~
out("=== Prime Number Checker ===")
line

func is_prime(n) {
    agar(n < 2) {
        give False
    }
    warna {
        Let i = 2
        Run while(i * i <= n) {
            agar(n % i == 0) {
                give False
            }
            i = i + 1
        }
        give True
    }
}

out("Checking prime numbers from 2 to 20:")
Let num = 2
Run while(num <= 20) {
    agar(is_prime(num)) {
        out(num, " is prime")
    }
    warna {
        out(num, " is not prime")
    }
    num = num + 1
}
line

~ Error handling and robust programming ~
out("=== Error Handling Example ===")
line

func safe_divide(a, b) {
    agar(b == 0) {
        out("Error: Division by zero!")
        give 0
    }
    warna {
        give a / b
    }
}

func safe_sqrt(n) {
    agar(n < 0) {
        out("Error: Cannot calculate square root of negative number!")
        give 0
    }
    warna {
        ~ Simplified square root calculation ~
        Let guess = n / 2
        Let iterations = 0
        Run while(iterations < 10) {
            Let new_guess = (guess + n / guess) / 2
            guess = new_guess
            iterations = iterations + 1
        }
        give guess
    }
}

Let div_result = safe_divide(10, 0)
Let sqrt_result = safe_sqrt(16)
out("Safe division result: ", div_result)
out("Safe square root of 16: ", sqrt_result)
line

~ Final project: Simple banking system ~
out("=== Simple Banking System ===")
line

Let balance = 1000
Let account_holder = "John Doe"

func show_balance() {
    out("Account Holder: ", account_holder)
    out("Current Balance: $", balance)
}

func deposit(amount) {
    agar(amount > 0) {
        balance = balance + amount
        out("Deposited $", amount)
        out("New balance: $", balance)
    }
    warna {
        out("Error: Deposit amount must be positive!")
    }
}

func withdraw(amount) {
    agar(amount > 0) {
        agar(amount <= balance) {
            balance = balance - amount
            out("Withdrew $", amount)
            out("New balance: $", balance)
        }
        warna {
            out("Error: Insufficient funds!")
        }
    }
    warna {
        out("Error: Withdrawal amount must be positive!")
    }
}

show_balance()
deposit(500)
withdraw(200)
withdraw(2000)  ~ This should fail ~
show_balance()
line

out("=== Congratulations! ===")
out("You've completed the RID programming tutorial!")
out("You now know how to:")
out("• Use variables and data types")
out("• Control program flow with conditionals")
out("• Create loops for repetition")
out("• Write and use functions")
out("• Handle user input and validation")
out("• Build complete programs")
line
out("Keep practicing and building amazing programs with RID!")`,
    output: `=== User Input and Validation ===

Welcome to the RID Calculator!

You entered: 25 and 25

=== Advanced Calculator ===
1. Add
2. Subtract
3. Multiply
4. Divide
5. Power
6. Exit

Result: 50

=== String Processing ===

Processing name: Alice
Name contains: Alice
Name starts with a vowel!

=== Data Processing Example ===

Analyzing test scores...

Score 1: 86
Score 2: 87
Score 3: 88
Score 4: 89
Score 5: 90
Total: 440
Average: 88
Highest: 90
Lowest: 86

=== Prime Number Checker ===

Checking prime numbers from 2 to 20:
2 is prime
3 is prime
4 is not prime
5 is prime
6 is not prime
7 is prime
8 is not prime
9 is not prime
10 is not prime
11 is prime
12 is not prime
13 is prime
14 is not prime
15 is not prime
16 is not prime
17 is prime
18 is not prime
19 is prime
20 is not prime

=== Error Handling Example ===

Error: Division by zero!
Safe division result: 0
Safe square root of 16: 4

=== Simple Banking System ===

Account Holder: John Doe
Current Balance: $1000
Deposited $500
New balance: $1500
Withdrew $200
New balance: $1300
Error: Insufficient funds!
Account Holder: John Doe
Current Balance: $1300

=== Congratulations! ===
You've completed the RID programming tutorial!
You now know how to:
• Use variables and data types
• Control program flow with conditionals
• Create loops for repetition
• Write and use functions
• Handle user input and validation
• Build complete programs

Keep practicing and building amazing programs with RID!`
  }
};
if (typeof module !== 'undefined' && module.exports) {
  module.exports = lessons;
}