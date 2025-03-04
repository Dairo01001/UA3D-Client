import { Card, CardTitle } from '@/components'
import { getAllServers } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const Server = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['server'],
    queryFn: getAllServers
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid h-full w-[1000px] grid-cols-2 gap-4 rounded-lg p-10">
        {data.map(({ gridName, id, urlHost, status }) => (
          <Card className="w-[400px] p-5 hover:shadow-lg" key={id}>
            <CardTitle>{gridName}</CardTitle>
            <p>{urlHost}</p>
            <p>{status.name}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Server
