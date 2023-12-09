import StoreModule from "../module";

const words = {
  english: {
    changeLang: 'select language',
    inCart: 'In cart',
    store: 'Store',
    home: 'Home',
    empty: 'empty',
    toCart: 'To cart',
    product: 'product',
    products: 'products',
    productsMany: 'products',
    adToCart: 'To cart',
  },
  русский: {
    changeLang: 'выбрать язык',
    inCart: 'В корзине',
    store: 'Магазин',
    home: 'Главная',
    empty: 'пусто',
    toCart: 'Перейти',
    product: 'товар',
    products: 'товара',
    productsMany: 'товаров',
    adToCart: 'Добавить',
  },
};

class Languages extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return { dictionary: {} };
  }

  setDictionary(lang) {
    this.setState({ ...this.getState(), dictionary: words[lang] });
  }
}

export default Languages;
