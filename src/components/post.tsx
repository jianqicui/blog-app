'use client'

import { useEffect, useState } from 'react'
import moment from 'moment'
import { PostProps } from '@/lib/types'
import axiosClient from '@/lib/utils/axiosClient'

type Props = {
  id: string
}

const Post = ({ id }: Props) => {
  const [post, setPost] = useState<PostProps | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      const { data } = await axiosClient.get(`/api/posts/${id}`)

      setPost(data)
    }

    if (id) {
      loadPost()
    }
  }, [id])

  return (
    <>
      {post && (
        <div className="bg-white p-8">
          <div className="my-4 rounded-md border p-4 text-center">
            <h1 className="mb-4 text-2xl font-bold">{post.title}</h1>
            <p className="text-gray-500">
              {moment(post.updatedAt || post.createdAt).format(
                'YYYY-MM-DD HH:mm:ss'
              )}
            </p>
            <p className="text-gray-500">Category: {post.category?.title}</p>
            <p className="text-gray-500">Author: {post.author?.name}</p>
            <p className="text-gray-500">{post.description}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      )}
    </>
  )
}

export default Post
