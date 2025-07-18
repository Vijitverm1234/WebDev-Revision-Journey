

// Hoisting in JavaScript is a behavior where variable and function declarations are moved to the top of their containing scope(global or function scope) during the compilation phase, before the code is executed.This allows variables and functions to be used before they are declared in the code.
greet()
function greet(){
    console.log("Hello Greetings")
}
console.log(a)
// var a=15 //undefined
let a=15 //refernce error
