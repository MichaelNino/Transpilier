# Transpilier
A variety of transpilers from different programming languages to JavaScript

# PHP Transpiler

* Key Features: *

- Basic Syntax Conversion:

- PHP tags removal

- Variable prefix conversion ($var to php_variables.var)

- Echo statements to console.log

* Control Structures: *

- if/else/elseif

- for/while/foreach loops

- switch statements

* Functions and Classes: *

- Function declaration translation

- Basic class translation with constructor

- Visibility modifiers (public/private/protected)

* Operators: *

- Comparison operators

- Logical operators

- String concatenation (. to +)

* Runtime Environment: *

- PHP-style isset(), empty(), count() functions

- Variable scope emulation

Basic error handling

* Limitations *

This is a basic transpiler that handles many common PHP constructs, but there are limitations:

- Doesn't fully support all PHP superglobals ($_GET, $_POST, etc.)

- Limited support for PHP's complex type juggling

- No support for PHP namespaces

- Limited class inheritance and interface support

- No support for PHP's reference system

