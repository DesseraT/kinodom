import imgGeek from '../assests/icon-geek.png'
import imgYoda from '../assests/icon-yoda.png'
import imgIronMan from '../assests/icon-ironman.png'
import imgAvatar from '../assests/icon-avatar.png'
import type { IAdvantageItem } from '@/entities/advantageItem/index'
export const advantagesList: IAdvantageItem[] = [
  {
    img: imgAvatar,
    label: 'Большой выбор',
    text: '10 000 фильмов и сериалов уже в библиотеке. Ежедневное пополнение новинками кино',
  },
  {
    img: imgIronMan,
    label: 'Список рекомендаций',
    text: 'Персонализированный список рекомендаций, подобранных на основе ваших интересов',
  },
  {
    img: imgYoda,
    label: 'Лучшее мировое кино',
    text: 'Кино, сериалы co всего мира, включая Европу и Азию. A также достойное российское кино',
  },
  {
    img: imgGeek,
    label: 'Месяц бесплатно',
    text: 'Весь каталог КиноДома и все новинки кино и сериалов - бесплатно целый месяц после регистрации',
  },
]
