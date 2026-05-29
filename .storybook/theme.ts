import { create } from 'storybook/theming'
import '../src/app/styles/main.css'
export const storybookTheme = create({
  base: 'dark',
  appContentBg: 'var(--color-bg-main)',
  textColor: '#ffffff',
})
