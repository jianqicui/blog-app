import { PostProps } from '@/lib/types'

type Props = {
  post: PostProps
  handleClickEdit: (post: PostProps) => void
  handleClickDelete: (id: string) => void
}

const DashboardPostItem = ({
  post,
  handleClickEdit,
  handleClickDelete
}: Props) => {
  return (
    <div className="flex items-center justify-between border p-4">
      <div className="font-bold text-blue-500">{post.category?.title}</div>
      <div>{post.title}</div>
      <div className="space-x-4">
        <button
          onClick={() => handleClickEdit(post)}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700">
          Edit
        </button>
        <button
          onClick={() => handleClickDelete(post.id!)}
          className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  )
}

export default DashboardPostItem
