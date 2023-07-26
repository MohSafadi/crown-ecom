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

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (existingItem.quantity === 1) {
        return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    };

    return cartItems.map((item) => {
        return item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
    });

};

const deleteCartItem = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find((item) => item.id === cartItemToRemove.id);

    if (existingItem.quantity >= 1) {
        return cartItems.filter((item) => item.id !== cartItemToRemove.id);
    };
}

const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemsToCart: () => { },
    removeItemsFromCart: () => { },
    deleteItemFromCart: () => { },
    totalQty: 0,
    totalCartPrice: 0,
});

const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalQty, setTotalQty] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);


    useEffect(() => {
        const qtyCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setTotalQty(qtyCount)
    }, [cartItems]);

    useEffect(() => {
        const priceCalculation = cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        setTotalCartPrice(priceCalculation)
    }, [cartItems]);

    const addItemsToCart = (productToAdd) => {
        setCartItems(newCartItem(cartItems, productToAdd));
    };

    const removeItemsFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const deleteItemFromCart = (cartItemToRemove) => {
        setCartItems(deleteCartItem(cartItems, cartItemToRemove));
    };

    const value = { isCartOpen, setIsCartOpen, addItemsToCart, cartItems, totalQty, totalCartPrice, removeItemsFromCart, deleteItemFromCart };
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};

export { CartContext, CartProvider };