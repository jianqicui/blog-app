'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { CategoryProps, PostProps } from '@/lib/types'
import Editor from './editor'

type Props = {
  categories: CategoryProps[]
  currentPost: PostProps | null
  handleAddOrEditPost: (post: PostProps) => void
  handleCancel: () => void
}

const isFormDataValid = (formData: FormData) => {
  const formDataArray = Array.from(formData)

  return !formDataArray.some(([_key, value]) => !value)
}

const DashboardPost = ({
  categories,
  currentPost,
  handleAddOrEditPost,
  handleCancel
}: Props) => {
  const { data: session } = useSession()

  const [content, setContent] = useState(currentPost?.content)

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    if (!isFormDataValid(formData) || !content) {
      toast('All fields are required!')

      return
    }

    const formDataArray = Array.from(formData).map(([key, value]) => [
      key,
      value.toString().trim()
    ])

    const formObject = Object.fromEntries(formDataArray)

    let post

    if (currentPost) {
      post = {
        id: currentPost.id,
        ...formObject,
        content
      }
    } else {
      post = {
        ...formObject,
        content,
        authorId: session?.user.id
      }
    }

    handleAddOrEditPost(post)
  }

  return (
    <div className="flex justify-center bg-white">
      <div className="mt-8 w-full max-w-md space-y-4">
        <h1 className="mb-4 text-center text-2xl font-bold">Post</h1>
        <form onSubmit={handleFormSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={currentPost?.title}
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={currentPost?.description}
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <div className="mt-1">
              <Editor value={content} onChange={setContent} />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="categorySlug" className="block text-gray-700">
              Category
            </label>
            <select
              id="categorySlug"
              name="categorySlug"
              defaultValue={currentPost?.category?.slug}
              className="mt-1 w-full rounded border border-gray-300 p-2">
              {categories.map(category => (
                <option key={category.slug} value={category.slug}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
              {currentPost === null ? 'Add' : 'Edit'}
            </button>
            <button
              onClick={handleCancel}
              className="ml-2 rounded bg-blue-500 px-4 py-2 text-white">
              Cancel
            </button>
          </div>
        </form>
        <Toaster />
      </div>
    </div>
  )
}

export default DashboardPost
