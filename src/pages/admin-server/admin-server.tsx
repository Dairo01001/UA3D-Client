import { getAllServers } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

export const AdminServer = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['server'],
    queryFn: getAllServers
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div className="w-full p-4">
      <p className="text-center text-2xl">Servers</p>
      <ul className="flex flex-col gap-4">
        {data.map(({ gridName, id, status }) => (
          <li className="flex flex-col justify-between" key={id}>
            <Link to={`/servers/${id}/console`}>{gridName}</Link>
            <p>{status.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
