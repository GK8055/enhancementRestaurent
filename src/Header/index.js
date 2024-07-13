import {FaCartPlus} from 'react-icons/fa'
import './index.css'

const Header = props => {
  const {cartItems, nameInput} = props
  //console.log("name", nameInput[0])
  const name = nameInput[0] === undefined ? [] : nameInput[0]
  const renderScore = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className="HeaderContainer">
      <h1 className="Heading">{name.restaurant_name}</h1>
      <div className="ScoreContainer">
        <h1 className="Title">My Orders</h1>
        <FaCartPlus className="CartImage" size={43} />
        <div className="ScoreBoard">{renderScore()}</div>
      </div>
    </div>
  )
}

export default Header
