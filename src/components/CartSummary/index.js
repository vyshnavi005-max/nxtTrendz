import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const totalAmount = () => {
        let amount = 0
        for (let i = 0; i < cartList.length; i += 1) {
          amount += cartList[i].quantity * cartList[i].price
        }
        return amount
      }
      const items = cartList.length > 1 ? 'items' : 'item'
      return (
        <div className="cart-summmary">
          <h1 className="total-amount">Order Total: {totalAmount()}</h1>
          <p className="total-items">
            {cartList.length} {items} in cart
          </p>
          <button className="checkout">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
