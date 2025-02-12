import { useParams } from 'react-router-dom'

export const AdminUserDetails = () => {
  const { id } = useParams()

  return <div>AdminUserDetails {id}</div>
}
