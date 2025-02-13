import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { initialsUsername, isAdmin } from '@/lib/utils'
import { User as UserType } from '@/models'
import { LogOut, SlidersVertical, User } from 'lucide-react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

export interface NavBarAvatarProps {
  user: UserType
}

export const NavBarAvatar = ({ user }: NavBarAvatarProps) => {
  const navigate = useNavigate()
  const [_, __, removeCookie] = useCookies(['user'])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="mr-20 cursor-pointer">
          <Avatar>
            <AvatarImage src={user.photo} alt="Avatar" />
            <AvatarFallback>{initialsUsername(user.username)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">
          {user.username.toUpperCase()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Cuenta</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isAdmin(user) && (
          <>
            <DropdownMenuItem onClick={() => navigate('/dashboard')}>
              <SlidersVertical className="mr-2 h-4 w-4" />
              <span>Panel de Control</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={() => removeCookie('user')}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavBarAvatar
