import { createClient } from 'newt-client-js'
import { cache } from 'react'
import type { AppMeta, GetContentsQuery } from 'newt-client-js'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'

const client = createClient({
  spaceUid: process.env.NEXT_PUBLIC_NEWT_SPACE_UID + '',
  token: process.env.NEXT_PUBLIC_NEWT_API_TOKEN + '',
  apiType: process.env.NEXT_PUBLIC_NEWT_API_TYPE as 'cdn' | 'api',
})

export const getApp = cache(async (): Promise<AppMeta> => {
  const app = await client.getApp({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
  })
  return app
})

export const getArticles = cache(
  async (query?: GetContentsQuery): Promise<Article[]> => {
    const { items: articles } = await client.getContents<Article>({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
      query: {
        order: ['_sys.customOrder'],
        ...query,
      },
    })
    return articles
  },
)

export const getArticle = cache(
  async (slug: string): Promise<Article | null> => {
    if (!slug) return null

    const article = await client.getFirstContent<Article>({
      appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
      modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
      query: {
        depth: 2,
        order: ['_sys.customOrder'],
        slug,
      },
    })
    return article
  },
)

export const getCategories = cache(async (): Promise<Category[]> => {
  const { items: categories } = await client.getContents<Category>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_CATEGORY_MODEL_UID + '',
    query: {
      order: ['_sys.customOrder'],
    },
  })

  const { items: articles } = await client.getContents<{ category: string }>({
    appUid: process.env.NEXT_PUBLIC_NEWT_APP_UID + '',
    modelUid: process.env.NEXT_PUBLIC_NEWT_ARTICLE_MODEL_UID + '',
    query: {
      depth: 0,
      select: ['category'],
    },
  })

  const getCategoryCount = (category: Category) => {
    return articles.filter((article) => {
      return article.category === category._id
    }).length
  }

  const validCategories = categories.filter((category) => {
    // 1件も記事のないカテゴリは除外
    return getCategoryCount(category) > 0
  })

  return validCategories
})
