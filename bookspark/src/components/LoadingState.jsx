import { useState, useEffect } from 'react'
import { getRandomLoadingMessage } from '../api/claude'

export default function LoadingState() {
  const [message, setMessage] = useState(getRandomLoadingMessage)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessage(getRandomLoadingMessage())
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative w-16 h-16 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-primary-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      <p className="text-primary-700 font-medium text-sm animate-pulse">
        {message}
      </p>
    </div>
  )
}
