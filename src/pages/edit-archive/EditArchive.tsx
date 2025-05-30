import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getArchives } from '../Server/services/edit-archive.service'
import { EditForm } from './components/edit-form'

export const EditArchive = () => {
  const { gridName } = useParams()
  const { isLoading, data } = useQuery({
    queryKey: ['archive', gridName],
    queryFn: () => getArchives(gridName)
  })

  if (isLoading || !data) return <div>Loading...</div>

  return (
    <div>
      <h4 className="pb-10 text-center text-xl font-bold">Editar archivos</h4>
      <EditForm
        title="WorldFile"
        path={data.myWorldFile.path}
        content={data.myWorldFile.content}
        name="myWorldFile"
      />
      <div className="h-10" />
      <EditForm
        title="RegionFile"
        path={data.regionFile.path}
        content={data.regionFile.content}
        name="regionFile"
      />
    </div>
  )
}
