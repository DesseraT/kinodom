import { describe, it, expect } from 'vitest'

import { parseMovieTvList } from '@/shared/api/convertApi'

const genresMap = {
  28: 'Боевик',
  12: 'Приключения',
  35: 'Комедия',
}

describe('convertApi parsing tests', () => {
  describe('parseMovieTvList', () => {
    describe('corner cases', () => {
      it('apiMovies is null / undefined / is not array', () => {
        // @ts-expect-error: apiMovies is null
        expect(parseMovieTvList(null, genresMap)).toEqual([])
        // @ts-expect-error: apiMovies is undefined
        expect(parseMovieTvList(undefined, genresMap)).toEqual([])
      })
      it('apiMovies is not array', () => {
        // @ts-expect-error: apiMovies is not array
        expect(parseMovieTvList('undefined', genresMap)).toEqual([])
      })
      it('apiMovies is out of "id" / "rating" properties', () => {
        const incompleteData = [{}]
        const result = parseMovieTvList(incompleteData, genresMap)
        expect(result).not.toBe(undefined)
        expect(result[0]?.id).toBe(-1)
        expect(result[0]?.rating).toBe(0)
      })
    })
    describe('title assignment', () => {
      it('should pick title as title for movies', () => {
        const data = [{ id: 1, title: 'Inception' }]
        const result = parseMovieTvList(data, genresMap)
        expect(result[0]?.title).toBe('Inception')
      })
      it('should pick name as title for movies', () => {
        const data = [{ id: 1, name: 'Inception' }]
        const result = parseMovieTvList(data, genresMap)
        expect(result[0]?.title).toBe('Inception')
      })
    })
  })
})
