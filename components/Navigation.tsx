import { Suspense } from 'react'
import { NavigationArticleList } from '@/components/NavigationArticleList'
import { NavigationCategory } from '@/components/NavigationCategory'
import { SearchField, SearchFieldFallback } from '@/components/SearchField'
import { getArticles, getCategories } from '@/lib/newt'
import styles from '@/styles/Navigation.module.css'
import type { Article } from '@/types/article'

export async function Navigation({ current }: { current?: Article }) {
  const articles = await getArticles()
  const categories = await getCategories()

  const getArticlesOfCategory = (categoryId: string) => {
    return articles.filter((article) => article.category._id === categoryId)
  }

  return (
    <nav className={styles.Nav}>
      <Suspense fallback={<SearchFieldFallback />}>
        <SearchField />
      </Suspense>
      {categories.map((category) => (
        <NavigationCategory
          key={category._id}
          category={category}
          current={current}
        >
          <NavigationArticleList
            articles={getArticlesOfCategory(category._id)}
            current={current}
          />
        </NavigationCategory>
      ))}
    </nav>
  )
}
