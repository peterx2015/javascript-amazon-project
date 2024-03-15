import { cart, removeFromCart, updateCartQuantity, cartQuantityOnAllPage, updateCartQuantityById } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js'


let cartSummaryHTML = '';

cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    })
    console.log(matchingProduct);
    console.log(productId);
    console.log(matchingProduct.id);
    cartSummaryHTML +=
        `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button" data-product-id=${matchingProduct.id}>
                    Update
                  </span>
                  <input class="quantity-input" data-product-id= "${matchingProduct.id}">
                  <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
})

document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            const container = document.querySelector(`.js-cart-item-container-${productId}`)
            container.remove();
            updateCartQuantity();//更新购物车数量
            document.querySelector('.js-checkout-quantity')
                .innerHTML = cartQuantityOnAllPage;


            console.log(link.dataset.productId);
            console.log(cart);
        })
    })

//点击update按钮,显示输入框和save按钮
document.querySelectorAll('.js-update-button')
    .forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const container = document.querySelector(`.js-cart-item-container-${productId}`);
            container.classList.add('is-editing-quantity');

        })
    })

//点击save按钮，隐藏输入框和update按钮,获取输入框的值
document.querySelectorAll('.save-quantity-link')
    .forEach(button => {
        button.addEventListener('click', () => {

            updateInputValueByElement(button)

        })
    })

//在输入框按下enter键时  
document.querySelectorAll('.quantity-input')
    .forEach((inputElement) => {
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {

                updateInputValueByElement(inputElement)

            }
        });
    })


//根据元素更新输入框的值（传入save按钮或输入框）   
function updateInputValueByElement(element) {
    const productId = element.dataset.productId;//获取元素的productId
    const container = document.querySelector(`.js-cart-item-container-${productId}`);


    const quantityInput = container.querySelector(`.quantity-input`);
    const quantity = Number(quantityInput.value);
    if (quantity >= 0 && quantity < 1000) {
        //更新购物车数量
        container.classList.remove('is-editing-quantity');//隐藏输入框和update按钮
        updateCartQuantityById(productId, quantity);
        document.querySelector('.js-checkout-quantity')
            .innerHTML = cartQuantityOnAllPage;

        container.querySelector('.quantity-label').textContent = quantity;
    } else {
        alert('数量错误,请输入0-999');


    }



}

//页面加载后，重新计算购物车数量，显示数量
window.addEventListener('load', () => {
    updateCartQuantity();
    document.querySelector('.js-checkout-quantity')
        .innerHTML = cartQuantityOnAllPage;

})


