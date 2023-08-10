'use client'
import { useEffect, useState } from 'react'
import styles from '@/styles/Navigation.module.css'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'

export function NavigationCategory({
  category,
  current,
  children,
}: {
  category: Category
  current?: Article
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (current?.category._id === category._id) {
      setIsOpen(true)
    }
  }, [current, category])

  return (
    <dl className={styles.Nav_Contents}>
      <dt onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#888"
              fillRule="nonzero"
              d="M13.825 7.15833333 10 10.975 6.175 7.15833333l-1.175 1.175 5 4.99999997 5-4.99999997z"
            />
          </svg>
        ) : (
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="#888"
              fillRule="nonzero"
              d="m8.33333333 5-1.175 1.175L10.975 10l-3.81666667 3.825 1.175 1.175 4.99999997-5z"
            />
          </svg>
        )}
        {category.name}
      </dt>
      {isOpen && <dd>{children}</dd>}
    </dl>
  )
}
