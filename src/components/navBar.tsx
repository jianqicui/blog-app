'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import axiosClient from '@/lib/utils/axiosClient'
import { CategoryProps } from '@/lib/types'
import Login from './login'

const NavBar = () => {
  const { data: session } = useSession()

  const pathname = usePathname()

  const searchParams = useSearchParams()

  const isNavItemActived = (navItemSlug: string) => {
    if (navItemSlug === '' && pathname === '/') {
      return true
    }

    const categorySlug = searchParams.get('categorySlug')

    if (navItemSlug === categorySlug) {
      return true
    }

    return false
  }

  const [showLogin, setShowLogin] = useState(false)

  const [navItems, setNavItems] = useState<CategoryProps[]>([])

  useEffect(() => {
    const loadNavItems = async () => {
      const { data } = await axiosClient.get('/api/categories')

      const homeCategory = { title: 'Home', slug: '' }

      setNavItems([homeCategory, ...data])
    }

    loadNavItems()
  }, [])

  return (
    <>
      <nav className="bg-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link href="/">
              <Image
                width={100}
                height={60}
                src="/logo.png"
                alt="Blog App"
                priority
              />
            </Link>
          </div>
          {pathname !== '/dashboard' && (
            <div className="flex space-x-4">
              {navItems.map((navItem, index) => (
                <Link
                  key={index}
                  href={
                    navItem.slug === ''
                      ? '/'
                      : `/posts?categorySlug=${navItem.slug}`
                  }>
                  <span
                    className={`rounded-md px-3 py-2 text-gray-800 hover:bg-blue-300 ${isNavItemActived(navItem.slug) ? 'bg-blue-300' : ''}`}>
                    {navItem.title}
                  </span>
                </Link>
              ))}
            </div>
          )}
          {!session ? (
            <div className="flex items-center">
              <button
                onClick={() => setShowLogin(true)}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                Login
              </button>
            </div>
          ) : (
            <div className="flex items-center">
              {pathname !== '/dashboard' && (
                <Link href="/dashboard" className="mr-4">
                  <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
                    Dashboard
                  </button>
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                Logout {session.user.name}
              </button>
            </div>
          )}
        </div>
      </nav>
      <Login showLogin={showLogin} setShowLogin={setShowLogin} />
    </>
  )
}

export default NavBar
