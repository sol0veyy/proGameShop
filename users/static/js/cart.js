const btnBuyProduct = document.querySelectorAll('.btn-buy-product');
const userCartCount = document.getElementById('userCartCount');
const addCartProduct = document.querySelectorAll('#addCartProduct');
const delCartProduct = document.querySelectorAll('#delCartProduct');

class Cart {
    static async addToCartProduct(productId) {
        const query = `
            mutation {
                createUserCart(productId: ${productId}) {
                    userCart {
                        id
                    }
                }
            }
        `
        
        try {
            await this.makeGraphQLRequest(query);
            CartUI.updateUserCartCountUI(1)
        } catch (error) {
            console.error(error)
        }
    }

    static async removeFromCartProduct(productId) {
        const query = `
            mutation {
                delUserCart(productId: ${productId}) {
                    userCart {
                        product {
                            name
                        }
                    }
                }
            }
        `
    
        try {
            await this.makeGraphQLRequest(query);
            CartUI.updateUserCartCountUI(-1)
        } catch (error) {
            console.error(error)
        }
    }

    static async makeGraphQLRequest(query) {
        const data = JSON.stringify({
            query
        })
    
        return fetch('/graphql/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data
        })
    }
}

class CartUI extends Cart {
    static buyProductUI(event) {
        const productId = event.target.value;
        const btnsBuyProduct = document.getElementById(`btnsBuyProduct-${productId}`);
        const countProduct = document.getElementById(`countProduct-${productId}`);

        event.target.style.display = 'none';
        btnsBuyProduct.style.display = 'block';
        countProduct.innerText = parseInt(countProduct.innerText) + 1

        Cart.addToCartProduct(productId).catch(error => console.error(error));
    }

    static addToCartProductUI(event) {
        const productId = event.target.value;
        const countProduct = document.getElementById(`countProduct-${productId}`);

        countProduct.innerText = parseInt(countProduct.innerText) + 1;

        Cart.addToCartProduct(productId).catch(error => console.error(error));
    }

    static removeFromCartProductUI(event) {
        const productId = event.target.value;
        const countProduct = document.getElementById(`countProduct-${productId}`);
        const btnsBuyProduct = document.getElementById(`btnsBuyProduct-${productId}`);
        const btnBuyProduct = document.getElementById(`btnBuyProduct-${productId}`);

        
        countProduct.innerText = parseInt(countProduct.innerText) - 1;
        
        if (parseInt(countProduct.innerText) === 0) {
            btnsBuyProduct.style.display = 'none';
            btnBuyProduct.style.display = 'block';
        }

        Cart.removeFromCartProduct(productId).catch(error => console.error(error));
    }

    static updateUserCartCountUI(change) {
        userCartCount.innerText = parseInt(userCartCount.innerText) + change;
    }
}

class CartListUI extends Cart {
    static addToCartProductUI(event) {
        const productId = event.target.value;
        CartListUI.updateUserPriceUI(productId, 1);

        CartUI.addToCartProductUI(event);
    }

    static removeFromCartProductUI(event) {
        const productId = event.target.value;
        const countProduct = document.getElementById(`countProduct-${productId}`);
        CartListUI.updateUserPriceUI(productId, -1);

        countProduct.innerText = parseInt(countProduct.innerText) - 1;

        Cart.removeFromCartProduct(productId).catch(error => console.error(error));

        if (parseInt(countProduct.innerText) === 0) {
            const product = document.getElementById(`product-${productId}`);
            product.remove();
        }
    }

    static updateUserPriceUI(productId, change) {
        const userPrice = document.getElementById(`userPrice-${productId}`);
        const price = document.getElementById(`price-${productId}`);
        const countProduct = document.getElementById(`countProduct-${productId}`);

        const newUserPrice = parseInt(price.innerText.replace(' ', '')) * (parseInt(countProduct.innerText) + change);
        const formattedUserPrice = newUserPrice.toLocaleString().replace('.', '')

        userPrice.innerText = formattedUserPrice + ' руб.';
    }
}

function attachEventListeners(btns, handler) {
    btns.forEach((btn) => {
        btn.addEventListener('click', handler);
    });
}

if (location.pathname === '/user/cart/') {
    attachEventListeners(addCartProduct, CartListUI.addToCartProductUI);
    attachEventListeners(delCartProduct, CartListUI.removeFromCartProductUI);
} else {
    attachEventListeners(btnBuyProduct, CartUI.buyProductUI);
    attachEventListeners(addCartProduct, CartUI.addToCartProductUI);
    attachEventListeners(delCartProduct, CartUI.removeFromCartProductUI);
}