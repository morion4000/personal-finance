class Storage {
  static getAssets() {
    return [{
        name: 'Pawnshop Business',
        principal: 21600,
        apr: 30,
        compounding: false,
        accrued: 0
      }, {
        name: 'Tezos Staking',
        principal: 13000,
        apr: 6,
        compounds: true,
        accrued: 0
      }, {
        name: 'WebDollar Staking',
        principal: 2000,
        apr: 35,
        compounds: true,
        accrued: 0
      }, {
        name: 'DAI Savings',
        principal: 2800,
        apr: 7.5,
        compounds: true,
        accrued: 0
    }];
  }

  static getServices() {
      return [{
        name: 'Petrolube Maintenance',
        revenue: 100,
        accrued: 0
      }, {
        name: 'Dermod Wood Maintenance',
        revenue: 10,
        accrued: 0
      }, {
        name: 'WebDollar Maintenance',
        revenue: 90,
        accrued: 0
      }, {
        name: 'WebDollar Tip Bot',
        revenue: 20,
        accrued: 0
      }, {
        name: 'Hostero Dashboard',
        revenue: 10,
        accrued: 0
      }, {
        name: 'Hostero Bootstrap',
        revenue: 10,
        accrued: 0
      }, {
        name: 'Job',
        revenue: 3300,
        accrued: 0
      }];
  }

  static getExpenses() {
    return [{
        name: 'Rent',
        amount: 400
      }, {
        name: 'Food',
        amount: 300
      }, {
        name: 'Car',
        amount: 100
      }, {
        name: 'Bills',
        amount: 100
      }, {
        name: 'Misc',
        amount: 100
      }, {
        name: 'Taxes',
        amount: 250
      }];
  }
}

export default Storage;
