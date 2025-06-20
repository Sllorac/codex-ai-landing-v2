import type React from "react"
import type { Metadata } from "next"
import { Space_Mono } from "next/font/google"
import { Toaster } from "sonner"
import "./globals.css"

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "CODEX - Agente de Criativos com I.A.",
  description: "A inteligência artificial criou a sala. Você foi o escolhido pra entrar.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={spaceMono.className}>
      <body>
        {children}
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "rgba(0, 0, 0, 0.9)",
              border: "1px solid rgba(0, 191, 255, 0.3)",
              color: "#00bfff",
            },
          }}
        />
      </body>
    </html>
  )
}
