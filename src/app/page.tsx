import Posts from '@/components/posts'

type Props = {
  searchParams: { page: number }
}

const Page = async ({ searchParams }: Props) => {
  const page = searchParams.page

  return <Posts page={page} />
}

export default Page
