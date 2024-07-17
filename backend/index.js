import express from 'express'
import bodyParser from 'body-parser'
import Groq from "groq-sdk";
import 'dotenv/config'
import cors from 'cors'
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
};

console.log(process.env.GROQ_API_KEY)
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export async function getGroqChatCompletion(userMessage) {
   
    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    });
  }
const app=express()
app.use(cors(corsOptions));
app.use(bodyParser.json())
app.post('/',async (req,res)=>{
    
    try{
     const chatCompletion = await getGroqChatCompletion(req.body.userMessage);
    
      res.send({message : chatCompletion.choices[0]?.message?.content || ""});
    
    
    }catch(e){
            console.error(e)
            res.send({message : "Some error occured"})
    }
    // 
    
})
app.listen(8000,()=>{
    console.log('server has started listening on the port 8000');
})