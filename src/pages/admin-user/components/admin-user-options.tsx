import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { deleteUser } from '../services/admin-user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/hooks'

export interface AdminUserOptionsProps {
  userId: string
  accessToken: string
}

export const AdminUserOptions = ({
  userId,
  accessToken
}: AdminUserOptionsProps) => {
  const { toast } = useToast()

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast({
        title: 'Eliminado',
        description: 'El usuario se ha eliminado correctamente',
        variant: 'default'
      })
    }
  })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            navigator.clipboard.writeText(userId)
          }}
        >
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link to={`/user/${userId}`}>Ver perfil</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            await mutation.mutate({ accessToken, userId })
          }}
        >
          Eliminar usuario
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
