import React, { Component } from 'react';

import Alert from '../components/Alert';
import Storage from '../components/Storage';

import CONFIG from '../config';

class NetWorth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_items: Storage.getItems(),
      assets: Storage.getItems(CONFIG.ITEM_TYPE.ASSET),
      services: Storage.getItems(CONFIG.ITEM_TYPE.SERVICE),
      expenses: Storage.getItems(CONFIG.ITEM_TYPE.EXPENSE),
      sample: false
    }

    this.loadSampleData = this.loadSampleData.bind(this);
  }

  loadSampleData() {
    let all_items = [];

    all_items = all_items.concat(CONFIG.SAMPLE_DATA.ASSETS, CONFIG.SAMPLE_DATA.SERVICES, CONFIG.SAMPLE_DATA.EXPENSES);
    
    this.setState({
      sample: true,
      all_items: all_items,
      assets: CONFIG.SAMPLE_DATA.ASSETS,
      services: CONFIG.SAMPLE_DATA.SERVICES,
      expenses: CONFIG.SAMPLE_DATA.EXPENSES
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          {/*
          <div className="row">
              <div className="col">
                  <center><button className="btn btn-sm btn-secondary" onClick={this.loadSampleData} data-tip="Temporarily load sample data. Refresh page to reset.">Load sample data</button></center>
              </div>
          </div>
          */}

          <br />

          {!this.state.sample && <Alert items={this.state.all_items} />}
          {this.state.sample && <Alert items={this.state.all_items} />}
        </div>
      </React.Fragment>
    );
  }
}

export default NetWorth;
