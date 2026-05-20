import type { Meta, StoryObj } from '@storybook/vue3'
import { PrimaryOutlineBtn } from '..'
import type { IBtnProps } from '../model/types'
const meta: Meta<typeof PrimaryOutlineBtn & IBtnProps> = {
  title: 'Shared/PrimaryOutlineBtn',
  component: PrimaryOutlineBtn,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'outline'],
    },
    // onClick: { action: 'clicked' },
  },
}

export default meta
export type Story = StoryObj<typeof PrimaryOutlineBtn>

export const Primary: Story = {
  args: {
    type: 'primary',
    default: 'Оформить подписку',
  },
}

export const Outlined: Story = {
  args: {
    type: 'outline',
    default: 'Посмотреть ещё',
  },
}
