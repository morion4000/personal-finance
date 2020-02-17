import React, { Component } from 'react';

import Metamask from '../components/Metamask';
import ERC20Factory from '../components/ERC20Factory';
import getWeb3 from '../utils/getWeb3';

class ERC20 extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: '',
        symbol: '',
        decimals: '',
        initialSupply: '',
        enabled: true,
        web3: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const _this = this;

    getWeb3.then(function(res) {
        if (res.web3) {
            _this.setState({
                web3: res.web3
            });
        }
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const contract = new ERC20Factory(this.state.web3);

    contract.create(this.state.name, this.state.symbol, this.state.decimals, this.state.initialSupply);

    this.setState({
        enabled: false
    });
  }

  render() {
    const { name, symbol, decimals, initialSupply } = this.state;
    const valid = name.length > 0 && symbol.length > 0 && decimals.length > 0 && initialSupply.length > 0;

    return (
      <div>
        <Metamask></Metamask>

        <div className="main-container">
            <section className="space-sm">
                <div className="container">
                    {/*
                    <div className="row mb-5">
                        <div className="col text-center">
                            <a href="/">
                                <img alt="Image" src="assets/img/logo_black_square.png" height="50" />
                            </a>
                        </div>
                    </div>
                    */}
                    <nav aria-label="breadcrumb" role="navigation">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Emint.io</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Create ERC20 Token</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <div className="row flex-md-row card card-lg">
                        <div className="col-12 col-md-7 card-body bg-secondary">
                            <div className="text-center mb-5">
                                <h1 className="h2 mb-2">Start creating immediately</h1>
                                <span>Deploy ERC20 tokens</span>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-lg-9">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-row form-group">
                                            <div className="col">
                                                <input 
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    placeholder="Name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={this.handleInputChange} />
                                                <small>i.e. Ethereum</small>
                                            </div>
                                            <div className="col">
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="text"
                                                    placeholder="Symbol"
                                                    name="symbol"
                                                    value={this.state.symbol}
                                                    onChange={this.handleInputChange} />
                                                <small>i.e. ETH</small>
                                            </div>
                                        </div>
                                        <div className="form-row form-group">
                                            <div className="col">
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="number" 
                                                    placeholder="Decimals"
                                                    name="decimals"
                                                    min="1"
                                                    max="18"
                                                    value={this.state.decimals}
                                                    onChange={this.handleInputChange} />
                                                <small>Common is 18.</small>
                                            </div>
                                            <div className="col">
                                                <input
                                                    className="form-control form-control-lg"
                                                    type="number" 
                                                    placeholder="Initial supply"
                                                    name="initialSupply"
                                                    min="0"
                                                    max="1000000000000"
                                                    value={this.state.initialSupply}
                                                    onChange={this.handleInputChange} />
                                                <small>Initial supply.</small>
                                            </div>
                                        </div>
                                        <div className="form-row form-group">
                                            <div className="col">
                                                <button
                                                    className="btn btn-block btn-success btn-lg"
                                                    type="submit"
                                                    disabled={!valid || !this.state.enabled}>Create Token</button>
                                            </div>
                                        </div>
                                        {/*
                                        <div className="text-center">
                                            <span className="text-small text-muted">By clicking 'Create Token' you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
                                            </span>
                                        </div>
                                        */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 card-body">
                            <div>
                                <div className="mb-5 text-center">
                                    <h3 className="h2 mb-2">Deploy &amp; Manage</h3>
                                    <span>Safely manage your smart contract life-cycles</span>
                                </div>
                                <ul className="list-unstyled list-spacing-sm mb-5 ">
                                    <li className="row">
                                        <div className="col-2 col-md-1"><i className="icon-check h5 text-muted"></i>
                                        </div>
                                        <div className="col-10"><strong>Deploy</strong> - Emint lets you safely deploy your smart contracts to private, testnet or mainnet using browser compatible wallets</div>
                                    </li>
                                    <li className="row align-items-center">
                                        <div className="col-2 col-md-1"><i className="icon-check h5 text-muted"></i>
                                        </div>
                                        <div className="col-10"><strong>Monitor</strong> - View analytics, graphs, set up alerts, and log events to track the health your smart contracts in one place post-deployment</div>
                                    </li>
                                </ul>

                                {/*
                                <div className="card card-sm box-shadow text-left">
                                    <div className="card-body p-4">
                                        <div className="media">
                                            <img alt="Image" src="assets/img/avatar-male-1.jpg" className="avatar avatar-xs" />
                                            <div className="media-body">
                                                <p className="mb-1 text-small">
                                                    “Let’s get one thing straight, this theme’s a straight-up winner. No posers here, just beautiful design and code.”
                                                </p>
                                                <small>Daniel Cameron</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                */}

                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <span className="text-small">Made by <a href="https://www.morion4000.com" target="_blank" rel="noopener noreferrer">morion4000</a>
                        </span>
                    </div>
                </div>
            </section>
        </div>
      </div>
    );
  }
}

export default ERC20;
