import { createContext, useState, useEffect } from "react";

//add items to cart
//if item exists, add quantity
//if not add new item

const newCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find((item) => item.id === productToAdd.id);

    if (existingItem) {
        return cartItems.map((item) =>
            item.id === productToAdd.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        )
    };

    return [...cartItems, { ...productToAdd, quantity: 1 }];

};


const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { }
});

const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQty, setTotalQty] = useState(0)


    useEffect(() => {
        const qtyCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setTotalQty(qtyCount)
    }, [cartItems]);

    const addItemsToCart = (productToAdd) => {
        setCartItems(newCartItem(cartItems, productToAdd))
    };
    const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, totalQty };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};

export { CartContext, CartProvider };