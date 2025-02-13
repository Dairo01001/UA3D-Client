import { Button, Input } from '@/components'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getServer } from './services/console.services'
import { config } from '@/config/config'
import { useCookies } from 'react-cookie'

export const Console = () => {
  const [cookie] = useCookies(['user'])
  const { accessToken } = cookie.user
  const { id } = useParams()
  const { data, isLoading } = useQuery({
    queryFn: () => getServer(id ?? '', accessToken),
    queryKey: ['server', id]
  })
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!data) return
    const ws = new WebSocket(config.wsUrl + data?.pvtoPort + '/ws')

    ws.onmessage = event => {
      setMessages(prevMessages => [...prevMessages, event.data])
    }

    ws.onclose = () => {
      console.log('Conexión WebSocket cerrada')
    }

    ws.onerror = error => {
      console.error('Error en WebSocket:', error)
    }

    return () => {
      ws.close()
    }
  }, [])

  const handleHistory = async () => {
    try {
      const hist = (
        await axios.get(config.pvtoManagerUrl + data?.pvtoPort + '/history')
      ).data
      setHistory(hist.history)
    } catch (error) {
      console.log(error.response.data.error)
    }
  }

  if (isLoading || !data) return <p>Loading...</p>
  console.log(data)

  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-3">
      <div className="flex w-[80%] flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl">Terminal</h1>
        <ul className="h-96 w-full overflow-y-auto rounded-md bg-slate-800 p-4 text-white">
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
        <form
          className="w-full"
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const command = formData.get('command')
            axios
              .post(config.pvtoManagerUrl + data?.pvtoPort + '/send_command', {
                command
              })
              .then(() => {})
          }}
        >
          <Input type="text" name="command" />
        </form>
      </div>
      <div className="flex h-full w-[20%] flex-col items-center justify-center space-y-4">
        <ul className="h-full w-full overflow-y-auto rounded-md bg-slate-800 p-4 text-white">
          {history.map((hist, index) => (
            <li key={index}>{hist}</li>
          ))}
        </ul>
        <Button onClick={() => handleHistory()}>Historial</Button>
      </div>
    </div>
  )
}
