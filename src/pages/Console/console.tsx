import { Button } from '@/components'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getServer } from './services/console.services'
import { config } from '@/config/config'
import { useCookies } from 'react-cookie'
import { useToast } from '@/hooks'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { ComandBar } from './components/ComandBar'

export const Console = () => {
  const [cookie] = useCookies(['user'])
  const { accessToken } = cookie.user
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
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
      setMessages(prevMessages => [event.data, ...prevMessages])
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
      setLoading(true)
      const hist = (
        await axios.get(config.pvtoManagerUrl + data?.pvtoPort + '/history')
      ).data
      setHistory(hist.history)
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: 'Error al obtener historial',
          variant: 'destructive',
          description: error.response?.data.message
        })
      }
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <div className="flex h-full w-full flex-row items-center justify-center gap-3">
      <div className="flex h-full w-[80%] flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl">Terminal</h1>
        <ComandBar pvtoPort={data?.pvtoPort} />
        <Textarea
          contentEditable={false}
          readOnly
          className="h-full w-full"
          value={messages.join('\n')}
        />
      </div>
      <div className="flex h-full w-[20%] flex-col items-center justify-center space-y-4">
        <ul className="h-full w-full overflow-y-auto rounded-md bg-slate-800 p-4 text-white">
          {history.map((hist, index) => (
            <li key={index}>{hist}</li>
          ))}
        </ul>
        <Button onClick={() => handleHistory()}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" />
              Cargando...
            </>
          ) : (
            <>Historial</>
          )}
        </Button>
      </div>
    </div>
  )
}
