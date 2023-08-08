import { notFound, redirect } from 'next/navigation'
import { getArticles, getCategories } from '@/lib/newt'

export default async function Page() {
  const categories = await getCategories()
  if (categories.length === 0) {
    notFound()
  }

  const articles = await getArticles({ category: categories[0]._id })
  const topArticle = articles[0]

  redirect(`/articles/${topArticle.slug}`)
}
