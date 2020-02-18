import CONFIG from '../config';

class Storage {
  static getItems(type = null) {
      let items = localStorage.getItem(CONFIG.LOCALSTORAGE_KEY);
      let filtered_items = [];

      try {
        items = JSON.parse(items);
      } catch(e) {
        items = [];
      }  

      items.forEach(function(item) {
        item.amount = parseInt(item.amount);
        item.apr = parseInt(item.apr);

        if (type && item.type !== type) {
          return item;
        }

        filtered_items.push(item);

        return item;
      });
    
      return filtered_items;
  }

  static addItem(item) {
    let items = localStorage.getItem(CONFIG.LOCALSTORAGE_KEY);

    try {
      items = JSON.parse(items);
    } catch(e) {
      items = [];
    }

    items.push(item);

    localStorage.setItem(CONFIG.LOCALSTORAGE_KEY, JSON.stringify(items));
  }
}

export default Storage;
