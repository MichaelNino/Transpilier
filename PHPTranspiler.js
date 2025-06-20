/**
 * PHP to JavaScript Transpiler
 * A single-file library that converts PHP code to JavaScript
 */

class PHPToJSTranspiler {
  constructor(options = {}) {
    this.options = {
      includeRuntime: true,
      strictMode: true,
      ...options
    };
    
    this.phpFunctions = new Set([
      'isset', 'empty', 'array', 'count', 'in_array', 'array_push', 
      'array_pop', 'array_shift', 'array_unshift', 'array_merge',
      'explode', 'implode', 'strlen', 'substr', 'strpos', 'str_replace',
      'trim', 'ltrim', 'rtrim', 'strtolower', 'strtoupper', 'ucfirst',
      'ucwords', 'is_array', 'is_string', 'is_int', 'is_float', 'is_bool',
      'is_null', 'print_r', 'var_dump', 'json_encode', 'json_decode'
    ]);
    
    this.phpKeywords = new Set([
      'echo', 'print', 'die', 'exit', 'function', 'class', 'interface',
      'trait', 'namespace', 'use', 'extends', 'implements', 'public',
      'private', 'protected', 'static', 'abstract', 'final', 'const',
      'new', 'clone', 'instanceof', 'if', 'else', 'elseif', 'while',
      'do', 'for', 'foreach', 'switch', 'case', 'default', 'break',
      'continue', 'return', 'try', 'catch', 'finally', 'throw', 'goto',
      'declare', 'enddeclare', 'as', 'global', 'require', 'require_once',
      'include', 'include_once', 'list', 'unset', 'yield', 'fn', 'match'
    ]);
    
    this.phpTypes = new Set([
      'bool', 'int', 'float', 'string', 'array', 'object', 'iterable',
      'callable', 'void', 'mixed', 'self', 'parent'
    ]);
  }
  
  transpile(phpCode) {
    // Preprocessing
    let jsCode = this.preprocess(phpCode);
    
    // Main transpilation steps
    jsCode = this.replacePhpTags(jsCode);
    jsCode = this.replaceEcho(jsCode);
    jsCode = this.replaceVariables(jsCode);
    jsCode = this.replaceArrays(jsCode);
    jsCode = this.replaceFunctions(jsCode);
    jsCode = this.replaceControlStructures(jsCode);
    jsCode = this.replaceOperators(jsCode);
    jsCode = this.replaceComments(jsCode);
    jsCode = this.replaceStrings(jsCode);
    jsCode = this.replaceClasses(jsCode);
    jsCode = this.replaceSpecialConstructs(jsCode);
    
    // Postprocessing
    jsCode = this.postprocess(jsCode);
    
    return this.options.includeRuntime 
      ? this.getRuntime() + '\n\n' + jsCode 
      : jsCode;
  }
  
  preprocess(code) {
    // Normalize line endings and remove PHP close tag
    return code.replace(/\r\n/g, '\n')
               .replace(/\?>\s*$/, '');
  }
  
  postprocess(code) {
    // Ensure semicolons and clean up empty lines
    return code.replace(/\n\s*\n/g, '\n')
               .replace(/;(\s*})/g, '$1')
               .trim();
  }
  
  replacePhpTags(code) {
    return code.replace(/<\?php/g, '')
               .replace(/<\?=/g, 'return ');
  }
  
  replaceEcho(code) {
    return code.replace(/echo\s+(.+?);/g, 'console.log($1);');
  }
  
  replaceVariables(code) {
    // Replace $variables with php_variables.var_name
    return code.replace(/\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, 
      'php_variables.$1');
  }
  
  replaceArrays(code) {
    // array() to [] and array syntax
    return code.replace(/array\s*\(/g, '[')
               .replace(/\)(\s*;)?/g, ']$1');
  }
  
  replaceFunctions(code) {
    // Function declaration
    code = code.replace(/function\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*\(/g, 
      'function $1(');
    
    // Some common PHP functions
    code = code.replace(/isset\s*\(/g, 'php_isset(');
    code = code.replace(/empty\s*\(/g, 'php_empty(');
    code = code.replace(/count\s*\(/g, 'php_count(');
    code = code.replace(/in_array\s*\(/g, 'php_in_array(');
    
    return code;
  }
  
  replaceControlStructures(code) {
    // if statements
    code = code.replace(/if\s*\(/g, 'if (');
    
    // else if
    code = code.replace(/elseif\s*\(/g, 'else if (');
    
    // foreach
    code = code.replace(/foreach\s*\((.+?)\s+as\s+(\$.+?)\s*=>\s*(\$.+?)\s*\)/g, 
      'for (const [$2, $3] of Object.entries($1))');
    code = code.replace(/foreach\s*\((.+?)\s+as\s+(\$.+?)\s*\)/g, 
      'for (const $2 of $1)');
    
    // while
    code = code.replace(/while\s*\(/g, 'while (');
    
    // for
    code = code.replace(/for\s*\(/g, 'for (');
    
    // switch
    code = code.replace(/switch\s*\(/g, 'switch (');
    code = code.replace(/case\s+/g, 'case ');
    code = code.replace(/default:/g, 'default:');
    
    return code;
  }
  
  replaceOperators(code) {
    // ===, !==
    code = code.replace(/===/g, '===');
    code = code.replace(/!==/g, '!==');
    
    // &&, ||, !
    code = code.replace(/&&/g, '&&');
    code = code.replace(/\|\|/g, '||');
    code = code.replace(/!/g, '!');
    
    // Ternary
    code = code.replace(/\?/g, '?');
    code = code.replace(/:/g, ':');
    
    // Concatenation
    code = code.replace(/\./g, '+');
    
    // Null coalescing
    code = code.replace(/\?\?/g, '||');
    
    return code;
  }
  
  replaceComments(code) {
    // Single line
    code = code.replace(/\/\/.*$/gm, '');
    
    // Multi-line
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    
    // Hash comments
    code = code.replace(/#.*$/gm, '');
    
    return code;
  }
  
  replaceStrings(code) {
    // Double quoted strings with variable interpolation
    code = code.replace(/"(.*?\$.*?)"/g, (match, p1) => {
      return '`' + p1.replace(/\$(.+?)([^a-zA-Z0-9_]|$)/g, '${php_variables.$1}$2') + '`';
    });
    
    // Single quoted strings (no interpolation)
    code = code.replace(/'([^']*?)'/g, '"$1"');
    
    return code;
  }
  
  replaceClasses(code) {
    // Simple class translation
    code = code.replace(/class\s+([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)/g, 
      'class $1');
    
    // Constructor
    code = code.replace(/function\s+__construct/g, 'constructor');
    
    // Visibility modifiers
    code = code.replace(/public\s+/g, '');
    code = code.replace(/private\s+/g, '#');
    code = code.replace(/protected\s+/g, '#');
    
    // Static
    code = code.replace(/static\s+/g, 'static ');
    
    return code;
  }
  
  replaceSpecialConstructs(code) {
    // require/include
    code = code.replace(/require(_once)?\s*\((.+?)\)\s*;/g, 
      'php_require($2, { once: $1 ? true : false });');
    code = code.replace(/include(_once)?\s*\((.+?)\)\s*;/g, 
      'php_include($2, { once: $1 ? true : false });');
    
    // die/exit
    code = code.replace(/(die|exit)\s*\(?(.*?)\)?\s*;/g, 
      'process.exit($2 || 0);');
    
    return code;
  }
  
  getRuntime() {
    return `// PHP to JavaScript Runtime Environment
const php_variables = new Proxy({}, {
  get(target, prop) {
    return target.hasOwnProperty(prop) ? target[prop] : undefined;
  }
});

function php_isset(...variables) {
  return variables.every(v => v !== undefined && v !== null);
}

function php_empty(variable) {
  return !php_isset(variable) || 
         variable === false || 
         variable === 0 || 
         variable === '' || 
         (Array.isArray(variable) && variable.length === 0);
}

function php_count(array) {
  if (Array.isArray(array) || typeof array === 'string') {
    return array.length;
  } else if (typeof array === 'object' && array !== null) {
    return Object.keys(array).length;
  }
  return 0;
}

function php_in_array(needle, haystack, strict = false) {
  if (!Array.isArray(haystack)) return false;
  return haystack.some(item => strict ? item === needle : item == needle);
}

const php_included_files = new Set();

function php_require(file, options = { once: false }) {
  if (options.once && php_included_files.has(file)) {
    return;
  }
  php_included_files.add(file);
  // In a real implementation, you would load and execute the file here
  console.warn('require() not fully implemented for file:', file);
}

function php_include(file, options = { once: false }) {
  try {
    return php_require(file, options);
  } catch (e) {
    console.warn('include() failed for file:', file, e);
    return false;
  }
}

// Array to string conversion
function php_array_to_string(arr) {
  return 'Array';
}

// Type conversion helpers
function php_bool(val) {
  return !!val;
}

function php_int(val) {
  return parseInt(val, 10) || 0;
}

function php_float(val) {
  return parseFloat(val) || 0.0;
}

function php_strval(val) {
  if (val === null || val === undefined) return '';
  if (typeof val === 'boolean') return val ? '1' : '';
  if (Array.isArray(val)) return php_array_to_string(val);
  return String(val);
}

// PHP-style equality
function php_equal(a, b) {
  return a == b;
}

function php_identical(a, b) {
  return a === b;
}

// PHP-style error handling
function php_error_handler(err, severity) {
  console.error('PHP Error:', err);
  if (severity === 'E_ERROR' || severity === 'E_USER_ERROR') {
    process.exit(1);
  }
}

// Register global error handlers
process.on('uncaughtException', (err) => {
  php_error_handler(err, 'E_ERROR');
});

process.on('unhandledRejection', (err) => {
  php_error_handler(err, 'E_WARNING');
});
`;
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PHPToJSTranspiler;
} else if (typeof window !== 'undefined') {
  window.PHPToJSTranspiler = PHPToJSTranspiler;
}
