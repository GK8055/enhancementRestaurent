import {FaCartPlus} from 'react-icons/fa'
import {
  HeaderContainer,
  Heading,
  CartImage,
  Title,
  ScoreContainer,
  ScoreBoard,
} from './styledComponents'

const Header = props => {
  const {cartItems,nameInput} = props
  //console.log("name", nameInput[0])
  const name=nameInput[0]===undefined?[]:nameInput[0]
  const renderScore = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)


  return (
    <HeaderContainer>
      <Heading>{name.restaurant_name}</Heading>
      <ScoreContainer>
        <Title>My Orders</Title>
        <CartImage>
          <FaCartPlus size={43} />
        </CartImage>
        <ScoreBoard>{renderScore()}</ScoreBoard>
      </ScoreContainer>
    </HeaderContainer>
  )
}

export default Header
