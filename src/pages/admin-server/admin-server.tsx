import { config } from '@/config/config'
import { getAllServers } from '@/services'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useToast } from '@/hooks'
import { useCookies } from 'react-cookie'

export const AdminServer = () => {
  const [cookie] = useCookies(['user'])
  const { accessToken } = cookie.user
  const { toast } = useToast()
  const { isLoading, data } = useQuery({
    queryKey: ['server'],
    queryFn: getAllServers
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div className="w-full p-4">
      <p className="text-center text-2xl font-bold">Servidores</p>
      <ul className="grid grid-cols-2 gap-4 pt-10">
        {data.map(({ gridName, id, status, pvtoPort }) => (
          <li
            key={id}
            className="flex flex-col justify-between rounded-lg border-2 border-gray-500 p-4"
          >
            <Link to={`/servers/${id}/console`}>{gridName}</Link>
            <p>{status.name}</p>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => {
                  axios.get(`${config.pvtoManagerUrl + pvtoPort}/start`)
                }}
              >
                Iniciar
              </Button>
              <Button
                onClick={() => {
                  axios.get(`${config.pvtoManagerUrl + pvtoPort}/stop`)
                }}
              >
                Detener
              </Button>
              <Button
                onClick={() => {
                  axios
                    .delete(`servers/${id}`, {
                      headers: {
                        Authorization: `Bearer ${accessToken}`
                      }
                    })
                    .then(() => {
                      toast({
                        title: 'Eliminado',
                        description:
                          'El servidor se ha eliminado correctamente',
                        variant: 'default'
                      })
                    })
                    .catch(err => {
                      toast({
                        title: 'Error',
                        description: err.response?.data.message,
                        variant: 'destructive'
                      })
                    })
                }}
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
