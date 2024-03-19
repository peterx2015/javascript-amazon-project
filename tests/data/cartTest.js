import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
console.log('the first cart:', cart);
describe('test suite: addToCart', () => {

    //16e
    //hook钩子，在每个it用例执行前，执行这个函数
    beforeEach(() => {
        spyOn(localStorage, 'setItem');//监听localStorage的setItem方法
    });

    it('adds an existing product to the cart', () => {
    
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(2);
        //16c
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: '1'
            }])
        );

    });

    it('add a new product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6')
        expect(cart[0].quantity).toEqual(1);
        //16d
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',
            JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }])
        );


    })
   
})
//16i
describe('test suite: removeCart', () => {
    beforeEach(()=>{
        spyOn(localStorage, 'getItem').and.callFake(() => {
            const fakeCart = JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }])
            return fakeCart ;
            
        });
        console.log('befroeEach: ',cart);
        spyOn(localStorage, 'setItem');
    })

    


    //移除购物车内指定的productId
    it('should remove a productId that is in the cart', () => {
        loadFromStorage();
        console.log('cart is: ', cart);
        const removeProductId = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
        removeFromCart(removeProductId);
        let removedProduct = null;
        cart.forEach((cartItem)=>{
            if (cartItem.productId === removeProductId ) {
                removedProduct = cartItem
            }
        })
         expect( removedProduct ).toEqual(null)
         expect(cart.length).toEqual(0)
         expect(localStorage.setItem).toHaveBeenCalledTimes(1)
         
    });

    //移除购物车内不存在的productId
    it('should do nothing, when remove a productId that is NOT in the cart', () => {
        loadFromStorage();
        const previousCart = JSON.parse(JSON.stringify(cart));
        removeFromCart("idtest1");
        const newCart = cart;
        expect(previousCart).toEqual(newCart)
        expect(cart.length).toEqual(1)
        expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    });




});

//16k
describe('test suite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage, 'setItem');//监听localStorage的setItem方法
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();

    });

    it('update the delivery option of a product in the cart', () => {
        const product1 = cart[0];
        updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "2");
        
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('2');
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);


    });

    it('should do nothing when give a product id that is not in the cart to updateDeliveryOption', () => {
        updateDeliveryOption('idnotinthecart','2');
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    });
    
    //16m
    it('should do nothing when give a deliveryId that is not exist to updateDeliveryOption', () => {
        updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "4");
        expect(cart.length).toEqual(1);
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0)
    });

});

/*
{
    //一段有问题的代码，其中的previousCart和newCart实际上都是cart对象的引用

    //移除购物车内不存在的productId
    it('remove a productId that is NOT in the cart, should do nothing', () => {
        const previousCart = cart;
        removeFromCart("idtest1");
        const newCart = cart;
        expect(previousCart).toEqual(newCart)

    });
}
*/