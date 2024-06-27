import {
  HeaderContainer,
  Heading,
  CartImage,
  Title,
  ScoreContainer,
  ScoreBoard,
} from './styledComponents'

import {FaCartPlus} from 'react-icons/fa'

const Header = props => {
  const {cartItems} = props
  const renderScore = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <HeaderContainer>
      <Heading>UNI Resto Cafe</Heading>

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
