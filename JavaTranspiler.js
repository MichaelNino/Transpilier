/**
 * Java to JavaScript Transpiler
 * A single-file library that converts Java code to JavaScript
 */

class JavaToJSTranspiler {
  constructor(options = {}) {
    this.options = {
      includeRuntime: true,
      strictMode: true,
      ...options
    };
    
    this.javaKeywords = new Set([
      'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 
      'char', 'class', 'const', 'continue', 'default', 'do', 'double', 
      'else', 'enum', 'extends', 'final', 'finally', 'float', 'for', 
      'goto', 'if', 'implements', 'import', 'instanceof', 'int', 
      'interface', 'long', 'native', 'new', 'package', 'private', 
      'protected', 'public', 'return', 'short', 'static', 'strictfp', 
      'super', 'switch', 'synchronized', 'this', 'throw', 'throws', 
      'transient', 'try', 'void', 'volatile', 'while'
    ]);
    
    this.javaTypes = new Set([
      'boolean', 'byte', 'char', 'double', 'float', 'int', 'long', 'short', 'void'
    ]);
    
    this.javaLiterals = new Set([
      'true', 'false', 'null'
    ]);
  }
  
  transpile(javaCode) {
    // Preprocessing
    let jsCode = this.preprocess(javaCode);
    
    // Main transpilation steps
    jsCode = this.replacePackageAndImports(jsCode);
    jsCode = this.replaceClassDefinition(jsCode);
    jsCode = this.replaceMainMethod(jsCode);
    jsCode = this.replaceVariableDeclarations(jsCode);
    jsCode = this.replaceControlStructures(jsCode);
    jsCode = this.replaceSystemOut(jsCode);
    jsCode = this.replaceMethods(jsCode);
    jsCode = this.replaceConstructors(jsCode);
    jsCode = this.replaceOperators(jsCode);
    jsCode = this.replaceComments(jsCode);
    jsCode = this.replaceStrings(jsCode);
    
    // Postprocessing
    jsCode = this.postprocess(jsCode);
    
    return this.options.includeRuntime 
      ? this.getRuntime() + '\n\n' + jsCode 
      : jsCode;
  }
  
  preprocess(code) {
    // Normalize line endings
    return code.replace(/\r\n/g, '\n');
  }
  
  postprocess(code) {
    // Ensure semicolons and clean up empty lines
    return code.replace(/\n\s*\n/g, '\n')
               .replace(/;(\s*})/g, '$1')
               .trim();
  }
  
  replacePackageAndImports(code) {
    // Remove package declarations (not needed in JS)
    code = code.replace(/package\s+[a-zA-Z0-9_.]+\s*;/g, '');
    
    // Convert imports to comments (or could implement actual module imports)
    code = code.replace(/import\s+([a-zA-Z0-9_.]+)\s*;/g, '// import $1');
    
    return code;
  }
  
  replaceClassDefinition(code) {
    // Convert class definition to JS class
    return code.replace(/public\s+class\s+([a-zA-Z][a-zA-Z0-9_]*)/g, 'class $1')
               .replace(/extends\s+([a-zA-Z][a-zA-Z0-9_]*)/g, 'extends $1')
               .replace(/implements\s+([a-zA-Z][a-zA-Z0-9_]*)(\s*,\s*[a-zA-Z][a-zA-Z0-9_]*)*/g, '');
  }
  
  replaceMainMethod(code) {
    // Convert main method to executable code
    return code.replace(
      /public\s+static\s+void\s+main\s*\(\s*String\s*\[\s*\]\s+([a-zA-Z][a-zA-Z0-9_]*)\s*\)/g, 
      'static main($1)'
    );
  }
  
  replaceVariableDeclarations(code) {
    // Convert type declarations to JS let/const
    code = code.replace(/([a-zA-Z0-9_.]+)\s+([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(.+?)\s*;/g, 'let $2 = $3;');
    code = code.replace(/(final)\s+([a-zA-Z0-9_.]+)\s+([a-zA-Z][a-zA-Z0-9_]*)\s*=\s*(.+?)\s*;/g, 'const $3 = $4;');
    code = code.replace(/([a-zA-Z0-9_.]+)\s+([a-zA-Z][a-zA-Z0-9_]*)\s*;/g, 'let $2;');
    
    // Convert Java types to JS types
    this.javaTypes.forEach(type => {
      code = code.replace(new RegExp(`\\b${type}\\s+`, 'g'), 'let ');
    });
    
    return code;
  }
  
  replaceControlStructures(code) {
    // if statements
    code = code.replace(/if\s*\(/g, 'if (');
    
    // else
    code = code.replace(/else\s*{/g, 'else {');
    
    // for loops
    code = code.replace(/for\s*\(\s*([^;]+);\s*([^;]+);\s*([^)]+)\s*\)/g, 'for ($1; $2; $3)');
    
    // while loops
    code = code.replace(/while\s*\(/g, 'while (');
    
    // do-while loops
    code = code.replace(/do\s*{/g, 'do {');
    code = code.replace(/}\s*while\s*\(/g, '} while (');
    
    // switch statements
    code = code.replace(/switch\s*\(/g, 'switch (');
    code = code.replace(/case\s+/g, 'case ');
    code = code.replace(/default:/g, 'default:');
    code = code.replace(/break;/g, 'break;');
    
    return code;
  }
  
  replaceSystemOut(code) {
    // System.out.println to console.log
    return code.replace(/System\.out\.println\s*\(/g, 'console.log(')
               .replace(/System\.out\.print\s*\(/g, 'process.stdout.write(');
  }
  
  replaceMethods(code) {
    // Method declarations
    code = code.replace(
      /(public|private|protected)\s+(static\s+)?([a-zA-Z0-9_.]+)\s+([a-zA-Z][a-zA-Z0-9_]*)\s*\(([^)]*)\)/g, 
      '$1 $2$4($5)'
    );
    
    // Remove return type from constructor
    code = code.replace(/(public|private|protected)\s+([A-Z][a-zA-Z0-9_]*)\s*\(/g, 'constructor(');
    
    // Simplify method modifiers
    code = code.replace(/public\s+/g, '');
    code = code.replace(/private\s+/g, '#');
    code = code.replace(/protected\s+/g, '#');
    
    // static
    code = code.replace(/static\s+/g, 'static ');
    
    return code;
  }
  
  replaceConstructors(code) {
    // Convert constructors
    return code.replace(
      /(public|private|protected)\s+([A-Z][a-zA-Z0-9_]*)\s*\(([^)]*)\)/g, 
      'constructor($3)'
    );
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
    
    // instanceof
    code = code.replace(/instanceof/g, 'instanceof');
    
    // new
    code = code.replace(/new\s+/g, 'new ');
    
    return code;
  }
  
  replaceComments(code) {
    // Single line
    code = code.replace(/\/\/.*$/gm, '');
    
    // Multi-line
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    
    return code;
  }
  
  replaceStrings(code) {
    // Double quoted strings
    return code.replace(/"/g, '"');
  }
  
  getRuntime() {
    return `// Java to JavaScript Runtime Environment
class System {
  static out = {
    println: function(message) {
      console.log(message);
    },
    print: function(message) {
      process.stdout.write(message);
    }
  };
}

// Basic Java types emulation
class Integer {
  static parseInt(str) {
    return parseInt(str, 10);
  }
}

class Double {
  static parseDouble(str) {
    return parseFloat(str);
  }
}

class Boolean {
  static parseBoolean(str) {
    return str === 'true';
  }
}

// Simple ArrayList implementation
class ArrayList {
  constructor() {
    this.array = [];
  }

  add(item) {
    this.array.push(item);
  }

  get(index) {
    return this.array[index];
  }

  size() {
    return this.array.length;
  }
}

// Simple HashMap implementation
class HashMap {
  constructor() {
    this.map = {};
  }

  put(key, value) {
    this.map[key] = value;
  }

  get(key) {
    return this.map[key];
  }

  containsKey(key) {
    return key in this.map;
  }
}

// Math utilities
class Math {
  static random() {
    return Math.random();
  }

  static max(a, b) {
    return Math.max(a, b);
  }

  static min(a, b) {
    return Math.min(a, b);
  }
}

// String utilities
class String {
  static valueOf(obj) {
    return String(obj);
  }
}
`;
  }
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = JavaToJSTranspiler;
} else if (typeof window !== 'undefined') {
  window.JavaToJSTranspiler = JavaToJSTranspiler;
}