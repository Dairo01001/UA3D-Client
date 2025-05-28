import { Button, Input } from '@/components'
import { useToast } from '@/hooks'
import axios from 'axios'
import { config } from '@/config/config'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface ComandBarProps {
  pvtoPort: string
}

export const ComandBar = ({ pvtoPort }: ComandBarProps) => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  return (
    <form
      className="flex w-full items-center space-x-2"
      onSubmit={e => {
        setLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const command = formData.get('command')
        e.currentTarget.reset()
        axios
          .post(config.pvtoManagerUrl + pvtoPort + '/send_command', {
            command
          })
          .then(() => {
            setLoading(false)
            toast({
              title: 'Comando enviado',
              variant: 'default',
              description: 'El comando se ha enviado correctamente'
            })
          })
          .catch(err => {
            setLoading(false)
            toast({
              title: 'Error al enviar comando',
              variant: 'destructive',
              description: err.response?.data.message
            })
          })
          .finally(() => {
            setLoading(false)
          })
      }}
    >
      <Input type="text" name="command" />
      <Button type="submit">
        {loading ? <Loader2 className="animate-spin" /> : 'Enviar'}
      </Button>
    </form>
  )
}
