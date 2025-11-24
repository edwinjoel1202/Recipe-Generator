import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from "react-markdown";

//React

function App() {
  const [count, setCount] = useState(0);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  let new_prompt = ""

  const ai = new GoogleGenAI({ apiKey: "GEMINI_API_KEY" });

  const generateRecipe = async () => {
    try {
      setIsLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a complete cooking recipe for ${prompt}. 
                   Only include:
                   - Ingredients list
                   - Step-by-step preparation instructions
                   - with neat markdown formatting
                  No introduction, no explanation, no extra text. Start directly with the recipe.`
      });
      const output = response.text;
      setResponse(output);
    } catch (error) {
      console.error(error);
      setResponse("Error fetching recipe");
    }
    setIsLoading(false);
  }



  return (
    <>
      <h1 className='font-bold text-5xl ml-5 text-center mt-5'>Recipe Generator</h1>
      <div className='flex justify-center mt-10 gap-3'>
        <input
          type="text"
          className='w-[300px] h-[30px] bg-gray-200 p-2 font-semibold text-sm rounded border'
          onChange={(e) => setPrompt(e.target.value)} />
        <button
          className='bg-blue-500 text-white h-[30px] px-3 rounded-sm text-sm font-semibold flex items-center gap-2'
          onClick={generateRecipe}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </button>

      </div>

      <div className="flex justify-center mt-10">
        <div
          className="w-[600px] h-[300px] p-3 border rounded bg-gray-100 text-sm overflow-auto"
        >
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      </div>
    </>
  )
}
export default App
