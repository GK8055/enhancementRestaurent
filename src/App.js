import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './LoginForm'
import Home from './Home'
import Cart from './Cart'

import CartContext from './context/CartContext'
import ProtectedRouter from './ProtectedRouter'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductPresent = cartList.find(
      each => each.dishId === product.dishId,
    )
    if (isProductPresent) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.dishId === product.dishId) {
            const updateQty = each.quantity + product.quantity
            return {...each, quantity: updateQty}
          } else {
            each
          }
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  incrementCartItemQuantity = dishId => {
    console.log('2')
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.dishId === dishId) {
          const updateQty = each.quantity + 1
          return {...each, quantity: updateQty}
        }
        return each
      }),
    }))
  }
  decrementCartItemQuantity = dishId => {
    const {cartList} = this.state
    const productObj = cartList.find(each => each.dishId === dishId)
    if (productObj.quantity > 1) {
      // console.log('decrese')
      this.setState(prev => ({
        cartList: prev.cartList.map(each => {
          if (each.dishId === dishId) {
            const updateQty = each.quantity - 1
            return {...each, quantity: updateQty}
          }
          return each
        }),
      }))
    } else {
      this.removeCartItem(dishId)
    }
  }
  removeCartItem = dishId => {
    const {cartList} = this.state
    const updateCartLiat = cartList.filter(each => each.dishId !== dishId)
    this.setState({cartList: updateCartLiat})
  }

  render() {
    const {cartList} = this.state
    //console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRouter exact path="/" component={Home} />
          <ProtectedRouter exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
