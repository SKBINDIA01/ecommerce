"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you today?" }])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: message }])
    setMessage("")

    // Simulate bot response after a delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thanks for your message! Our support team will get back to you shortly. In the meantime, feel free to browse our collection or check our FAQ section.",
        },
      ])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 transition-colors z-50 ${isOpen ? "hidden" : "flex"}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden"
          style={{ height: "400px" }}
        >
          {/* Header */}
          <div className="bg-red-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-bold">Live Chat Support</h3>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === "user" ? "text-right" : ""}`}>
                <div
                  className={`inline-block p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-red-600 text-white" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 text-white px-4 py-2 rounded-r-md hover:bg-red-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
