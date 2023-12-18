import StoreModule from "../module";

class CategoriesState extends StoreModule {

  initState() {
    return {
      categories: [],
      waiting: false,
    };
  }

  async loadCategories() {

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const categories = await this.getCategories();

    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        categories: categories,
        waiting: false,
      },
    );
  }

  async getCategories() {
    let result = [{ value: '', title: 'Все' }];

    const response = await fetch(
      `/api/v1/categories?fields=_id,title,parent(_id)&limit=*`
    );
    const json = await response.json();

    const children = {};

    json.result.items.forEach((item) => {
      const key = item.parent == null ? null : item.parent._id;
      let found = children[key];
      if (!found) {
        found = [];
        children[key] = found;
      }
      found.push(item);
    });

    let stack = children[null].slice().reverse();

    while (stack.length > 0) {
      let c = stack.pop();
      let depth = c.depth ? c.depth : 0;
      let newCh = children[c._id];
      if (newCh) {
        newCh
          .slice()
          .reverse()
          .forEach((n) => {
            n.depth = depth + 1;
            stack.push(n);
          });
      }
      result.push({ value: c._id, title: '- '.repeat(depth) + c.title });
    }

    return result;
  }
}

export default CategoriesState;
