

/**
 * promises are used to handle async task in javascript
 */
const data={
    name:"vijit verma",
    age:"21"
}
function fetchdata(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve(data);
        },2000)
    })
}
fetchdata().then(result=>console.log(result)).catch((err)=>{
    console.log("Some error ocuured");
})