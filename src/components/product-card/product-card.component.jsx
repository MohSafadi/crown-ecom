import Button from "../button/button.component";

import "./product-card.styles.scss";

const ProductCard = ({ products }) => {

    return (
        <div className="product-card-container">
            <img src={products.imageUrl} alt={products.name} />
            <div className="footer">
                <span className="name">{products.name}</span>
                <span className="price">{products.price}</span>
            </div>
            <Button buttonType="inverted">Add to cart</Button>
        </div>
    )
};

//This component will be used in "shop.component" where it has access to the shop-data.json.
//The code there maps through the json and applies it to the component to show separate product cards.
export default ProductCard;