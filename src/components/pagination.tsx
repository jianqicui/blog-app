'use client'

import { useEffect, useState } from 'react'

type Props = {
  currentPage: number
  totalPages: number
  onClickPage: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onClickPage }: Props) => {
  const [pages, setPages] = useState<number[]>([])

  useEffect(() => {
    const generatePages = () => {
      const pageCount = Math.min(10, totalPages)
      const halfPageLimit = Math.floor(pageCount / 2)

      let startPage = Math.max(1, currentPage - halfPageLimit)
      let endPage = Math.min(totalPages, startPage + pageCount - 1)

      if (endPage - startPage + 1 < pageCount) {
        startPage = Math.max(1, endPage - pageCount + 1)
      }

      const pagesArray = []

      for (let i = startPage; i <= endPage; i++) {
        pagesArray.push(i)
      }

      setPages(pagesArray)
    }

    if (totalPages > 0) {
      generatePages()
    } else {
      setPages([])
    }
  }, [totalPages, currentPage])

  const prevPage = () => {
    onClickPage(currentPage - 1)
  }

  const nextPage = () => {
    onClickPage(currentPage + 1)
  }

  return (
    <div className="flex items-center justify-center">
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className="mr-2 rounded border border-gray-300 px-3 py-1">
        {'<'}
      </button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onClickPage(page)}
          className={`mr-2 rounded border border-gray-300 px-3 py-1 ${currentPage === page ? 'bg-blue-500 text-white' : ''}`}>
          {page}
        </button>
      ))}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className="ml-2 rounded border border-gray-300 px-3 py-1">
        {'>'}
      </button>
    </div>
  )
}

export default Pagination
