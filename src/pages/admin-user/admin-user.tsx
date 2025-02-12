import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'
import { getAllUsers } from './services/admin-user.service'
import { Avatar, AvatarFallback, AvatarImage, Input } from '@/components'
import { useMemo, useState } from 'react'
import { initialsUsername } from '@/lib/utils'
import { AdminUserOptions } from './components/admin-user-options'

export function AdminUser() {
  const [cookie] = useCookies(['user'])
  const [usernameFilter, setUsernameFilter] = useState('')
  const { accessToken } = cookie.user
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsers({ accessToken }),
    queryKey: ['users']
  })
  const users = useMemo(
    () =>
      data?.filter(
        user =>
          user.username.includes(usernameFilter) ||
          user.role?.name.includes(usernameFilter)
      ),
    [data, usernameFilter]
  )

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <h1 className="text-3xl font-bold">Usuarios</h1>
      <div className="w-full">
        <Input
          value={usernameFilter}
          onChange={e => {
            setUsernameFilter(e.target.value)
          }}
          placeholder="Filtrar por nombre de usuario o rol"
        />
      </div>
      <Table className="w-full border-collapse border-2 border-gray-300">
        <TableCaption>Lista de los usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">Avatar</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Roll</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-1/12">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map(({ id, username, status, role, person, profile }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">
                <Avatar>
                  <AvatarImage src={profile?.photo} />
                  <AvatarFallback>{initialsUsername(username)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{person?.email}</TableCell>
              <TableCell>{role.name}</TableCell>
              <TableCell>{status.name}</TableCell>
              <TableCell>
                <AdminUserOptions userId={id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
