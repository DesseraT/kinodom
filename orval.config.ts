import { defineConfig } from 'orval'

export default defineConfig({
  tmdb: {
    input: {
      target: 'https://developer.themoviedb.org/openapi/tmdb-api.json',
    },
    output: {
      mode: 'split',
      target: './src/shared/api/tmdb.ts',
      schemas: './src/shared/model/types',
      //with setted client and axios value it was generation all in 1 wrapper fabric-function -> bad to use
      // client: 'axios',
      baseUrl: 'https://api.themoviedb.org',
      override: {
        mutator: {
          path: './src/shared/api/tmdbClient.ts',
          name: 'tmdbClient',
        },
      },
      tsconfig: './tsconfig.app.json',
    },
    hooks: {
      afterAllFilesWrite: 'eslint src/shared/api --ext .ts --fix',
    },
  },
})
