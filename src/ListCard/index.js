import './index.css'
import {Component} from 'react'

class ListCard extends Component {
  incrementBtnClk = () => {
    const {addCartCount, data} = this.props
    addCartCount(data)
  }

  decrementBtnClk = () => {
    const {removeCartCount, data} = this.props
    removeCartCount(data)
  }

  render() {
    const {data, cartItems} = this.props
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

    const custamization =
      addOnCat.length !== 0 ? 'Customizations available' : ''

    const getQuantity = () => {
      const cartItem = cartItems.find(each => each.dishId === dishId)
      if (cartItem !== undefined) {
        return <p className="text">{cartItem.quantity}</p>
      }
      return <p className="text">0</p>
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
            <p className="desc">Not Available</p>
          )}
          <p className="custamization">{custamization}</p>
        </div>
        <p className="dish_calories">{dishCalories} Calories</p>
        <img src={dishImage} alt={dishImage} className="dish_image" />
      </li>
    )
  }
}
export default ListCard
