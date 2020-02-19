import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Assets from '../components/Assets';
import Services from '../components/Services';
import Expenses from '../components/Expenses';
import Sankey from '../components/Sankey';
import Donut from '../components/Donut';
import Alert from '../components/Alert';
import Storage from '../components/Storage';

import CONFIG from '../config';

class Home extends Component {
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
      <div>
        <Header items={this.state.all_items}>
          {this.state.all_items.length > 0 && !this.state.sample && <Donut items={this.state.all_items} />}
          {this.state.sample && <Donut items={this.state.all_items} />}
        </Header>

        <div className="container">
          <div className="row">
              <div className="col">
                  <center><button className="btn btn-sm btn-secondary" onClick={this.loadSampleData}>Load sample data</button></center>
              </div>
          </div>

          <br />

          {!this.state.sample && <Alert items={this.state.all_items} />}
          {this.state.sample && <Alert items={this.state.all_items} />}
          
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

          <br />
          <br />

          <div className="row">
            <div className="col-sm">
              {this.state.all_items.length > 0 && !this.state.sample && <Sankey items={this.state.all_items} />}
              {this.state.sample && <Sankey items={this.state.all_items} />}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
