// Example usage with Java "Hello World"
const transpiler = new JavaToJSTranspiler();

const javaCode = `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Variable declaration and usage
        String message = "Hello from Java to JS transpiler!";
        System.out.println(message);
        
        // Loop example
        for (int i = 0; i < 3; i++) {
            System.out.println("Iteration: " + i);
        }
    }
}
`;

const jsCode = transpiler.transpile(javaCode);
console.log(jsCode);