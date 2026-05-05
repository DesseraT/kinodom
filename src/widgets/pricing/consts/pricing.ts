import type { IPricingItem } from '@/entities/pricingItem/index'
export const tariffs: IPricingItem[] = [
  {
    title: 'Лайт',
    price: 250,
    benefits: [
      { text: 'Кино и сериалы на каждый день', isLocked: false },
      { text: 'Суперхиты', isLocked: true },
      { text: 'Всё для детей', isLocked: true },
      { text: 'Образовательные передачи', isLocked: true },
      { text: 'Amediateka и Start', isLocked: true },
    ],
  },
  {
    title: 'Оптимум',
    price: 300,
    benefits: [
      { text: 'Кино и сериалы на каждый день', isLocked: false },
      { text: 'Суперхиты', isLocked: false },
      { text: 'Всё для детей', isLocked: false },
      { text: 'Образовательные передачи', isLocked: true },
      { text: 'Amediateka и Start', isLocked: true },
    ],
  },
  {
    title: 'Плюс',
    price: 400,
    benefits: [
      { text: 'Кино и сериалы на каждый день', isLocked: false },
      { text: 'Суперхиты', isLocked: false },
      { text: 'Всё для детей', isLocked: false },
      { text: 'Образовательные передачи', isLocked: false },
      { text: 'Amediateka и Start', isLocked: false },
    ],
  },
]
