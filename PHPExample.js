// Example usage
const transpiler = new PHPToJSTranspiler();

const phpCode = `
<?php
$name = "World";
echo "Hello, $name!";

function greet($name) {
    return "Hello, " . $name . "!";
}

$result = greet("PHP");
echo $result;
`;

const jsCode = transpiler.transpile(phpCode);
console.log(jsCode);