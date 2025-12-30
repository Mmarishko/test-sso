type User = {
  id: string
  name: string
  address: string
}

type Shop = {
  id: string
  name: string
  address: string
}
type ShopId = string
type UserId = string

function getUserAddr(value: User) {
  return value.address
}

const shop: Shop = { id: '1', name: 'Spar', address: 'Полежаева 120' }

getUserAddr(shop) // no error, хотя должно быть

type Brand<T, U> = T & { __type: U } // __type — фиктивное свойство, которое никогда не существует в runtime.

type UserBrand = Brand<User, 'User'>
type ShopBrand = Brand<Shop, 'Shop'>

function getUserBrandAddr(value: UserBrand) {
  return value.address
}

const shop1: ShopBrand = shop as ShopBrand
const user1: UserBrand = shop as UserBrand

// getUserBrandAddr(shop1) // error, ура!
getUserBrandAddr(user1)
