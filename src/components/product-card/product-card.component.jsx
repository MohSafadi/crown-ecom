
import { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import { CartContext } from "../contexts/cart.context";

const ProductCard = ({ products }) => {

    const { addItemsToCart } = useContext(CartContext);

    const addToCartClickHandler = () => {
        return addItemsToCart(products);
    };


    return (
        <div className="product-card-container">
            <img src={products.imageUrl} alt={products.name} />
            <div className="footer">
                <span className="name">{products.name}</span>
                <span className="price">{products.price}</span>
            </div>
            <Button buttonType="inverted" onClick={addToCartClickHandler}>Add to cart</Button>
        </div>
    )
};

//This component will be used in "shop.component" where it has access to the shop-data.json.
//The code there maps through the json and applies it to the component to show separate product cards.
export default ProductCard;
