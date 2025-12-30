import { ReactElement, useState } from 'react'
import { Price } from './components/Price'

const currency = { name: 'rub' }

export const Products = (): ReactElement => {
  const [price, setPrice] = useState({ value: '898' })
  const discount = new Number(5)

  // price.value = '5252'

  return <Price price={price} currency={currency} discount={discount} />
}
