import * as React from 'react'
import { EventSourcePolyfill } from 'event-source-polyfill'
import { useForm } from 'react-hook-form'

function connect({ URL, headers, eventName }, eventHandler) {
  const conn = new EventSourcePolyfill(URL, { headers })

  conn.addEventListener(eventName, eventHandler)

  return conn
}

function Stream({ config, onClose }) {
  const [isConnected, setIsConnected] = React.useState(false)

  const [events, setEvents] = React.useState([])

  const connRef = React.useRef()

  return (
    <div
      className={`text-gray-800 ${
        isConnected ? 'bg-green-300' : 'bg-gray-300'
      } p-4 relative`}
    >
      <div className="absolute right-4">
        <button onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      <p className="space-x-3">
        <span className="font-semibold">URL:</span> {config.URL}
        <span className="font-semibold">/</span>
        <span className="font-semibold">Event Name:</span> {config.eventName}
      </p>
      <div>
        <span className="font-semibold">Headers:</span>
        <pre className="font-mono">
          {JSON.stringify(config.headers, null, 2)}
        </pre>
      </div>
      <div className="bg-white p-4 mt-3 h-56 max-h-56 overflow-auto border-2 border-gray-700 space-y-2">
        {events.length > 0 ? (
          events.map((e) => (
            <pre key={e.lastEventId}>{JSON.stringify(e.data)}</pre>
          ))
        ) : (
          <p className="text-gray-400 font-mono">
            Aqui se listaran los eventos...
          </p>
        )}
      </div>
      <div className="flex justify-end mt-3">
        <button
          className="bg-purple-300 rounded-sm p-2 uppercase text-sm font-semibold"
          onClick={() => {
            if (isConnected) {
              connRef.current.close()
            } else {
              connRef.current = connect(config, (e) =>
                setEvents((v) => [...v, e])
              )
            }
            setIsConnected((v) => !v)
          }}
        >
          {isConnected ? 'DISCONNECT' : 'CONNECT'}
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const configCount = React.useRef(0)

  const { register, handleSubmit } = useForm({
    defaultValues: {
      headers: '{}',
    },
  })

  const [streamConfigs, setStreamConfigs] = React.useState([])

  function onSubmit(formValues) {
    try {
      const newConfig = {
        ...formValues,
        id: configCount.current++,
        headers: JSON.parse(formValues.headers),
      }

      setStreamConfigs((prevStreamConfigs) => [...prevStreamConfigs, newConfig])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-400 p-4 space-y-2"
      >
        <div className="flex flex-col">
          <label className="text-gray-200">URL</label>
          <input
            className="h-8 border border-blue-400 px-2"
            required
            placeholder="Ej. http://mysite.com/sse-events"
            {...register('URL')}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200">Event Name</label>
          <input
            className="h-8 border border-blue-400 px-2"
            required
            placeholder="Ej. myevent"
            {...register('eventName')}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200">Headers</label>
          <textarea
            className="border border-blue-400 p-2 font-mono"
            rows={3}
            required
            {...register('headers')}
          />
        </div>
        <div className="flex justify-end">
          <button className="bg-purple-300 rounded-sm p-2 uppercase text-sm font-semibold">
            NEW CONFIG
          </button>
        </div>
      </form>
      <div className="space-y-3 mt-4">
        {streamConfigs.map((config) => (
          <Stream
            key={config.id}
            config={config}
            onClose={() =>
              setStreamConfigs((prevStreamConfigs) =>
                prevStreamConfigs.filter((item) => item.id !== config.id)
              )
            }
          />
        ))}
      </div>
    </div>
  )
}
