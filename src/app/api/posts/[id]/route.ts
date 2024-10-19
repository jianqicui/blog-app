import prisma from '@/lib/utils/prisma'

type Props = {
  params: { id: string }
}

export async function GET(_request: Request, { params }: Props) {
  const id = params.id

  const result = await prisma.post.findFirst({
    where: {
      id
    },
    include: {
      category: true,
      author: true
    }
  })

  return Response.json(result, { status: 200 })
}

export async function PUT(request: Request, { params }: Props) {
  const id = params.id

  const data = await request.json()

  const result = await prisma.post.update({
    where: {
      id
    },
    ...data
  })

  return Response.json(result, { status: 200 })
}

export async function DELETE(_request: Request, { params }: Props) {
  const id = params.id

  await prisma.post.delete({
    where: {
      id
    }
  })

  return new Response(null, {
    status: 204
  })
}
