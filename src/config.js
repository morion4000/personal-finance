const CONFIG = {
    MILISECONDS_IN_YEAR: 1000 * 60 * 60 * 24 * 365,
    REFRESH_INTERVAL: 100,
    SERVICE_ESTIMATE_APR: 7,
    LOCALSTORAGE_KEY: 'personal_finance_items',
    ITEM_TYPE: {
        ASSET: 'asset',
        SERVICE: 'service',
        EXPENSE: 'expense'
    },
    SAMPLE_DATA: {
        ASSETS: [{
            id: 47433,
            type: 'asset',
            name: 'Bank deposit',
            amount: 50000,
            apr: 4,
            compounds: true
        }, {
            id: 74674,
            type: 'asset',
            name: 'Cash',
            amount: 5000,
            apr: 0,
            compounds: false
        }, {
            id: 21623,
            type: 'asset',
            name: 'Crypto Staking',
            amount: 30000,
            apr: 8,
            compounds: true
        }],
        SERVICES: [{
            id: 39493,
            type: 'service',
            name: 'Job',
            amount: 2500,
            apr: 0,
            compounds: false
        }, {
            id: 19883,
            type: 'service',
            name: 'Consulting',
            amount: 500,
            apr: 0,
            compounds: false
        }, {
            id: 64874,
            type: 'service',
            name: 'Maintenance contract',
            amount: 200,
            apr: 0,
            compounds: false
        }],
        EXPENSES: [{
            id: 41234,
            type: 'expense',
            name: 'Food',
            amount: 500,
            apr: 0,
            compounds: false
        }, {
            id: 35523,
            type: 'expense',
            name: 'Car',
            amount: 100,
            apr: 0,
            compounds: false
        }, {
            id: 12212,
            type: 'expense',
            name: 'Rent',
            amount: 400,
            apr: 0,
            compounds: false
        }, {
            id: 63436,
            type: 'expense',
            name: 'Taxes',
            amount: 300,
            apr: 0,
            compounds: false
        }, {
            id: 3345,
            type: 'expense',
            name: 'Misc',
            amount: 500,
            apr: 0,
            compounds: false
        }]
    }
};

export default CONFIG;