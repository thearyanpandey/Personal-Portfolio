import React from "react"
import { ArrowRight } from "lucide-react"
import Signature from "../assets/Signature.jpeg"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

export default function CredentialsCard() {
  const navigate = useNavigate();

  function HandelCredentialsCard(){
    navigate('/me')
  }
  return (
    <div className="flex-1 bg-custom-gradient shadow-lg rounded-2xl p-6 flex flex-col items-center justify-between">
      <div className="flex-grow flex items-center justify-center">
        <img src={Signature} alt="Signature" className="w-24 opacity-50" />
      </div>
      <div className="w-full flex justify-between items-end mt-4">
        <div>
          <p className="text-gray-500 text-xs mb-1">MORE ABOUT ME</p>
          <h2 className="text-white text-2xl font-bold">Credentials</h2>
        </div>
        <Button onClick={HandelCredentialsCard}/>
      </div>
    </div>
  )
}
