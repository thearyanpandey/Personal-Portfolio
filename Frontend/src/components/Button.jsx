import React from 'react'
import { ArrowRight } from 'lucide-react'

function Button({onClick}) {
  return (
    <div>
       <button onClick={onClick} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
    </div>
  )
}

export default Button
