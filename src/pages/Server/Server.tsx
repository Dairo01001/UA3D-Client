import { Card, CardTitle } from '@/components'
import { getAllServers } from '@/services'
import { useQuery } from '@tanstack/react-query'

export const Server = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['server'],
    queryFn: getAllServers
  })

  if (isLoading || !data) return <div>Loading...</div>

  console.log(data)

  return (
    <div className="flex w-full items-center justify-center">
      <div className="h-full w-[1000px] p-4">
        {data.map(({ gridName, id, urlHost, status }) => (
          <Card className="w-[400px] p-4" key={id}>
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
