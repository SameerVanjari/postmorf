import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import { TanStackDevtools } from "@tanstack/react-devtools"
import { QueryClientProvider } from "@tanstack/react-query"

import Footer from "@/components/Footer"
import TanStackQueryDevtools from "@/integrations/tanstack-query/devtools"
import appCss from "../styles.css?url"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { queryClient } from "../router"

const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');var m=(t==='light'||t==='dark'||t==='system')?t:'system';var p=window.matchMedia('(prefers-color-scheme:dark)').matches;var r=m==='system'?(p?'dark':'light'):m;var el=document.documentElement;el.classList.remove('light','dark');el.classList.add(r);if(m==='system'){el.removeAttribute('data-theme')}else{el.setAttribute('data-theme',m)}el.style.colorScheme=r}catch(e){}})();`

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "PostMorph",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: theme init script */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="font-sans antialiased">
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <SidebarProvider defaultOpen>
              <AppSidebar variant="sidebar" />
              <SidebarInset>
                <main className="flex min-h-svh flex-col bg-background ">
                  <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                  </header>
                  <div className="flex flex-1 flex-col">{children}</div>
                  <Footer />
                </main>
              </SidebarInset>
            </SidebarProvider>
          </TooltipProvider>
        </QueryClientProvider>
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
