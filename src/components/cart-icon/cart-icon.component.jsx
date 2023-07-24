import { CartContext } from "../contexts/cart.context";
import { ReactComponent as CartLogo } from "../../assets/shopping-bag.svg";
import "./cart-icon.styles.scss";
import { useContext } from "react";

const CartIcon = () => {
    const { isCartOpen, setIsCartOpen, totalQty } = useContext(CartContext);

    const toggleCartOpen = () => setIsCartOpen(!isCartOpen);


    return (
        <div className="cart-icon-container" onClick={toggleCartOpen}>
            <CartLogo className="shopping-icon" />
            <span className="item-count">{totalQty}</span>
        </div>
    )
};

export default CartIcon;