import React from 'react'

const CartContext = React.createContext({
  removeAll: () => {},
  remove: () => {},
  addCartItem: () => {},
  incrementCartItem: () => {},
  decreamentCartItem: () => {},
  cartList: [],
})

export default CartContext
