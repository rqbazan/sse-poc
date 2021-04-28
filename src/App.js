import React from 'react'
import notifier from 'zeit-toast-clone'
import { CircularProgressbar } from 'react-circular-progressbar'

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col">
      <div>
        <button
          className="bg-purple-300 rounded-sm p-2 uppercase text-sm font-semibold"
          onClick={() => {
            console.log('hola')
            notifier.success('Say hello to my little friend. by Scareface')
          }}
        >
          Show message
        </button>
      </div>
      <div className="mt-8 flex justify-center items-center">
        <div className="h-36 w-36">
          <CircularProgressbar value={50} text="50%" />
        </div>
      </div>
    </div>
  )
}
