import React, {Component}  from 'react'

import ShoppingCart from './ShoppingCart.react'
import StoreItem from './StoreItem.react'

import shoppingCartHelpers from '../lib/shoppingCartHelpers'

import './storeDashboard.scss'


export default class StoreDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      cart: [],
      storeData: []
    }

    this.addItemToCart = this.addItemToCart.bind(this)
    this.updateQuantity = this.updateQuantity.bind(this)
    this.deleteCartItem = this.deleteCartItem.bind(this)
    this.emptyCart = this.emptyCart.bind(this)
    this.confirmPurchase = this.confirmPurchase.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.storeData !== this.state.storeData) {
      this.setState({ storeData: nextProps.storeData })
    }
  }

  confirmPurchase() { this.setState({cart: []}) }

  emptyCart() {
    let revertedStoreData = this.state.storeData.map(storeDataItem => {
      this.state.cart.map(cartItem => {
        if (storeDataItem.itemName === cartItem.itemName) {
          storeDataItem.quantityRemaining = storeDataItem.quantityRemaining + cartItem.quantity
        }
      })

      return storeDataItem
    })

    this.setState({
      cart: [],
      storeData: revertedStoreData
    })
  }

  updateQuantity(update, item) {
    if (update === 'remove') {
      if (item.quantity === 1) {
        this.deleteCartItem(item)
      } else {
        let updatedCart = this.state.cart.map(cartItem => {
          if (cartItem.itemName === item.itemName) {
            cartItem.quantity--

            if (item.outOfStock) {
              item.outOfStock = false
            }
          }
            return cartItem
        })

        let updatedStoreData = this.state.storeData.map(storeDataItem => {
          if (storeDataItem.itemName === item.itemName) {
            storeDataItem.quantityRemaining++
          }
            return storeDataItem
        })

        this.setState({
          cart: updatedCart,
          storeData: updatedStoreData
        })
      }
    } else {
      this.addItemToCart(item)
    }
  }

  deleteCartItem(itemToDelete) {
    let cart = this.state.cart

    let deletedCartItem = cart.map(cartItem => {
      if (cartItem.itemName === itemToDelete.itemName) {
        return itemToDelete.itemName
      }
    }).indexOf(itemToDelete.itemName)

    let updatedStoreData = this.state.storeData.map(storeDataItem => {
      if (storeDataItem.itemName === itemToDelete.itemName) {
        storeDataItem.quantityRemaining = storeDataItem.quantityRemaining + itemToDelete.quantity
      }

      return storeDataItem
    })

    cart.splice(deletedCartItem, 1)

    this.setState({
      cart: cart,
      storeData: updatedStoreData
    })
  }

  addItemToCart(item) {
    let foundItem = false
    let outOfStock = false

    let foundCartItem = this.state.cart.map(cartItem => {
      if (cartItem.itemName === item.itemName) {
        foundItem = true
      }

      return cartItem
    })

    if (foundItem) {
      let updatedCart = this.state.cart.map(cartItem => {
        if (cartItem.itemName === item.itemName) {
          cartItem.quantity++
        }
          return cartItem
      })

      let updatedStoreData = this.state.storeData.map(storeDataItem => {
        if (storeDataItem.itemName === item.itemName) {
          storeDataItem.quantityRemaining--

          if (storeDataItem.quantityRemaining === 0) {
            outOfStock = true
          }
        }
          return storeDataItem
      })

      updatedCart.map(it => {
        if (it.itemName === item.itemName) {
          it.outOfStock = outOfStock
        }
        return it;
      })

      this.setState({
        cart: updatedCart,
        storeData: updatedStoreData
      })
    } else {
      if (this.state.cart.length === 0) {
        this.setState({
          cart: [{
            itemName: item.itemName,
            imgSrc: item.imgSrc,
            outOfStock: outOfStock,
            price: item.price,
            quantity: 1
          }]
        })

        this.state.storeData.map(storeDataItem => {
          if (storeDataItem.itemName === item.itemName) {
            storeDataItem.quantityRemaining--
            this.setState({storeData: this.state.storeData})
          }
        })
      } else {
        let stateCart = this.state.cart

        stateCart.push({
          itemName: item.itemName,
          imgSrc: item.imgSrc,
          outOfStock: outOfStock,
          price: item.price,
          quantity: 1
        })

        let updateStoreData = this.state.storeData.map(cartItem => {
          if (cartItem.itemName === item.itemName) {
            cartItem.quantityRemaining--
          }
          return cartItem
        })

        this.setState({
          cart: stateCart,
          storeData: updateStoreData
        })
      }
    }
  }

  render() {
    if (this.props.loading) {
      return <div>Loading Store Dashboard...</div>
    } else {
      return (
        <main className='store-dashboard'>
          <div className='store-dashboard-content'>
            <div className='category-name'>
              <div><h2>{this.props.itemsCategory}</h2></div>
            </div>
            <div className='item-wrapper'>
              <section className='items-container'>
                {
                  this.state.storeData.map(item => (
                    <StoreItem key={`${item.itemName}-storeItem`} item={item} addItemToCart={this.addItemToCart} />
                  ))
                }
              </section>
              <ShoppingCart
                cart={this.state.cart}
                confirmPurchase={this.confirmPurchase}
                deleteCartItem={this.deleteCartItem}
                emptyCart={this.emptyCart}
                updateQuantity={this.updateQuantity}
              />
            </div>
          </div>
        </main>
      )
    }
  }
}

StoreDashboard.defaultProps = {
  itemsCategory: 'Fruit'
}
