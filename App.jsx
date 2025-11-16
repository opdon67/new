import { useState } from 'react'
import Reactmarkdown from 'react-markdown'
import axios from 'axios'
import './App.css'

function App() {

  const API_KEY = "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";
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("")

  //fetch function
  async function getanswer() {


    console.log("loading...")
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );


      const aiReply = response.data.choices[0].message;

      setMessages([aiReply]);
      console.log(messages)
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }

  }

  return (

    <>

      <h1> DON BOT 😎</h1>
      <div className="border mb-2 place-content-center q p-2 rounded-2xl">


        <textarea className="border rounded w-100" placeholder='ask...' onChange={(e) => setInput(e.target.value)} value={input} ></textarea>
        <button onClick={getanswer}  >Send</button>


      </div>
      <div className="border mb-2 place-content-center q p-2 rounded-2xl">
      {messages.map((m) => (
        <p className='w-3xl'>
          <Reactmarkdown>
          {m.content}
          </Reactmarkdown>
        </p>
      ))}
      </div>

    </>
  )
};

export default App
