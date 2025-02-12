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
import { Input } from '@/components'
import { useMemo, useState } from 'react'

export function AdminUser() {
  const [cookie] = useCookies(['user'])
  const [usernameFilter, setUsernameFilter] = useState('')
  const { accessToken } = cookie.user
  const { data, isLoading } = useQuery({
    queryFn: () => getAllUsers({ accessToken }),
    queryKey: ['users']
  })

  if (isLoading || !data) return <p>Loading...</p>

  const users = useMemo(
    () => data?.filter(user => user.username.includes(usernameFilter)),
    [data, usernameFilter]
  )

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <div className="w-full">
        <Input
          value={usernameFilter}
          onChange={e => {
            setUsernameFilter(e.target.value)
          }}
          placeholder="Filtrar por nombre de usuario"
        />
      </div>
      <Table>
        <TableCaption>Lista de los usuarios</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Estado</TableHead>
            <TableHead>Usuario</TableHead>
            <TableHead>Correo</TableHead>
            <TableHead>Roll</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(({ id, username, status, role, person }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{status.name}</TableCell>
              <TableCell>{username}</TableCell>
              <TableCell>{person?.email}</TableCell>
              <TableCell>{role.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
