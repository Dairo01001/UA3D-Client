import { useCookies } from 'react-cookie'
import { EditPerson, EditProfile } from './components'
import { useUserMe } from './hooks'
import { Navigate } from 'react-router-dom'

export const Profile = () => {
  const { me } = useUserMe()
  const [cookie] = useCookies(['user'])
  const accessToken = cookie?.user?.accessToken
  if (!me) {
    return <div>Loading...</div>
  }

  if (!accessToken) {
    return <Navigate to="/" />
  }

  return (
    <div className="bg-primary-foreground">
      <EditProfile accessToken={accessToken} user={me} />
      <EditPerson person={me.person} />
    </div>
  )
}

export default Profile
