import { Prisma } from '@prisma/client'
import prisma from '@/lib/utils/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const slug = searchParams.get('slug')

  const where: Prisma.CategoryWhereInput = {}

  if (slug) {
    where.slug = slug
  }

  const data = await prisma.category.findMany({
    where
  })

  return Response.json(data)
}
