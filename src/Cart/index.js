import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../context/CartContext'
import EmptyCartView from '../EmptyCartView'
//import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      const removeAllCartItemsBtn = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="btn_container">
                  <button type="button" onClick={removeAllCartItemsBtn}>
                    Remove All
                  </button>
                </div>
                <CartListView />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
