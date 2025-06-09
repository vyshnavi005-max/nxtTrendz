import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    this.setState(prevState => {
      const {cartList} = prevState
      const existingProduct = cartList.find(item => item.id === product.id)
      if (existingProduct) {
        const updatedCartList = cartList.map(item => {
          if (item.id === product.id) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        })
        return {cartList: updatedCartList}
      }
      return {cartList: [...cartList, product]}
    })
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newCartList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      }
      return eachItem
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const updatedCartList = cartList
      .map(item => {
        if (item.id === id) {
          if (item.quantity === 1) {
            return null
          }
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      .filter(item => item !== null)

    this.setState({cartList: updatedCartList})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const newCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: newCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}
export default App
