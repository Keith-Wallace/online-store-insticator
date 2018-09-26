import React, {Component}  from 'react'

import imageMissingPlaceholder from '../assets/image_missing_placeholder.jpg'


export default class StoreItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: []
    }

    this.addItemToCart = this.addItemToCart.bind(this)
    this.imgURL = this.imgURL.bind(this)
  }

  componentWillMount() { this.setState({item: this.props.item}) }

  addItemToCart(event) { this.props.addItemToCart(this.props.item) }

  imgURL(event) {
    if (event.target) {
      let tempItem = this.state.item
      tempItem.imgSrc = imageMissingPlaceholder

      this.setState({item: tempItem})
    }
  }

  render() {
    let item = this.state.item
    let outOfStock = (item.quantityRemaining < 1) ? 'disabled' : ''

    return (
      <div className='item-details' key={item.itemName}>
        <div className='item-image'>
          <img src={item.imgSrc} alt={item.itemName} onError={this.imgURL}/>
        </div>
        <div>
          {item.itemName}
        </div>
        <div className='price-quantity'>
          <strong>${item.price.toFixed(2)}</strong> {`${item.quantityRemaining} in Stock`}
        </div>
        <div>
          <button className='add-button' onClick={this.addItemToCart} disabled={outOfStock}>Add to Cart</button>
        </div>
      </div>
    )
  }
}
