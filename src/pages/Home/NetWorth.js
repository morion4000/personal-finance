import React, { Component } from 'react';

import Alert from '../../components/Alert';
import Storage from '../../components/Storage';

import CONFIG from '../../config';

class NetWorth extends Component {
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

          <Alert items={this.state.all_items} />
        </div>
      </React.Fragment>
    );
  }
}

export default NetWorth;
