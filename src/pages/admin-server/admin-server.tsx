import { getAllServers } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { ServerCard } from './components/ServerCard'

export const AdminServer = () => {
  const [cookie] = useCookies(['user'])
  const { accessToken } = cookie.user
  const { isLoading, data } = useQuery({
    queryKey: ['servers'],
    queryFn: getAllServers
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div className="w-full p-4">
      <p className="text-center text-2xl font-bold">Servidores</p>
      <ul className="grid grid-cols-2 gap-4 pt-10">
        {data.map(({ gridName, id, status, pvtoPort }) => (
          <ServerCard
            key={id}
            id={id}
            gridName={gridName}
            status={status}
            pvtoPort={pvtoPort}
            accessToken={accessToken}
          />
        ))}
      </ul>
    </div>
  )
}
