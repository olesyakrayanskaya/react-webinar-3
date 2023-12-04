/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Нахождение товара из списка по коду
   * @returns {Object}
   */
  getGoodsItem(code) {
    return this.state.list.find((item) => item.code === code);
  }

  /**
   * Добавление товара в корзину
   * * @param code
   */
  addGoods(code) {
    const selectedGoods = this.state.goods.find((item) => item.code === code.code);
    if (selectedGoods) {
      this.setState({
        ...this.state,
        goods: this.state.goods.map((item) => {
          if (item.code === code.code) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return item;
        }),
      });
    } else {
      const itemGoods = this.getGoodsItem(code);
      let item = {...code, count: 1}
      this.setState({
        ...this.state,
        goods: [...this.state.goods, { ...itemGoods, ...item }],
      });
    }
  }

  /**
   * Удаление товара из корзины
   * @param code
   */
  deleteGoods(code) {
    this.setState({
      ...this.state,
      goods: this.state.goods.filter((item) => item.code !== code.code),
    });
  }

  /**
   * Расчет итоговой суммы
   * @returns {Number}
   */
  getTotalSum() {
    return this.state.goods.reduce((acc, item) => {
      return acc + item.count * item.price;
    }, 0);
  }

  /**
   * Расчет итогового количества
   * @returns {Number}
   */
  getTotalCount() {
    return this.state.goods.length;
  }
}

export default Store;
