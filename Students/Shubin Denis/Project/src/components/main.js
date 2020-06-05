// const catalogImage = 'https://placehold.it/200x150';
// const basketImage = 'https://placehold.it/100x80';
const API ='https://raw.githubusercontent.com/shubin-denis/online-store-api/master/responses';

let app = new Vue({
  el: '#app',
  data: {
    catalogItems: [],
    basketItem: [],
    catalogUrl: API + '/catalogData.json',
    basketUrl: API + '/getBasket.json',
    show: true,
    quantity: 0,
    sum: 0,
  },


  mounted() {
    this.get(this.catalogUrl)
        .then(data => {
            this.catalogItems = data;
        })
    this.get(this.basketUrl)
        .then(data => {
            this.basketItems = data;
        })

  },
  methods: {
    get: function (url) {
      return fetch(url).then(data => data.json())
  },

  add(item) {
      let id = item.id_product;
      let find = this.basketItem.contents.find(product => product.id_product === id);
      if (find) {
          find.quantity++;
      } else {
          let prod = this.createNewProduct(item);
          this.basketItem.contents.push(prod);
      }
  },

  createNewProduct(prod) {
      return {
          product_name: prod.product_name,
          price: prod.price,
          id_product: prod.id_product,
          quantity: 1
      }
  },

  deleteFromBasket(prod) {
      let id = prod.id_product;
      let find = this.basketItem.contents.find(item => item.id_product === id);
      if (find.quantity > 1) {
          find.quantity--;
      } else {
          this.basketItem.contents.splice(this.basketItem.contents.indexOf(find), 1)
      }
  }

  },
  computed: {
    // checkquantity() {
    //   this.quantity = 0;
    //   this.basketItem.contents.forEach(item => {
    //     this.quantity += item.quantity;
    //   });
    //   return this.quantity;
    // },
    
    // checksum() {
    //   this.sum = 0;
    //   this.basketItem.contents.forEach(item => {
    //     this.sum += item.price * item.quantity;
    //   });
    //   return this.sum;
    // }
  }

});


// Классы

// class List {
//     constructor(url, container) {
//         this.items = [];
//         this.container = container;
//         this.url = url;
//         this._init()
//     }
//
//     _init() {
//         this.get(this.url)
//             .then(data => {
//                 this.items = (this.constructor.name === 'Basket') ? data.contents : data;
//                 this.render();
//                 this._handleEvents(data)
//             })
//     }
//
//     get(url) {
//         url = API + url;
//         return fetch(url).then(dataJson => dataJson.json());
//     }
//
//     render() {
//         let htmlStr = '';
//         this.items.forEach(item => {
//             let newItem = new classes[this.constructor.name](item)
//             htmlStr += newItem.render()
//         });
//         document.querySelector(this.container).innerHTML = htmlStr;
//     }
// }
//     class ListItem {
//         constructor(item, img = catalogImage) {
//             this.item = item;
//             this.img = img;
//     }
//
//     render() {
//             return `
//                 <div class="product-item">
//                     <img src="https://placehold.it/300x200" alt="${this.item.product_name}">
//                     <!--img src="${this.img}" width="300" height="200" alt="${this.item.product_name}"-->
//                     <div class="desc">
//                         <h1>${this.item.product_name}</h1>
//                         <p>${this.item.price}</p>
//                         <button
//                         class="buy-btn"
//                         name="buy-btn"
//                         data-name="${this.item.product_name}"
//                         data-price="${this.item.price}"
//                         data-id="${this.item.id_product}"
//                         >Купить</button>
//                     </div>
//                 </div>
//             `
//     }
// }
//
// class Catalog extends List {
//     constructor(basket, url = '/catalogData.json', container = '.products') {
//         super(url, container);
//         this.basket = basket;
//     }
//
//     _handleEvents() {
//         document.querySelector(this.container).addEventListener('click', (evt) => {
//             if (evt.target.name === 'buy-btn') {
//                 this.basket.add(evt.target);
//             }
//         })
//     }
// }
//
// class Basket extends List {
//     constructor(url = '/getBasket.json', container = '.cart-block') {
//         super(url, container);
//     }
//
//     _handleEvents() {
//         document.querySelector(this.container).addEventListener('click', (evt) => {
//             if (evt.target.name === 'del-btn') {
//                 this.remove(evt.target);
//             }
//         })
//
//         document.querySelector('.btn-cart').addEventListener ('click', (evt) => {
//             document.querySelector('.cart-block').classList.toggle('invisible');
//         })
//     }
//
//     add(item) {
//         this.get('/addToBasket.json')
//             .then(res => {
//                 if (res.result) {
//                     console.log(item.dataset.name + ' added');
//                     this.render();
//                 } else {
//                     throw new Error('Lol error');
//                 }
//             })
//
//     }
//
//     remove(item) {
//         let find = this.items.find(el => el.id_product === item.dataset.id)
//         console.log(find.product_name + ' removed');
//     }
// }
//
// class CatalogItem extends ListItem {}
//
// class BasketItem extends ListItem {
//     constructor(item, img = basketImage) {
//         super(item, img)
//     }
//
//     render() {
//         return `
//         <div class="cart-item" data-id="${this.item.id_product}">
//             <img src="https://placehold.it/100x80" alt=""">
//             <div class="product-desc">
//                 <p class="product-title">${this.item.product_name}</p>
//                 <p class="product-quantity">${this.item.quantity}</p>
//                 <p class="product-single-price">${this.item.price}</p>
//             </div>
//             <div class="right-block">
//                 <button name="del-btn" class="del-btn" data-id="${this.item.id_product}">&times;</button>
//             </div>
//         </div>
//         `
//     }
// }
//
//
// let classes = {
//     Catalog: CatalogItem,
//     Basket: BasketItem
// }
//
//
// export default function () {
//      let basket = new Basket();
//      let catalog = new Catalog(basket);
// }