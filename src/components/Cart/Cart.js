import { useContext, useState } from 'react'
import CartContext from '../store/cart-context'
import Modal from '../UI/Modal'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = (props) => {
    const [isDone, setDone] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx = useContext(CartContext)
    const hasItems = cartCtx.items.length > 0
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id)
    }
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    }
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    )
    function doneHandler() {
        setDone(true)
    }
    async function submitOrderHandler(userData) {
        setIsSubmitting(true)
        await fetch(
            'https://food-app-6b586-default-rtdb.firebaseio.com/orders.json',
            {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedITems: cartCtx.items,
                }),
            }
        )
        setIsSubmitting(false)
        setDidSubmit(true)
        cartCtx.clearCart()
    }

    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onClose} className={classes['button--alt']}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={doneHandler}>
                    Order
                </button>
            )}
        </div>
    )

    const cartModalContent = (
        <>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isDone && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!isDone && modalActions}
        </>
    )
    const isSubmittingModalContent = <p>Sending order data</p>
    const didSubmittedModalContent = (
        <>
            <p>Successfully ordered</p>
            <div className={classes.actions}>
                <button onClick={props.onClose} className={classes.button}>
                    Close
                </button>
            </div>
        </>
    )

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmittedModalContent}
        </Modal>
    )
}
export default Cart
