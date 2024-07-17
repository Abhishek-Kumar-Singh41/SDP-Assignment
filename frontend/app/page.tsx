'use client'
import {Input} from "@nextui-org/input";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import axios from 'axios'
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
export default  function Home() {
  
  const [messages,setMessages]=useState(["hello! I am your personal assistant. Please ask away any question ?"]);
  const [userMessage,setUserMessage]=useState("");
   async function handleUserMessage(){
   
   axios.post('http://localhost:8000',{
    'userMessage' : userMessage
   }).then((response)=>{
   
    setMessages([...messages,userMessage,response.data.message])
   })
   console.log(userMessage);
  }
  return (
   <div className="min-h-screen w-screen flex justify-center">
    <div className="w-5/6 relative  overflow-scroll [&::-webkit-scrollbar]:hidden">
      {
       messages.map((string , index)=>{
        console.log(typeof index);
        if(index%2===0)
        {
          return <Card className="max-w-md">
            <CardBody>
              <p>{`Groq : ${string}`}</p>
            </CardBody>
          </Card>
        }else{
          return <div className="w-full  flex justify-end">
            <Card className="max-w-md ">
             <CardBody>
               <p>{`You : ${string}`}</p>
             </CardBody>
           </Card></div>
          
        }
       })
      }
    </div>
    <div className="fixed bottom-6 w-3/4 ">
    <Input type="text" size="lg" className="mr-10 " value={userMessage} endContent={
    <IoSend className=" h-8 w-8 hover:scale-125 transition duration-300 ease-in-out" onClick={async ()=>{
      
      await handleUserMessage();
      setUserMessage("")}}></IoSend>
    } label="Message to the AI" onChange={(e)=>{
      setUserMessage(e.target.value);
    
    }}/>
    </div>
   </div>
  );
}
