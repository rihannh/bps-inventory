import {admin1Items, admin2Items} from '@/lib/items/sidebar-items';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/components/ui/collapsible';
import {ChevronDown} from 'lucide-react';
import {NavLink} from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';

export default function AppSidebar({role}: {role: string}) {
  let sidebarItems;
  if (role === 'Admin Sepuh') {
    sidebarItems = admin1Items;
  } else if (role === 'Admin Junior') {
    sidebarItems = admin2Items;
  }
  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <SidebarMenuButton className='h-12 hover:bg-transparent active:bg-transparent space-x-3'>
          <img
            src='/logo-bps.png'
            alt=''
            className='h-full w-fit object-contain'
          />
          <h1 className='font-medium'>Sistem Informasi Inventori</h1>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className='overflow-y-hidden'>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems?.map((item) => (
                <Collapsible
                  defaultOpen
                  className='group/collapsible text-primary'
                  key={item.label}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger className='w-full pr-2 pt-2'>
                      <SidebarMenuButton tooltip={item.label}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                        <ChevronDown
                          className='ml-auto -rotate-90 transition-transform group-data-[state=open]/collapsible:rotate-0'
                          size={20}
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.contents.map((content) => (
                          <SidebarMenuSubItem key={content.title}>
                            <NavLink to={content.url}>
                              {({isActive}) => (
                                <SidebarMenuSubButton
                                  className={`${
                                    isActive
                                      ? 'text-white font-medium bg-violet-500'
                                      : 'text-slate-400'
                                  }`}
                                >
                                  {content.title}
                                </SidebarMenuSubButton>
                              )}
                            </NavLink>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
