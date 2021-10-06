const product = {
    plainBurger: {
        name: 'Гамбургер простой',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshBurger: {
        name: 'Гамбургер FRESH',
        price: 20500,
        kcall: 600,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    },
    freshCombo: {
        name: 'FRESH COMBO',
        price: 31900,
        kcall: 800,
        amount: 0,
        get Sum() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        }
    }
}


const extraProduct = {
    doubleMayonnaise: {
        name: 'Двойной майонез',
        price: 1000,
        kcall: 50
    },
    lettuce: {
        name: 'Салатный лист',
        price: 500,
        kcall: 5
    },
    cheese: {
        name: 'Сыр',
        price: 800,
        kcall: 30
    }
}



const btnPlusOrMinus = document.querySelectorAll('.main__product-btn');


btnPlusOrMinus.forEach(function (btn) {
    btn.addEventListener('click', function () {
        plusOrminus(this)
    })
})


function plusOrminus(element) {
    /* 
        closest() - метод объекта. Который подключается и получает родителя того элемента который указали
        getAttribute() - Получает аттрибут элемента с HTML
    */

    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        productAmount = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementData = element.getAttribute('data-symbol');

    if (elementData == '+') {
        product[parentId].amount++;
    } else if (elementData == '-' && product[parentId].amount > 0) {
        product[parentId].amount--;
    }

    productAmount.innerHTML = product[parentId].amount;
    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}


const checkExtraProduct = document.querySelectorAll('.main__product-checkbox');


checkExtraProduct.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        addExtraProduct(checkbox)
    })
})


function addExtraProduct(element) {
    const parent = element.closest('.main__product'),
        parentId = parent.getAttribute('id'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elementAttr = element.getAttribute('data-extra');

    product[parentId][elementAttr] = element.checked


    if (product[parentId][elementAttr] == true) {
        product[parentId].kcall += extraProduct[elementAttr].kcall
        product[parentId].price += extraProduct[elementAttr].price
    } else {
        product[parentId].kcall -= extraProduct[elementAttr].kcall
        product[parentId].price -= extraProduct[elementAttr].price
    }

    price.innerHTML = product[parentId].Sum;
    kcall.innerHTML = product[parentId].Kcall;
}

const addCart = document.querySelector('.addCart'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window');

let arrProduct = [],
    totalPrice = 0,
    totalKcall = 0,
    totalName = '';





    const Alert = document.createElement('div'),
            text = document.createElement('p'),
            body = document.querySelector('body');

        Alert.classList.add('alert');
        text.classList.add('alert__text');

        text.style = `
        color: black;
        font-size: 30px;
        line-height: 40px;
        `;

        Alert.style = `
        width: 500px;
        height: 300px;
        border: solid, black, 6px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        top: 20%;
        left: 37%;
        transition: 0.5s;
        position: fixed;
        `;

        text.innerHTML = 'Вы ничего не заказали.';

        body.appendChild(Alert);
        Alert.appendChild(text);


addCart.addEventListener('click', function () {
    for (const key in product) {
        // console.log(product[key]);
        if (product[key].amount > 0) {
            arrProduct.push(product[key])
            for (const newKey in product[key]) {
                if (product[key][newKey] === true) {
                    product[key].name += extraProduct[newKey].name
                }
            }
        }
    }

    for (let i = 0; i < arrProduct.length; i++) {
        totalPrice += arrProduct[i].price * arrProduct[i].amount;
        totalKcall += arrProduct[i].kcall * arrProduct[i].amount;
        totalName += '\n' + arrProduct[i].name + ' ' + arrProduct[i].amount + 'шт.' + '\n'
    }

    if(totalKcall == 0 && totalName == '' && totalPrice == 0) {
        Alert.style.opacity = '1';

        setTimeout(function () {
            Alert.style.opacity = '0';
        }, 2000)


    }else{
       receiptOut.innerHTML = `Вы купили: \n ${totalName} \n Каллорийность ${totalKcall} \n Общая сумма ${totalPrice}`

    receipt.classList.remove('active');

    receipt.style.display = 'flex';

    setTimeout(function () {
        receipt.style.opacity = '1'
    }, 200)

    document.body.style.overflow = 'hidden';

    receiptWindow.style = `
        background: #fff;
        padding: 100px;
        border-radius: 15px;
     ` 
    }

    
})


const windowBtn = document.querySelector('.receipt__window-btn');

windowBtn.addEventListener('click', function () {
    location.reload();
})