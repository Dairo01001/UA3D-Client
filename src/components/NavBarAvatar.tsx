import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initialsUsername } from "@/lib/utils";
import { User as UserType } from "@/models";
import { resetUser } from "@/redux/states";

import { LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
export interface NavBarAvatarProps {
  user: UserType;
}

export const NavBarAvatar = ({ user }: NavBarAvatarProps) => {

  const dispatch = useDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-14 w-14 mr-20 cursor-pointer">
          <Avatar>
            <AvatarImage src={user.image} alt="Avatar" />
            <AvatarFallback>{initialsUsername(user.username)}</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => dispatch(resetUser())}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NavBarAvatar;
