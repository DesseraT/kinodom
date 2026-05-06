import iconJin from '../assets/icon-jin.png'
import iconRick from '../assets/icon-rick.png'
import type { IDiscountItem } from '@/entities/discountItem/index'
export const discounts: IDiscountItem[] = [
  {
    icon: iconRick,
    title: 'Скидка 50% на активность в сервисе',
    description:
      'Смотри кино, принимай участие в развитии сервиса: пиши рецензии, собирай подборки из фильмов и сериалов, проходи квизы.',
    subDescription:
      'Копи баллы, и получай скидку 50% на любой тариф при следующей оплате подписки на КиноДом',
    btn: {
      text: 'Подробнее',
      type: 'outline',
    },
  },
  {
    icon: iconJin,
    title: 'Скидка 50% на активность в сервисе',
    description:
      'Просто приложи фото действующего студенческого билета при оформлении подписки и наслаждайся кино!',
    subDescription:
      'Важно! Скидка действует до конца текущего года. Студенческая скидка не суммируется с другими скидками и акциями сервиса',
    btn: {
      text: 'Я студент, я хочу скидку!',
      type: 'primary',
    },
  },
]
