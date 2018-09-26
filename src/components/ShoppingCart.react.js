import React, {Component}  from 'react'

import ShoppingCartItems from './ShoppingCartItems.react'

import './shoppingCart.scss'


export default class ShoppingCart extends Component {
  render() {
    const cart = this.props.cart

    return (
      <section className='shopping-cart'>
        <h2>Shopping Cart</h2>
        {
          (cart.length !==0) && (
            <div className='cart-size'>
              {cart.length} {cart.length > 1 ? 'items' : 'item'}
            </div>
          )
        }
        <ShoppingCartItems {...this.props} />
      </section>
    )
  }
}
