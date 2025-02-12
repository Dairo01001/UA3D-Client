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

export interface AdminUserOptionsProps {
  userId: string
}

export const AdminUserOptions = ({ userId }: AdminUserOptionsProps) => {
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
        <DropdownMenuItem>Cambiar estado</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
