import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';
import Storage from './Storage';

class Assets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accrued_sum: 0
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
            id: Date.now(),
            type: CONFIG.ITEM_TYPE.SERVICE,
            name: this.state.name,
            amount: this.state.income,
            apr: 0,
            compounds: false
        });

        this.setState({
            name: '',
            income: ''
        });
    }

    componentDidMount() {
        const _this = this;

        setInterval(function() {
          let accrued_sum = 0;
          
          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            accrued += item.amount * 12 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
    
            item.accrued = accrued;

            accrued_sum += accrued;
    
            return item;
          });

          _this.setState({
            accrued_sum: accrued_sum
          });

          _this.forceUpdate();
        }, CONFIG.REFRESH_INTERVAL);
    }

    getTotalEstimatedPrincipal() {
        let total_principal = 0;

        this.props.items.forEach(function(asset) {
            const estimated_principal = asset.amount * 12 / CONFIG.SERVICE_ESTIMATE_APR * 100;
            total_principal += estimated_principal;
        });

        return total_principal + this.state.accrued_sum;
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                  <div className="col-sm">
                    <h3>Services</h3>
                    <h5><span id="services_estimated_principal_total" data-toggle="tooltip" data-html="true" title="Est. at ${CONFIG.SERVICE_ESTIMATE_APR}% APR">${this.getTotalEstimatedPrincipal()}</span></h5>
                    <span id="services_accrued_total" data-toggle="tooltip" data-html="true" title="Computing...">${this.state.accrued_sum}</span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm">
                    <h5>New service</h5>
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
                                <small>eg. Job</small>
                            </div>
                            <div className="col">
                                <input 
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Income"
                                    name="income"
                                    value={this.state.income}
                                    onChange={this.handleInputChange} />
                                <small>eg. 1000</small>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col">
                                <button
                                    className="btn btn-block btn-warning btn-lg"
                                    type="submit">Add service</button>
                            </div>
                        </div>    
                    </form>
                  </div>
                </div>

                <hr />

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
                            <label for="gains" data-toggle="tooltip" data-html="true" title="">Revenue</label>
                                <input type="text" className="form-control" value={item.accrued} disabled />
                            </div>
                        </div>
                    </div>
                ))}

                {this.props.items.length === 0 && <center>No services</center>}
            </React.Fragment>
        );
    }
}
  

export default Assets;
