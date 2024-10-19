export interface CategoryProps {
  id: string
  title: string
  slug: string
}

export interface UserProps {
  id: string
  name: string
}

export interface PostProps {
  id?: string
  title: string
  description: string
  content: string
  createdAt: Date
  updatedAt?: Date
  categorySlug?: string
  category?: CategoryProps
  authorId?: string
  author?: UserProps
}
