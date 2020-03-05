import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

import CashFlow from './CashFlow';
import IncomeExpenses from './IncomeExpenses';
import NetWorth from './NetWorth';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Donut from '../../components/Donut';
import Storage from '../../components/Storage';

import CONFIG from '../../config';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      all_items: Storage.getItems(),
      assets: Storage.getItems(CONFIG.ITEM_TYPE.ASSET),
      services: Storage.getItems(CONFIG.ITEM_TYPE.SERVICE),
      expenses: Storage.getItems(CONFIG.ITEM_TYPE.EXPENSE),
      sample: false,
      active_tab: 'incomeexpenses'
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

  changeTab = (tab) => {
    this.setState({
      active_tab: tab
    });
  }

  renderHeader() {
    return (
      <Header items={this.state.all_items} sampleHandler={this.loadSampleData}>
        {this.state.all_items.length > 0 && <Donut items={this.state.all_items} />}
      </Header>
    );
  }

  renderIncomeExpenses() {
    return (
      <React.Fragment>
        {!this.state.sample && <IncomeExpenses items={this.state.all_items} />}
        {this.state.sample && <IncomeExpenses items={this.state.all_items} />}
      </React.Fragment>
    );
  }

  renderCashflow() {
    return (
      <React.Fragment>
        {!this.state.sample && <CashFlow items={this.state.all_items} />}
        {this.state.sample && <CashFlow items={this.state.all_items} />}
      </React.Fragment>
    );
  }

  renderNetWorth() {
    return (
      <React.Fragment>
        {!this.state.sample && <NetWorth items={this.state.all_items} />}
        {this.state.sample && <NetWorth items={this.state.all_items} />}
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        <ReactTooltip effect="solid" />

        {!this.state.sample && this.renderHeader()}
        {this.state.sample && this.renderHeader()}
        
        <div className="bg-white" style={{marginTop: '-50px'}}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" data-toggle="tab" href="javascript:;" onClick={this.changeTab.bind(this, 'incomeexpenses')}>Income &amp; Expenses</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="javascript:;" onClick={this.changeTab.bind(this, 'cashflow')}>Cash Flow</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" data-toggle="tab" href="javascript:;" onClick={this.changeTab.bind(this, 'networth')}>Net Worth</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <br />

        {this.state.active_tab === 'incomeexpenses' && this.renderIncomeExpenses()}
        {this.state.active_tab === 'cashflow' && this.renderCashflow()}
        {this.state.active_tab === 'networth' && this.renderNetWorth()}

        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
