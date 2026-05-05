export interface IBenefitItem {
  text: string
  isLocked: boolean
}
export interface IPricingItem {
  title?: string
  price: number
  benefits: IBenefitItem[]
}
