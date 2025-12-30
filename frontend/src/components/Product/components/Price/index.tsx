import { ReactElement, useState } from 'react'

export const Price = ({ price, currency, discount }): ReactElement => {
  return (
    <div>
      <span>{price}</span>
      <span>{currency}</span>
      <span>{discount}</span>
    </div>
  )
}
