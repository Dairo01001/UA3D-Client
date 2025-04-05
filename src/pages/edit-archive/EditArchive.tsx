import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getArchives } from '../Server/services/edit-archive.service'
import { Textarea } from '@/components/ui/textarea'

export const EditArchive = () => {
  const { gridName } = useParams()
  const { isLoading, data } = useQuery({
    queryKey: ['archive', gridName],
    queryFn: () => getArchives(gridName)
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      <h4 className="pb-10 text-center text-xl font-bold">Editar archivo</h4>
      <form>
        <span className="text-center text-xl font-bold">WorldFile</span>
        <Textarea
          name="myWorldFile"
          defaultValue={data.myWorldFile.content}
          rows={10}
          cols={100}
        />
        <span className="text-center text-xl font-bold">RegionFile</span>
        <Textarea
          name="regionFile"
          defaultValue={data.regionFile.content}
          rows={10}
          cols={100}
        />
      </form>
    </div>
  )
}
