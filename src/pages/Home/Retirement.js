import React, { Component } from 'react';

import Sankey from '../../components/Sankey';
import Storage from '../../components/Storage';

import CONFIG from '../../config';

class Retirement extends Component {
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
              {this.state.all_items.length > 0 && <Sankey items={this.state.all_items} />}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Retirement;
