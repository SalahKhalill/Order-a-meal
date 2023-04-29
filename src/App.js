import { useState } from 'react'
import Cart from './components/Cart/Cart'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import CartProvider from './components/store/CartProvider'

function App() {
    const [cartIsShown, setCartIsShown] = useState(false)
    function ShowCartHandler() {
        setCartIsShown(true)
    }
    function HideCartHandler() {
        setCartIsShown(false)
    }
    return (
        <CartProvider>
            {cartIsShown && <Cart onClose={HideCartHandler} />}
            <Header onShowCart={ShowCartHandler} />
            <main>
                <Meals></Meals>
            </main>
        </CartProvider>
    )
}

export default App
