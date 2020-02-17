import React, { Component } from 'react';

import Announcement from './Announcement';
import getWeb3, {getNetworkName} from '../utils/getWeb3';


function MetamaskMessage(props) {
  const installed = props.installed;
  const network = getNetworkName(props.network);
  const account = props.account;
  let fragment;

  if (installed) {
    if (account && network) {
      fragment = (
        <Announcement icon="icon-done" text={`Metamask is using ${account} on ${network}`}></Announcement>
      );
    } else {
      fragment = (
        <Announcement icon="icon-done" text="Please unlock Metamask and authorise Emint.io"></Announcement>
      );
    }
  } else {
    fragment = (
      <Announcement text="Metamask is not installed." linkAddress="https://metamask.io" linkText="Install Metamask"></Announcement>
    );
  }

  return fragment;
}

class Metamask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      installed: false,
      network: null,
      account: null
    };
  }

  componentWillMount() {
    const _this = this;

    getWeb3.then(function(res) {
      if (res.web3) {
        _this.setState({
          installed: res.web3.currentProvider.isMetaMask,
          network: res.web3.currentProvider.networkVersion,
          account: res.web3.currentProvider.selectedAddress
        });
        
        // accountsChanged event only works with web3 > 1.0.0
        if (res.stable) {
          res.provider.on('accountsChanged', function(accounts) {
            if (accounts.length) {
              _this.setState({
                account: accounts[0]
              });
            }
          });
        }
      }
    });
  }

  render() {
    return (
      <div className="Metamask">
        <MetamaskMessage installed={this.state.installed} network={this.state.network} account={this.state.account} />
      </div>
    );
  }
}

export default Metamask;
