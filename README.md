# Transpiler
A variety of transpilers from different programming languages to JavaScript

# PHP Transpiler
![PHP Logo](https://raw.githubusercontent.com/MichaelNino/Transpilier/refs/heads/main/PHPLogo.png){width=100}

## Key Features:

- Basic Syntax Conversion:

- PHP tags removal

- Variable prefix conversion ($var to php_variables.var)

- Echo statements to console.log

## Control Structures:

- if/else/elseif

- for/while/foreach loops

- switch statements

## Functions and Classes:

- Function declaration translation

- Basic class translation with constructor

- Visibility modifiers (public/private/protected)

## Operators: 

- Comparison operators

- Logical operators

- String concatenation (. to +)

## Runtime Environment:

- PHP-style isset(), empty(), count() functions

- Variable scope emulation

- Basic error handling

## Limitations 

This is a basic transpiler that handles many common PHP constructs, but there are limitations:

- Doesn't fully support all PHP superglobals ($_GET, $_POST, etc.)

- Limited support for PHP's complex type juggling

- No support for PHP namespaces

- Limited class inheritance and interface support

- No support for PHP's reference system

# Java Transpiler

## Key Features:

- Package and import statements handling

- Class definition conversion

- Main method translation

## Variable Declarations:

- Java type declarations to JavaScript let/const

- Final variables to const

## Control Structures:

- if/else statements

- for/while loops

- switch statements

## I/O Operations:

- System.out.println to console.log

- System.out.print to process.stdout.write

## Methods and Constructors:

- Method declaration translation

- Constructor conversion

- Visibility modifiers handling

## Runtime Environment:

- Basic Java classes emulation (System, Integer, Double)

- Collections (ArrayList, HashMap)

- Math utilities

- String utilities

## Limitations
- This is a basic transpiler that handles many common Java constructs, but has some limitations:

- No support for Java packages and full module system

- Limited support for Java's type system and generics

- No support for Java's exception handling (try-catch with specific exceptions)

- Limited support for interfaces and abstract classes

- No support for Java's threading model

- Annotations are not processed
