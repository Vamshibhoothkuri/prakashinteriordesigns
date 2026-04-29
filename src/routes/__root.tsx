import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Luxe Interiors — Elegant Interior Design Studio" },
      { name: "description", content: "Bespoke interior design for residential and commercial spaces. Timeless, warm, and crafted with care." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Luxe Interiors — Elegant Interior Design Studio" },
      { property: "og:description", content: "Bespoke interior design for residential and commercial spaces. Timeless, warm, and crafted with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Luxe Interiors — Elegant Interior Design Studio" },
      { name: "twitter:description", content: "Bespoke interior design for residential and commercial spaces. Timeless, warm, and crafted with care." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0746019-c636-4881-86b8-ffc10b8f69d4/id-preview-d750e928--4c0b77c7-f1f7-4f61-a859-f007a7a249b2.lovable.app-1777366045026.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/d0746019-c636-4881-86b8-ffc10b8f69d4/id-preview-d750e928--4c0b77c7-f1f7-4f61-a859-f007a7a249b2.lovable.app-1777366045026.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <WhatsAppButton />
    </>
  );
}
