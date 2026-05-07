import axios from 'axios'

const TMDB_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMmY5YTRiMGFiZDY0YzU5MmY3MjNmZjU5ZTc4NTk5NCIsIm5iZiI6MTc3Nzk4OTMwOC4wNzgsInN1YiI6IjY5ZjlmNmJjZmUyNGI3YWZiZTU1ZjRjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rpdNvg0PfYmJpMcSavpBz7mmWJgSPsOP78Z1bzNe_Og'

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
  params: {
    language: 'ru-RU',
  },
})
