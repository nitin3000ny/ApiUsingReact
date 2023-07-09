import { useState } from 'react'

import QuoteGenerator from './QuoteGenerator'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <QuoteGenerator/>
    </>
  )
}

export default App
