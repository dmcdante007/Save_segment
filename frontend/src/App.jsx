import { useState } from 'react';
import Popup from './components/PopUp';
import './App.css'

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">

  {/* <h1 className="text-3xl font-bold underline">
      Hello world!
      </h1> */}
      <div className="App">
      <button
       className="px-4 py-2 text-white bg-gray-400 border-2 rounded hover:bg-teal-700"
      onClick={() => setIsPopupOpen(true)}>Save Segment</button>
      {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)} />}
    </div>
    </div>
  )
}

export default App
