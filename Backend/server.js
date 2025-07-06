const express=require('express');
const { readFile, writeFile } = require('fs');
const app=express()
const fs=require('fs').promises;
const cors=require('cors')
const quotesFilePath = 'quotes.json';
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Hello Server")
})
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Allow specific methods (add others if needed)
    allowedHeaders: ['Content-Type'], // Allow specific headers
}));
app.get('/api/quotes',async (req,res)=>{
    try{
    const data=await fs.readFile(quotesFilePath,'utf8')
    const quotes=JSON.parse(data)
    res.send(quotes)
    }
    catch(error){
     res.status(500).json({message:"Something_went_wrong"})
    }
})
app.post('/api/addquote', async (req, res) => {
    try {
        const data = await fs.readFile(quotesFilePath, 'utf8');
        const quotes = JSON.parse(data);
        const { quote, author } = req.body;

        if (!quote || !author) {
            return res.status(400).json({ message: 'Quote and author are required' });
        }

        console.log(`${quote} - ${author}`);
        const newData = { quote, author };
        quotes.push(newData);

        await fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2));
        res.status(201).json({ message: 'Quote added successfully', quote: newData });
    } catch (error) {
        res.status(500).json({ message: 'Error updating quotes file', error: error.message });
    }
});
app.get('/api/findauthor/:author',async(req,res)=>{
    try {
      const data = await fs.readFile(quotesFilePath, 'utf8');
        const quotes = JSON.parse(data);
        const authorName = req.params.author.toLowerCase();
        
        const matched = quotes.filter(quote => quote.author.toLowerCase().includes(authorName));
     
       if (matched.length === 0) {
            return res.status(404).json({ message: `No quotes found for author: ${req.params.author}` });
        }
      res.send(matched)
    } catch (error) {
        return res.status(500).json({message:"something went wrong"})
    }
    
    
})
app.listen(3000,()=>{
    console.log("server running at 3000 🥹")
})