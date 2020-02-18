import CONFIG from '../config';

class Storage {
  static TYPES = {
    ASSET: 'asset',
    SERVICE: 'service',
    EXPENSE: 'expense'
  };

  static items = [{
    type: Storage.TYPES.ASSET,
    name: 'WebDollar Staking',
    amount: 2000,
    apr: 35,
    compounds: true
  }, {
    type: Storage.TYPES.ASSET,
    name: 'DAI Savings',
    amount: 2800,
    apr: 7.5,
    compounds: true
}, {
    type: Storage.TYPES.SERVICE,
    name: 'Petro Maintenance',
    amount: 100
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'Hostero Bootstrap',
    amount: 10
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'Job',
    amount: 3300
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Rent',
    amount: 400
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Food',
    amount: 300
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Car',
    amount: 100
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Bills',
    amount: 100
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Misc',
    amount: 100
  }];

  static getItems(type = null) {
      let items = localStorage.getItem(CONFIG.LOCALSTORAGE_KEY);
      let filtered_items = [];

      if (items) {
        items = JSON.parse(items);
      } else {
        items = [];
      }      

      if (type) {
        items.forEach(function(item) {
            if (item.type === type) {
              filtered_items.push(item);
            }
        });
      } else {
        filtered_items = items;
      }
    
      return filtered_items;
  }

  static addItem(item) {
    let items = localStorage.getItem(CONFIG.LOCALSTORAGE_KEY);

    if (items) {
      items = JSON.parse(items);
    } else {
      items = [];
    }

    items.push(item);

    localStorage.setItem(CONFIG.LOCALSTORAGE_KEY, JSON.stringify(items));
  }
}

export default Storage;
