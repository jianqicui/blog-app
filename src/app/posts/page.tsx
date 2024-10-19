import Posts from '@/components/posts'

type Props = {
  searchParams: { page: number; categorySlug: string }
}

const Page = ({ searchParams }: Props) => {
  const page = searchParams.page
  const categorySlug = searchParams.categorySlug

  return <Posts page={page} categorySlug={categorySlug} />
}

export default Page
