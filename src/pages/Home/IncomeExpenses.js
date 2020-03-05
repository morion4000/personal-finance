import React, { Component } from 'react';

import Assets from '../../components/Assets';
import Services from '../../components/Services';
import Expenses from '../../components/Expenses';
import Storage from '../../components/Storage';

import CONFIG from '../../config';

class IncomeExpenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_items: Storage.getItems(null, props.items),
      assets: Storage.getItems(CONFIG.ITEM_TYPE.ASSET, props.items),
      services: Storage.getItems(CONFIG.ITEM_TYPE.SERVICE, props.items),
      expenses: Storage.getItems(CONFIG.ITEM_TYPE.EXPENSE, props.items)
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <br />

          <div className="row">
            <div className="col-sm">
              <Assets items={this.state.assets} />
            </div>

            <div className="col-sm">
              <Services items={this.state.services} />
            </div>

            <div className="col-sm">
              <Expenses items={this.state.expenses} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default IncomeExpenses;
