import { useContext, useState, useEffect } from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../store/cart-context'
function HeaderCartButton(props) {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const ctx = useContext(CartContext)
    const { items } = ctx
    const numberOfCart = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${
        btnIsHighlighted ? classes.bump : ''
    }`
    useEffect(() => {
        if (items.length === 0) {
            return
        }
        setBtnIsHighlighted(true)
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false)
        }, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [items])
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCart}</span>
        </button>
    )
}
export default HeaderCartButton
