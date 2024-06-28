import React,{useState} from 'react'
import { Button } from "flowbite-react";
import { TextInput } from "flowbite-react";
import Markdown from 'react-markdown'
export default function App() {
  const [inputvalue,setInputvalue]=useState("");
  const[result,setResult]=useState(null);

  const handleinputuchange=(event)=>{
    setInputvalue(event.target.value);
  };
  const handlebuttonclick= async()=>{
    const apikey ='AIzaSyBT-P3zQtqUE-w9ad08M_nvyU8q1DOjLr4';
    const url =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: inputvalue
            }
          ]
        }
      ]
    };
    try{
    const response= await fetch(url,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(requestBody)
    });
    const data = await response.json();
    console.log('Response data:', data);

    
    const textData = data.candidates[0].content.parts[0].text;
    setResult(textData);
  }
  catch(error){
    console.error('Error:', error)
  }};


  return (
    <div className="h-screen bg-slate-800 flex flex-col justify-end items-center">
         <div className="w-20 text-sm bg-white h-full flex items-center mt-5 text-white">
        <Markdown>{result}</Markdown>
      </div>
      <div className="w-screen flex justify-center mb-[10px]">
      
        <TextInput className='w-2/4 mr-10'
         id="input-info" 
         placeholder="Message" 
         required color="info"
         value={inputvalue} 
         onChange={handleinputuchange}/>
    
        <Button  className='w-20 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"> '
        onClick={handlebuttonclick} >send</Button>
      </div>
    

    </div>
  )
}
