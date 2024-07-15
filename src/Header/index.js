import {FaCartPlus} from 'react-icons/fa'
import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import CartContext from '../context/CartContext'

const Header = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const {nameInput} = props

      const name =
        nameInput === undefined
          ? 'UNI Resto Cafe'
          : nameInput[0].restaurant_name
      const logoutBtnClk = () => {
        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
      }

      const cartItemsCount = cartList.length

      const renderCartListCount = () => (
        <div className="ScoreContainer">
          <p className="ScoreBoard">{cartItemsCount}</p>
        </div>
      )

      return (
        <div className="HeaderContainer">
          <Link to="/" className="link">
            <h1 className="Heading">{name}</h1>
          </Link>
          <div className="ScoreContainer">
            <h1 className="Title">My Orders</h1>
            <Link to="/cart">
              <button type="button">
                <FaCartPlus className="CartImage" size={43} />
              </button>
            </Link>
            {renderCartListCount()}

            <button className="logout" onClick={logoutBtnClk}>
              Log out
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(Header)
