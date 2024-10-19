import { Dispatch, SetStateAction } from 'react'
import { PostProps } from '@/lib/types'
import DashboardPostItem from './dashboardPostItem'
import Pagination from './pagination'

type Props = {
  currentPage: number
  totalPages: number
  posts: PostProps[]
  setCurrentPage: Dispatch<SetStateAction<number>>
  handleClickAdd: () => void
  handleClickEdit: (post: PostProps) => void
  handleClickDelete: (id: string) => void
}

const DashboardPosts = ({
  currentPage,
  totalPages,
  posts,
  setCurrentPage,
  handleClickAdd,
  handleClickEdit,
  handleClickDelete
}: Props) => {
  const handleClickPage = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex justify-center bg-white">
      <div className="mt-8 w-full max-w-md space-y-4">
        {posts.map(post => (
          <DashboardPostItem
            key={post.id}
            post={post}
            handleClickEdit={handleClickEdit}
            handleClickDelete={handleClickDelete}
          />
        ))}
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onClickPage={handleClickPage}
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleClickAdd}
            className="mb-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
            Add post
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardPosts
