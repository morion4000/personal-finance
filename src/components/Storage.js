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
    name: 'Petrolube Maintenance',
    amount: 100
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'Dermod Wood Maintenance',
    amount: 10
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'WebDollar Maintenance',
    amount: 90
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'WebDollar Tip Bot',
    amount: 20
  }, {
    type: Storage.TYPES.SERVICE,
    name: 'Hostero Dashboard',
    amount: 10
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
  }, {
    type: Storage.TYPES.EXPENSE,
    name: 'Taxes',
    amount: 250
  }];

  static getItems(type = null) {
      let items = [];

      if (type) {
        Storage.items.forEach(function(item) {
            if (item.type === type) {
                items.push(item);
            }
        });
      } else {
          items = Storage.items;
      }
    
      return items;
  }
}

export default Storage;
