import { Button } from '@/components'
import { config } from '@/config/config'
import { useToast } from '@/hooks'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Edit2Icon, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ServerCardProps {
  id: string
  gridName: string
  status: any
  pvtoPort: string
  accessToken: string
}

export const ServerCard = ({
  id,
  gridName,
  status,
  pvtoPort,
  accessToken
}: ServerCardProps) => {
  const [startLoading, setStartLoading] = useState(false)
  const [stopLoading, setStopLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`servers/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['servers'] })
      toast({
        title: 'Servidor Eliminado',
        description: 'El servidor ha sido eliminado exitosamente',
        variant: 'default'
      })
      setStartLoading(false)
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el servidor',
        variant: 'destructive'
      })
      setDeleteLoading(false)
    }
  })

  return (
    <li className="flex flex-col justify-between rounded-lg border-2 border-gray-500 p-4">
      <header className="flex flex-row justify-between gap-4">
        <Link to={`/servers/${id}/console`}>{gridName}</Link>
        <Link to={`/servers/${gridName}/archive`}>
          <Edit2Icon className="h-5 w-5 text-gray-500" />
        </Link>
      </header>
      <p>{status.name}</p>
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => {
            setStartLoading(true)
            axios
              .get(`${config.pvtoManagerUrl + pvtoPort}/start`)
              .then(() => {
                toast({
                  title: 'Iniciado',
                  description: 'El servidor se ha iniciado correctamente',
                  variant: 'default'
                })
              })
              .catch(err => {
                toast({
                  title: 'Error',
                  description: err.message,
                  variant: 'destructive'
                })
              })
              .finally(() => setStartLoading(false))
          }}
        >
          {startLoading ? <Loader2 className="animate-spin" /> : null}
          Iniciar
        </Button>
        <Button
          disabled={stopLoading}
          onClick={() => {
            setStopLoading(true)
            axios
              .get(`${config.pvtoManagerUrl + pvtoPort}/stop`)
              .then(() => {
                toast({
                  title: 'Detenido',
                  description: 'El servidor se ha detenido correctamente',
                  variant: 'default'
                })
              })
              .catch(err => {
                toast({
                  title: 'Error',
                  description: err.message,
                  variant: 'destructive'
                })
              })
              .finally(() => setStopLoading(false))
          }}
        >
          {stopLoading ? <Loader2 className="animate-spin" /> : null}
          Detener
        </Button>
        <Button
          disabled={deleteLoading}
          onClick={() => {
            setDeleteLoading(true)
            mutation.mutate()
          }}
        >
          {deleteLoading ? <Loader2 className="animate-spin" /> : null}
          Eliminar
        </Button>
      </div>
    </li>
  )
}
