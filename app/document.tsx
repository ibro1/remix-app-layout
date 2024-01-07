import { loadIcons } from "@iconify/react"
import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { useEffect } from "react"

import { NProgress } from "~/components/shared/nprogress"
import { ThemeHead, useTheme, type Theme } from "~/components/shared/theme"
import { configIcons } from "~/configs/icons"
import { configSite } from "~/configs/site"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function Document({
  dataTheme,
  children,
}: {
  dataTheme?: Theme | null
  children?: React.ReactNode
}) {
  const { ENV } = useRootLoaderData()
  const [theme] = useTheme()

  useEffect(() => {
    const unsubscribe = loadIcons(configIcons)
    return unsubscribe
  })

  return (
    <html lang={configSite.languageCode} className={theme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeHead ssrTheme={Boolean(dataTheme)} />
      </head>

      <body id="__remix">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <NProgress />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
