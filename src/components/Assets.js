import React, { Component } from 'react';

import CONFIG from '../config';
import Storage from './Storage';

class Assets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total_accrued: 0
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        Storage.addItem({
            type: Storage.TYPES.ASSET,
            name: this.state.name,
            amount: this.state.principal,
            apr: this.state.apr,
            compounds: false
        });
    }

    componentDidMount() {
        const _this = this;
        let total_accrued = 0;
    
        setInterval(function() {
          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            accrued += parseInt(item.amount) * parseInt(item.apr) / 100 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
    
            item.accrued = accrued;
            
            total_accrued += accrued;
    
            return item;
          });

          _this.setState({
            total_accrued: total_accrued
          });

          _this.forceUpdate();
        }, CONFIG.REFRESH_INTERVAL);
    }

    getAssetsTotalApr() {
        let total_apr = 0;

        this.props.items.forEach(function(asset) {
            total_apr += parseInt(asset.apr);
        });

        return (total_apr / this.props.items.length).toFixed(1);
    }

    getAssetsTotalPrincipal() {
        let total_principal = 0;

        this.props.items.forEach(function(asset) {
            total_principal += asset.amount;
        });

        return total_principal + this.state.total_accrued;
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                  <div className="col-sm">
                    <h3>Savings <span className="badge badge-secondary">{this.getAssetsTotalApr()}%</span></h3>
                    <h5>${this.getAssetsTotalPrincipal()}</h5>
                    <span data-toggle="tooltip" data-html="true" title="Computing...">${this.state.total_accrued}</span>
                    <hr />
                  </div>
                </div>

                {this.props.items.map(item => (
                    <div className="row">
                        <div className="col-sm">
                            <div className="form-label-group">
                                <strong><label for="principal" data-toggle="tooltip" data-html="true" title="">{item.name}</label></strong>
                                <input type="text" className="form-control" value={item.amount} disabled />
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-label-group">
                            <label for="gains" data-toggle="tooltip" data-html="true" title="">APR {item.apr}%</label>
                                <input type="text" className="form-control" value={item.accrued} disabled />
                            </div>
                        </div>
                    </div>
                ))}

                <hr />

                <div className="row">
                  <div className="col-sm">
                    <h5>New asset</h5>
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
                                <small>i.e. Bank deposit</small>
                            </div>
                            <div className="col">
                                <input 
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="principal"
                                    name="principal"
                                    value={this.state.principal}
                                    onChange={this.handleInputChange} />
                                <small>i.e. 1000</small>
                            </div>
                            <div className="col">
                                <input
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="APR"
                                    name="apr"
                                    value={this.state.apr}
                                    onChange={this.handleInputChange} />
                                <small>i.e. 4</small>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col">
                                <button
                                    className="btn btn-block btn-success btn-lg"
                                    type="submit">Add asset</button>
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
            </React.Fragment>
        );
    }
}
  

export default Assets;
