import Link from 'next/link'
import { htmlToText } from 'html-to-text'
import { Navigation } from '@/components/Navigation'
import { getArticles } from '@/lib/newt'
import styles from '@/styles/Search.module.css'

type Props = {
  searchParams: {
    q?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const { q } = searchParams

  const articles = q ? await getArticles({ search: q }) : []

  return (
    <>
      <Navigation />
      <div className={styles.SearchResult}>
        <div className={styles.SearchResult_Text}>
          Found {articles.length} results for your search
        </div>
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article._id} className={styles.SearchResult_Item}>
              <Link
                className={styles.SearchResult_ItemTitle}
                href={`/articles/${article.slug}`}
              >
                {article.title}
              </Link>
              <div className={styles.SearchResult_ItemDescription}>
                {htmlToText(article.body)}
              </div>
            </div>
          ))
        ) : (
          <p className={styles.Empty}>
            Please try again with different keywords.
          </p>
        )}
      </div>
    </>
  )
}
