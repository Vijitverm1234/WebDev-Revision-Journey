const express=require('express')
const app=express()
const sendMail=require("./sendMail.js")
app.use(express.json()) 
app.get("/",(req,res)=>{
  res.send("Server is live 🥹")
})
app.get("/sendmail",sendMail)
app.listen(3000,()=>{
  console.log("Server running at 3000 port 🥹")
})