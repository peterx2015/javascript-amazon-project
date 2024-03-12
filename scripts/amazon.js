


let productsHTML = '';

let setTimeoutArr = [];
let toastStateArr = [];

products.forEach((product) => {
  productsHTML += `
                <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${(product.priceCents / 100).toFixed(2)} 
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-toast-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;

    //创建一个数组，用来管理‘已添加到购物车’toast
   toastStateArr.push({
    productId: product.id,
    settimeoutId: null //储存触发这个toast的计时器id
   })

});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

console.log(toastStateArr);

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', (e) => {
      // const productId = button.dataset.productId;
      const { productId } = button.dataset;
      console.log(productId);
      let matchingItem;
      const selectedQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value)



      //添加到购物车
      cart.forEach((item) => {
        if (item.productId === productId) {
          matchingItem = item;
        }
      })

      if (matchingItem) {
        matchingItem.quantity += selectedQuantity;
      } else {
        cart.push({
          // productId: productId,
          productId,
          quantity: selectedQuantity
        });
      }

      //显示购物车商品数量
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      })
      document.querySelector('.js-cart-quantity')
        .innerHTML = cartQuantity;

      //点击加购后，显示toast提示
      const addedToast = document.querySelector(`.js-added-toast-${productId}`);
      // addedToast.classList.add('add-to-cart-toast')

      /**发起定时时，检测当前项目，是否已经有定时器
       * 如果有，则先将其清除
       * 如过没有，则添加定时器、将其添加到数组，
       * 在定时器内，最后执行从数组移除
       * 
       */

      let toastIndex = null ;
      //找出当前点击的项在toastStateArr中对应的索引
      toastStateArr.forEach((item,index)=>{
        if (item.productId === productId) {
          toastIndex = index;
        }
      })


      if (toastStateArr[toastIndex].settimeoutId !== null) {
        clearTimeout(toastStateArr[toastIndex].settimeoutId);
        addedToast.classList.add('add-to-cart-toast');
        const settimeoutId = setTimeout(() => {
          addedToast.classList.remove('add-to-cart-toast');
          toastStateArr[toastIndex].settimeoutId = null;
        }, 1500);
        toastStateArr[toastIndex].settimeoutId = settimeoutId
      }else{
        addedToast.classList.add('add-to-cart-toast')
        const settimeoutId = setTimeout(() => {
          addedToast.classList.remove('add-to-cart-toast');
          toastStateArr[toastIndex].settimeoutId = null;
        }, 1500);
        toastStateArr[toastIndex].settimeoutId = settimeoutId
      }
      



    })
  })

