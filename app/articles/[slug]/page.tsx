import { notFound } from 'next/navigation'
import { htmlToText } from 'html-to-text'
import { Navigation } from '@/components/Navigation'
import { getArticles, getArticle, getCategories } from '@/lib/newt'
import styles from '@/styles/Article.module.css'

type Props = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}
export const dynamicParams = false

export async function generateMetadata({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)

  const title = article?.meta?.title || article?.title
  const bodyDescription = htmlToText(article?.body || '', {
    selectors: [{ selector: 'img', format: 'skip' }],
  }).slice(0, 200)
  const description = article?.meta?.description || bodyDescription
  const ogImage = article?.meta?.ogImage?.src

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      images: ogImage,
    },
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params
  const article = await getArticle(slug)
  if (!article) {
    notFound()
  }

  const body = {
    __html: article.body || '',
  }

  return (
    <>
      <Navigation current={article} />
      <article className={styles.Article}>
        <h1 className={styles.Article_Title}>{article?.title || ''}</h1>
        <div
          className={styles.Article_Body}
          dangerouslySetInnerHTML={body}
        ></div>
      </article>
    </>
  )
}
