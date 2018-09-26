import React, {Component}  from 'react'

import './shoppingCartItems.scss'


export default class ShoppingCartItems extends Component {
  calculateTotalPrice() {
    let totalCost = 0

    this.props.cart.map(cartItem => {
      totalCost += (cartItem.price * cartItem.quantity)
    })

    return totalCost
  }

  render() {
    return (
      <div className='shopping-cart-items'>
        {
          this.props.cart.map(cartItem => {
            const outOfStock = cartItem.outOfStock ? 'disabled' : ''

            return (
              <div className='shopping-cart-item' key={cartItem.itemName}>
                <div className='item-row'>
                  <div className='cart-item-image'>
                    <img src={cartItem.imgSrc} alt={cartItem.itemName} />
                  </div>
                  <div className='item-quantity'>
                    <button className='remove' onClick={() => this.props.updateQuantity('remove', cartItem)}>
                      <i className='arrow down' />
                    </button>
                    <strong>{cartItem.quantity}</strong>
                    <button className='add' onClick={() => this.props.updateQuantity('add', cartItem)} disabled={outOfStock}>
                      <i className='arrow up' />
                    </button>
                  </div>
                </div>
                <div className='item-row'>
                  @ ${cartItem.price.toFixed(2)} each = ${(cartItem.price * cartItem.quantity).toFixed(2)}
                  <div className='delete' onClick={() => this.props.deleteCartItem(cartItem)}>delete</div>
                </div>
              </div>
            )
          })
        }
        {
          this.props.cart.length > 0 && (
            <div className='cart-totals'>
              <div className='total'>Total: ${this.calculateTotalPrice().toFixed(2)}</div>
              <div className='empty-cart' onClick={() => this.props.emptyCart()}>Empty Cart</div>
              <button onClick={() => this.props.confirmPurchase()}>Confirm Purchase</button>
            </div>
          )
        }
      </div>
    )
  }
}
