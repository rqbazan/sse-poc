import React from 'react'
import notifier from 'zeit-toast-clone'

export default function App() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        className="bg-purple-300 rounded-sm p-2 uppercase text-sm font-semibold"
        onClick={() =>
          notifier.success('Say hello to my little friend. by Scareface')
        }
      >
        Show message
      </button>
    </div>
  )
}
