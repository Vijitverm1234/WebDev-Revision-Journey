



/*
 * var: global scope 
 * let and const : block scope  
 */


var c=15
if(true){
    let a=5
   const b=5 
   var c=10
}
// console.log(a)
console.log(c)