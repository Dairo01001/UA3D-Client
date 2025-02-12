import { Bot, Settings, Settings2, User } from 'lucide-react'
import * as React from 'react'

import { NavMain } from '@/components/nav-main'
import { NavUser } from '@/components/nav-user'
import { TeamSwitcher } from '@/components/team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/components/ui/sidebar'
import { useAppSelector } from '@/hooks'

const data = {
  navMain: [
    {
      title: 'Usuarios',
      url: '#',
      icon: User,
      isActive: false,
      items: [
        {
          title: 'Usuarios',
          url: '/users'
        }
      ]
    },
    {
      title: 'Server',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Crear Servidor',
          url: '/create-server'
        },
        {
          title: 'Servidores',
          url: '/servers'
        }
      ]
    },
    {
      title: 'Dependencias',
      url: '#',
      icon: Settings,
      items: [
        {
          title: 'Facultades',
          url: '/faculty'
        },
        {
          title: 'Programas',
          url: '/program'
        }
      ]
    },
    {
      title: 'Configuraciones',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'Roles',
          url: '/rol'
        },
        {
          title: 'Estado de servidor',
          url: '/server-status'
        },
        {
          title: 'Estado de usuarios',
          url: '/user-status'
        }
      ]
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const fullUser = useAppSelector(state => state.fullUser)

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser profile={fullUser.profile} person={fullUser.person} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
