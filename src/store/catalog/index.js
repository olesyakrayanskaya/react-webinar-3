import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0,
      pageId: 1,
      limit: 10,
    };
  }

  setPageId(p) {
    this.setState({ ...this.getState(), pageId: p });
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    );
  }

  async loadTotalCount() {
    const response = await fetch(
      'api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count'
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
      },
      'Загружены товары из АПИ'
    );
  }

  async loadWithPagination(limit, skip) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ'
    );
  }
}

export default Catalog;
