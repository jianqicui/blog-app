import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import AuthProvider from '@/components/authProvider'
import NavBar from '@/components/navBar'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const title = 'Blog App'
const description = 'Blog App'

export const metadata: Metadata = {
  title,
  description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Suspense>
            <NavBar />
          </Suspense>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
