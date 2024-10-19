import { Prisma } from '@prisma/client'
import prisma from '@/lib/utils/prisma'
import { DefaultArgs } from '@prisma/client/runtime/library'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const categorySlug = searchParams.get('categorySlug')
  const authorId = searchParams.get('authorId')
  const pageNumber = searchParams.get('pageNumber')
  const pageSize = searchParams.get('pageSize')

  const where: Prisma.PostWhereInput = {}

  if (categorySlug) {
    where.categorySlug = categorySlug
  }

  if (authorId) {
    where.authorId = authorId
  }

  const query: Prisma.PostFindManyArgs<DefaultArgs> = {
    where,
    orderBy: [
      {
        updatedAt: 'desc'
      }
    ],
    include: {
      category: true,
      author: true
    }
  }

  if (pageNumber && pageSize) {
    query.skip = +pageNumber! * +pageSize!
    query.take = +pageSize!
  }

  const [totalCount, posts] = await prisma.$transaction([
    prisma.post.count({ where: query.where }),
    prisma.post.findMany(query)
  ])

  const result = {
    totalCount,
    posts
  }

  return Response.json(result, { status: 200 })
}

export async function POST(request: Request) {
  const data = await request.json()

  const result = await prisma.post.create({
    ...data
  })

  return Response.json(result, { status: 201 })
}
