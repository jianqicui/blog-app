import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname !== '/dashboard') {
    return NextResponse.next()
  }

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET
  })

  if (session) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/', req.url))
}
