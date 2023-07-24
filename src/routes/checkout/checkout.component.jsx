import { useContext } from "react";
import { CartContext } from "../../components/contexts/cart.context";


const CheckOut = () => {

    const { cartItems, addItemsToCart } = useContext(CartContext);

    return (

        cartItems.map((item) => {


            return (
                <div key={item.id}>
                    <img />
                    <h2>{item.name}</h2>
                    <div className="ItemCount">
                        <span>Reduce</span>
                        <p>{item.quantity}</p>
                        <span onClick={() => addItemsToCart((item))}>Increase</span>
                    </div>
                    <p>{item.price * item.quantity}</p>
                    <button>X</button>
                </div>
            )
        })



    )
};

export default CheckOut;