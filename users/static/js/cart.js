const btnBuyProduct = document.querySelectorAll('.btn-buy-product');
const userCartCount = document.getElementById('userCartCount');
const addCartProduct = document.querySelectorAll('#addCartProduct');
const delCartProduct = document.querySelectorAll('#delCartProduct');

const addToCartProduct = (productId) => {
    const query = `
        mutation CreateUserCart($productId: ID!) {
            createUserCart(productId: $productId) {
                userCart {
                    id
                }
            }
        }
    `
    const variables = {
        productId
    }

    const data = JSON.stringify({
        query,
        variables
    })

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }).then(() => {
        userCartCount.innerText = parseInt(userCartCount.innerText) + 1
    }).catch((error) => {
        console.log(error)
    })
}

const removeFromCartProduct = (productId) => {
    const query = `
        mutation DeleteUserCart($productId: ID!) {
            delUserCart(productId: $productId) {
                userCart {
                    product {
                        name
                    }
                }
            }
        }
    `

    const variables = {
        productId
    }

    const data = JSON.stringify({
        query,
        variables
    })

    fetch('/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }).then(() => {
        userCartCount.innerText = parseInt(userCartCount.innerText) - 1
    }).catch((error) => {
        console.log(error)
    })
}

btnBuyProduct.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const productId = event.target.value;
        const btnsBuyProduct = document.getElementById(`btnsBuyProduct-${productId}`);
        const countProduct = document.getElementById(`countProduct-${productId}`);

        btn.style.display = 'none';
        btnsBuyProduct.style.display = 'block';
        countProduct.innerText = parseInt(countProduct.innerText) + 1

        addToCartProduct(productId)
    })
})

addCartProduct.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const productId = event.target.value;
        const countProduct = document.getElementById(`countProduct-${productId}`);

        countProduct.innerText = parseInt(countProduct.innerText) + 1;

        addToCartProduct(productId)
    })
})

delCartProduct.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        const productId = event.target.value;
        const countProduct = document.getElementById(`countProduct-${productId}`);
        const btnsBuyProduct = document.getElementById(`btnsBuyProduct-${productId}`);
        const btnBuyProduct = document.getElementById(`btnBuyProduct-${productId}`);

        
        countProduct.innerText = parseInt(countProduct.innerText) - 1;
        
        if (parseInt(countProduct.innerText) === 0) {
            btnsBuyProduct.style.display = 'none';
            btnBuyProduct.style.display = 'block';
        }

        removeFromCartProduct(productId);
    })
})