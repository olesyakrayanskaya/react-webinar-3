import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Article extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      description: '',
      madeIn: '',
      category: '',
      edition: '',
      price: '',
      title: '',
    };
  }

  async loadItem(_id) {
    const response = await fetch(
      `/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        description: json.result.description,
        madeIn: json.result.madeIn.title,
        category: json.result.category.title,
        edition: json.result.edition,
        price: json.result.price,
        title: json.result.title,
      },
      'Загружен товар из АПИ'
    );
  }
}

export default Article;