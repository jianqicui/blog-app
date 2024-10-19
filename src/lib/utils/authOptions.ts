import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import prisma from '@/lib/utils/prisma'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {}

        if (!username || !password) {
          throw new Error('Missing username or password')
        }

        const user = await prisma.user.findFirst({
          where: {
            name: credentials?.username
          }
        })

        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password')
        }

        return user
      }
    })
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ token, session }) {
      session.user.id = token.sub!

      return session
    }
  }
}

export default authOptions
