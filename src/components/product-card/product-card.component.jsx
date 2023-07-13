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

export default ProductCard;