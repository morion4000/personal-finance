import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Assets from '../components/Assets';
import Services from '../components/Services';
import Sankey from '../components/Sankey';
import Storage from '../components/Storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assets: Storage.getAssets(),
      services: Storage.getServices(),
      expenses: Storage.getExpenses()
    }
  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <Header />

        <div class="container">
          <div class="alert alert-primary" role="alert">
            <p>Runway: <span id="runway" data-toggle="tooltip" data-html="true" title="Runway">0 Years</span></p>
            <p>Est. Worth: <span id="net_worth" data-toggle="tooltip" data-html="true" title="@ 7% APR"></span></p>
          </div>

          <br />

          <div class="row">
            <div class="col-sm">
              <Assets items={this.state.assets} />
            </div>

            <div class="col-sm">
              <Services items={this.state.services} />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-sm">
            <Sankey />
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
