import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(prev => {
        const newArr = [...prev]
        newArr[newArr.length - 1] = newMode
        return newArr
      })
    } else {
      setHistory(prev => [...prev, newMode])
    }
    setMode(newMode)
  }

  const back = () => {
    if (history.length - 1) {
      setHistory(prev => {
        const newArr = [...prev]

        newArr.pop()
        setMode(newArr[newArr.length - 1])
        return newArr
      })      
    }
  }

  return { mode, transition, back };
}