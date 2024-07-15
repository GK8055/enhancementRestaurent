import './index.css'
import {Component} from 'react'

import CartContext from '../context/CartContext'

class ListCard extends Component {
  state = {count: 0}

  incrementBtnClk = () => {
    console.log('1')
    this.setState(prev => ({count: prev.count + 1}))
  }

  decrementBtnClk = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prev => ({count: prev.count - 1}))
    }
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            cartList,
          } = value
          const {data} = this.props
          const {count} = this.state
          const {
            dishId,
            dishAvailability,
            dishName,
            dishPrice,
            dishImage,
            addOnCat,
            dishCurrency,
            dishCalories,
            dishDescription,
          } = data

          //console.log('dish', dishAvailability)

          const onAddBtnClk = () => {
            const dishFound = cartList.find(
              each => each.dishName === data.dishName,
            )
            if (!dishFound) {
              addCartItem({...data, quantity: count})
              //console.log('addBtn')
            }
          }

          const addToCartBtn = () => {
            const dishQuantityCheck = cartList.find(each => each.quantity > 1)
            //console.log('dishqty', dishQuantityCheck)
            if (dishAvailability && count > 0) {
              return (
                <button
                  type="button"
                  className="add_btn"
                  onClick={onAddBtnClk}
                >
                  ADD TO CART
                </button>
              )
            }
          }

          const getQuantity = () => {
            return <p className="text">{count}</p>
          }

          return (
            <li className="list_item_container">
              <div className="text_container">
                <h1 className="title">{dishName}</h1>
                <p className="price">
                  {dishCurrency} {dishPrice}
                </p>
                <p className="desc">{dishDescription}</p>

                {dishAvailability ? (
                  <div className="btn_styles">
                    <button
                      type="button"
                      className="icon_size"
                      onClick={this.decrementBtnClk}
                    >
                      -
                    </button>
                    {getQuantity()}
                    <button
                      type="button"
                      className="icon_size"
                      onClick={this.incrementBtnClk}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <p className="desc">Not available</p>
                )}

                <p className="desc">
                  {addOnCat.length !== 0 ? 'Customizations available' : ''}
                </p>

                {addToCartBtn()}
              </div>
              <p className="dish_calories">{dishCalories} Calories</p>
              <img src={dishImage} alt={dishImage} className="dish_image" />
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default ListCard
