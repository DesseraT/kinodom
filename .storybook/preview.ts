import type { Preview } from '@storybook/vue3-vite'
import '../src/app/styles/main.css'
import { storybookTheme } from './theme'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: 'var(--color-bg-main)',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    docs: {
      theme: storybookTheme,
    },
  },
}

export default preview
