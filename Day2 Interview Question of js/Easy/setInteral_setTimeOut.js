



/**
 * used to perform or schdeule task to run after a specific period of time
 * part of web APIs
 * setTimeOut() -> used to execute a function after a specified delay
 * setinterval() -> used to exceute time at specific intervals
 */
const timeId=
setTimeout(()=>{
    console.log("hello after 2 second")
},2000);
clearInterval(timeId)

const timei=setInterval(() => {
    console.log("hello")
}, 2000);

setTimeout(()=>{
    clearInterval(timei)
},4500)