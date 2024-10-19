import Post from '@/components/post'

type Props = {
  params: { id: string }
}

const Page = ({ params }: Props) => {
  const id = params.id

  return <Post id={id} />
}

export default Page
