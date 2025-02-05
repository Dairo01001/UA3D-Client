import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components'
import { useToast } from '@/hooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { getAllPrograms, updateProgram } from './services'

export const Program = () => {
  const [cookie] = useCookies(['user'])
  const { accessToken } = cookie.user
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { data, isLoading } = useQuery({
    queryFn: () => getAllPrograms(),
    queryKey: ['programs']
  })

  const mutation = useMutation({
    mutationFn: updateProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs'] })
      toast({
        title: 'Estado del programa actualizado',
        description: 'El estado del programa ha sido actualizado',
        variant: 'default'
      })
    },
    onError: () => {
      toast({
        title: 'Error al actualizar el estado del programa',
        description: 'No se pudo actualizar el estado del programa',
        variant: 'destructive'
      })
    }
  })

  if (isLoading || !data) return <p>Loading...</p>

  return (
    <div className="w-full">
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
                            status: !status,
                            accessToken
                          })
                        }}
                      >
                        Cambiar estado
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link to={`/program/${id}`}>Ver detalles</Link>
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
