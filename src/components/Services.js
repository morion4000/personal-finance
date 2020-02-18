import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';
import Storage from './Storage';

class Assets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accrued_sum: 0,
            name: '',
            income: ''
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

        window.location.reload();
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

    handleDelete(item) {
        Storage.removeItem(item.id);

        window.location.reload();
    }

    render() {
        const { name, income } = this.state;
        const valid = name.length > 0 && income.length > 0;

        return (
            <React.Fragment>
                <div className="row">
                  <div className="col-sm">
                    <h3><strong>Services</strong></h3>
                    <h5>
                        Est. Worth: <NumberFormat value={this.getTotalEstimatedPrincipal()} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={3} />
                    </h5>
                    <span data-toggle="tooltip" data-html="true" title="Computing...">
                        Credit: <NumberFormat value={this.state.accrued_sum} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-sm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row form-group">
                            <div className="col-6">
                                <input 
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                                <small>eg. Job</small>
                            </div>
                            <div className="col-6">
                                <input 
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Monthly Income"
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
                                    disabled={!valid}>Add service</button>
                            </div>
                        </div>    
                    </form>
                  </div>
                </div>

                <hr />

                <table className="table table-hover align-items-center table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Service</th>
                            <th scope="col">Credit</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.items.map(item => (
                            <React.Fragment>
                                <tr className="bg-white">
                                    <th>
                                        <strong>{item.name}</strong><br />
                                        <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                                    </th>
                                    <td>
                                        <input type="text" className="form-control" value={item.accrued} disabled />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={this.handleDelete.bind(this, item)}>x</button>
                                    </td>
                                </tr>
                                <tr className="table-divider"></tr>
                            </React.Fragment>          
                        ))}
                    </tbody>
                </table>

                {this.props.items.length === 0 && <center>No services</center>}
            </React.Fragment>
        );
    }
}
  

export default Assets;
