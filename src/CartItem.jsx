import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0
    cart.forEach((item)=>(totalAmount += (item.cost * item.quantity)))
    return totalAmount
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };

  const handleIncrement = (index) => {
    if (cart[index].quantity <= 9){
      dispatch(updateQuantity({ index, type: 'increment' }))
    } else {
      alert('You can only add up to 10 units of this product.')
    }
    
  };

  const handleDecrement = (index) => {
    if (cart[index].quantity > 0)
      dispatch(updateQuantity({ index, type: 'decrement' }))
    else {
      return
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    let totalCost = 0
    return totalCost = totalCost + (item.cost * item.quantity)
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item, index) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(index)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(index)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item.name)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


