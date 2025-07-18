



/**
 * 
 * Accepts another function as an argument and return a function as result
 */
const number=[1,2,3,4]
const double=number.map(function(num){ //map is taking another function
    return num*2
})
console.log(double)