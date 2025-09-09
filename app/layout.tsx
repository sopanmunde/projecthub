import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

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




export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
        className="antialiased"
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider>

            {children}
            </ClerkProvider>
          </ThemeProvider>
          
        </body>
      </html>
    </>
  )
}
