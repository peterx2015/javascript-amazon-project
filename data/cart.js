export let cart = JSON.parse(localStorage.getItem('cart')) || [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},
{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}
];

export let cartQuantityOnAllPage = 0;

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//添加到购物车【product对象】
export function addToCart(productId) {
    let matchingItem;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    })

    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        });
    }

    saveToStorage();
}


//更新购物车数量显示
export function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity;
    })

    cartQuantityOnAllPage = cartQuantity;
    saveToStorage()

}

//根据id和数量，向购物车添加商品
export function updateCartQuantityById(productId, quantity) {
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            cartItem.quantity = quantity;
        }
    })
    updateCartQuantity();

}


//从购物车删除
export function removeFromCart(productId) {
    const newCart = [];

    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem)
        }

    })

    cart = newCart;
    saveToStorage();
}


