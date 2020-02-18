import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Assets from '../components/Assets';
import Services from '../components/Services';
import Sankey from '../components/Sankey';
import Donut from '../components/Donut';
import Alert from '../components/Alert';
import Storage from '../components/Storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_items: Storage.getItems(),
      assets: Storage.getItems(Storage.TYPES.ASSET),
      services: Storage.getItems(Storage.TYPES.SERVICE),
      expenses: Storage.getItems(Storage.TYPES.EXPENSE)
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Header items={this.state.all_items}>
          <Donut items={this.state.all_items} />
        </Header>

        <div className="container">
          <Alert items={this.state.all_items} />
          
          <br />

          <div className="row">
            <div className="col-sm">
              <Assets items={this.state.assets} />
            </div>

            <div className="col-sm">
              <Services items={this.state.services} />
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-sm">
              <Sankey items={this.state.all_items} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
