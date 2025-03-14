import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useToast } from '@/hooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { NewRol } from './components/new-rol'
import { getAllRoles, updateRole } from './services'

export const Rol = () => {
  const [cookies] = useCookies(['user'])
  const { accessToken } = cookies.user
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['rol'],
    queryFn: () => getAllRoles(accessToken)
  })
  const mutation = useMutation({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rol'] })
      toast({
        title: 'Rol editado',
        description: 'El Rol ha sido editado exitosamente',
        variant: 'default'
      })
    },
    onError: () => {
      toast({
        title: 'Error al editar el Rol',
        description: 'No se ha podido editar el Rol',
        variant: 'destructive'
      })
    }
  })

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <div className="w-full">
      <p className="text-center text-2xl font-bold">Roles en la Aplicación</p>

      <div className="flex items-center py-4">
        <NewRol />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ status, name, id }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">
                  {status ? 'Activo' : 'Inactivo'}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(id.toString())
                        }
                      >
                        Copiar ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          mutation.mutate({
                            id,
                            status,
                            accessToken
                          })
                        }}
                      >
                        Cambiar estado
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to={`/rol/${id}`}>Ver detalles</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
