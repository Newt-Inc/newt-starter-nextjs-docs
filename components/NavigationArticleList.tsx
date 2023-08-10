import Link from 'next/link'
import type { Article } from '@/types/article'

export function NavigationArticleList({
  articles,
  current,
}: {
  articles: Article[]
  current?: Article
}) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article._id}>
          <Link
            href={`/articles/${article.slug}`}
            aria-current={current?.slug === article.slug}
          >
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
