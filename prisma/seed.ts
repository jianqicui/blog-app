import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

const categories = [
  {
    slug: 'science',
    title: 'Science',
  },
  {
    slug: 'technology',
    title: 'Technology',
  },
  {
    slug: 'life',
    title: 'Life',
  },
  {
    slug: 'sports',
    title: 'Sports',
  },
  {
    slug: 'entertainment',
    title: 'Entertainment',
  }
]

async function main() {
  await prisma.category.createMany({
    data: categories,
  })

  const users = []

  for (let i = 0; i < 3; i++) {
    const user = {
      name: `user${i + 1}`,
      password: await hash('pass1234', 10)
    }

    users.push(user)
  }

  await prisma.user.createMany({
    data: users,
  })

  const posts = []

  let postNo = 1

  const categoryList = await prisma.category.findMany()
  const userList = await prisma.user.findMany()

  for (const category of categoryList) {
    for (const user of userList) {
      for (let i = 0; i < 9; i++) {
        const post = {
          title: `Post ${postNo}`,
          description: `Description ${postNo}`,
          content: `<strong>Content ${postNo}</strong>`,
          categorySlug: category.slug,
          authorId: user.id
        }

        posts.push(post)

        postNo++
      }
    }
  }

  await prisma.post.createMany({
    data: posts,
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
