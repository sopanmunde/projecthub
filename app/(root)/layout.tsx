import type { Metadata } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/navbar";

export const metadata: Metadata = {
  title: "Project Hub",
  description: "Manage your projects with ease",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Project Hub",
    description: "Manage your projects with ease",
    url: "https://projecthub-gray.vercel.app/",
    siteName: "Project Hub",

},
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      > <ClerkProvider>
         <ThemeProvider>
          <Nav/>
        {children}
        </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
