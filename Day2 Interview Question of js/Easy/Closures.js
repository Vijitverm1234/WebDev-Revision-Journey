

/*

 * function that remembers the environment in which they were created after the outer function has finished executing
 */


function outterFun(){
    let outt="hello"
    function innerFun(){
        console.log(outt)
    }
    return innerFun;
}
const closure=outterFun();
closure(); //after the outter function is executed then inner is executed