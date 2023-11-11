import { Link, NavLink } from "@remix-run/react"
import { type VariantProps } from "class-variance-authority"

import { AvatarAuto, avatarAutoVariants } from "~/components/ui/avatar-auto"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Iconify } from "~/components/ui/iconify"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export interface IndicatorUserProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarAutoVariants> {
  align?: "center" | "start" | "end" | undefined
}

export function IndicatorUser({ align = "end", size }: IndicatorUserProps) {
  const { userData } = useRootLoaderData()
  const { isModeDevelopment } = useAppMode()

  if (!userData) return null

  const createNavProfile = (username: string) => [
    {
      text: "Profile",
      to: `/${username}`,
      icon: "ph:user-duotone",
      shortcut: "⌘K+P",
    },
  ]

  const userNavItems = [
    "/user/dashboard",
    "/user/settings",
    "/user/billing",
    "/user/notifications",
    "/help/shortcuts",
  ]

  const devNavItems = ["/admin", "/components"]

  const authNavItems = ["/logout"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative rounded-full", avatarAutoVariants({ size }))}
        >
          <AvatarAuto
            user={userData}
            imageUrl={userData.images[0]?.url}
            size={size}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
        <DropdownMenuLabel>
          <h4>{userData.fullname}</h4>
          <h5>
            <Link to={`/${userData.username}`}>@{userData.username}</Link>
          </h5>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={[
            ...createNavProfile(userData.username),
            ...configNavigationItems.filter(item =>
              userNavItems.includes(item.to),
            ),
          ]}
        />

        {isModeDevelopment && <DropdownMenuSeparator />}
        {isModeDevelopment && (
          <DropdownMenuGroupItems
            items={configNavigationItems.filter(item =>
              devNavItems.includes(item.to),
            )}
          />
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={configNavigationItems.filter(item =>
            authNavItems.includes(item.to),
          )}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuGroupItems({ items }: { items: NavItem[] }) {
  return (
    <DropdownMenuGroup>
      {items.map(item => (
        <DropdownMenuItem key={item.to} asChild>
          <NavLink to={item.to} className="cursor-pointer">
            <Iconify icon={item.icon} className="me-2" />
            <span>{item.text}</span>
            {item.shortcut && (
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            )}
          </NavLink>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  )
}
