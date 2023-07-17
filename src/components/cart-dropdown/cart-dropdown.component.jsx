import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";

const CartDropdown = () => {
    return (
        <div className="cart-dropdown-container">
            <div className="cartitems"></div>
            <Button>Go To Checkout</Button>
        </div>
    )
};

export default CartDropdown;