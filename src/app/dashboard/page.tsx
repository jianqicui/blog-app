'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import DashboardPosts from '@/components/dashboardPosts'
import DashboardPost from '@/components/dashboardPost'
import axiosClient from '@/lib/utils/axiosClient'
import { CategoryProps, PostProps } from '@/lib/types'

const Page = () => {
  const { data: session } = useSession()

  const [categories, setCategories] = useState<CategoryProps[]>([])

  const pageSize = 10

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  const [posts, setPosts] = useState<PostProps[]>([])

  const [showAddEditPostPage, setShowAddEditPostPage] = useState(false)

  const [currentPost, setCurrentPost] = useState<PostProps | null>(null)

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await axiosClient.get('/api/categories')

      setCategories(data)
    }

    loadCategories()
  }, [])

  const loadPostsCallback = useCallback(async () => {
    const pageNumber = currentPage - 1

    const { data } = await axiosClient.get('/api/posts', {
      params: {
        pageNumber,
        pageSize,
        authorId: session?.user.id
      }
    })

    const totalPages = Math.ceil(data.totalCount / pageSize)

    setTotalPages(totalPages)
    setPosts(data.posts)
  }, [currentPage, session?.user.id])

  useEffect(() => {
    loadPostsCallback()
  }, [loadPostsCallback])

  const refreshPosts = () => {
    if (currentPage === 1) {
      loadPostsCallback()
    } else {
      setCurrentPage(1)
    }
  }

  const handleClickAdd = () => {
    setCurrentPost(null)

    setShowAddEditPostPage(true)
  }

  const handleClickEdit = (post: PostProps) => {
    setCurrentPost(post)

    setShowAddEditPostPage(true)
  }

  const handleClickDelete = async (id: string) => {
    await axiosClient.delete(`/api/posts/${id}`)

    refreshPosts()
  }

  const handleAddOrEditPost = async (post: PostProps) => {
    if (post.id) {
      await axiosClient.put(`/api/posts/${post.id}`, {
        data: {
          ...post
        }
      })
    } else {
      await axiosClient.post('/api/posts', {
        data: {
          ...post
        }
      })
    }

    refreshPosts()

    setShowAddEditPostPage(false)
  }

  const handleCancel = () => {
    setShowAddEditPostPage(false)
  }

  return (
    <>
      {!showAddEditPostPage ? (
        <DashboardPosts
          currentPage={currentPage}
          totalPages={totalPages}
          posts={posts}
          setCurrentPage={setCurrentPage}
          handleClickAdd={handleClickAdd}
          handleClickEdit={handleClickEdit}
          handleClickDelete={handleClickDelete}
        />
      ) : (
        <DashboardPost
          categories={categories}
          currentPost={currentPost}
          handleAddOrEditPost={handleAddOrEditPost}
          handleCancel={handleCancel}
        />
      )}
    </>
  )
}

export default Page
