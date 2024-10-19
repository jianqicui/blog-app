'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import moment from 'moment'
import axiosClient from '@/lib/utils/axiosClient'
import Pagination from './pagination'
import { PostProps } from '@/lib/types'

type Props = {
  page?: number
  categorySlug?: string
}

const Posts = ({ page = 1, categorySlug }: Props) => {
  const pathname = usePathname()

  const router = useRouter()

  const pageSize = 10

  const [totalPages, setTotalPages] = useState(0)
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const pageNumber = page - 1

      const { data } = await axiosClient.get('/api/posts', {
        params: {
          pageNumber,
          pageSize,
          categorySlug
        }
      })

      const totalPages = Math.ceil(data.totalCount / pageSize)

      setTotalPages(totalPages)
      setPosts(data.posts)
    }

    loadPosts()
  }, [page, categorySlug])

  const handleClickPage = (page: number) => {
    if (page < 1) {
      page = 1
    } else if (page > totalPages) {
      page = totalPages
    }

    const urlSearchParams = new URLSearchParams()

    if (categorySlug) {
      urlSearchParams.set('categorySlug', categorySlug)
    }

    urlSearchParams.set('page', page.toString())

    router.push(`${pathname}?${urlSearchParams.toString()}`)
  }

  return (
    <div className="bg-white p-8">
      {posts.map(post => (
        <div key={post.id} className="my-4 rounded-md border p-4 text-center">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-500">
            {moment(post.updatedAt || post.createdAt).format(
              'YYYY-MM-DD HH:mm:ss'
            )}
          </p>
          <p className="text-gray-500">Category: {post.category?.title}</p>
          <p className="text-gray-500">Author: {post.author?.name}</p>
          <p className="text-gray-500">{post.description}</p>
          <Link href={`/posts/${post.id}`}>
            <span className="text-blue-500">Read more</span>
          </Link>
        </div>
      ))}
      <div className="mt-4 flex justify-center">
        <Pagination
          currentPage={+page}
          totalPages={totalPages}
          onClickPage={handleClickPage}
        />
      </div>
    </div>
  )
}

export default Posts
