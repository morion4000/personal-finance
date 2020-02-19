import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';
import Storage from './Storage';

class Assets extends Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            accrued_sum: 0,
            name: '',
            principal: '',
            apr: ''
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
            type: CONFIG.ITEM_TYPE.ASSET,
            name: this.state.name,
            amount: this.state.principal,
            apr: this.state.apr,
            compounds: false
        });

        this.setState({
            name: '',
            principal: '',
            apr: ''
        });

        window.location.reload();
    }

    handleDelete(item) {
        Storage.removeItem(item.id);

        window.location.reload();
    }

    componentDidMount() {
        const _this = this;
    
        this.interval = setInterval(function() {
          let accrued_sum = 0;

          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            accrued += item.amount * item.apr / 100 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
    
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

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getTotalApr() {
        let total_apr = 0;
        let generating_assets_count = 0;

        this.props.items.forEach(function(asset) {
            if (asset.apr > 0) {
                generating_assets_count++;
            }

            total_apr += asset.apr;
        });

        total_apr /= generating_assets_count;
        total_apr = total_apr || 0;

        return total_apr.toFixed(1);
    }

    getMonthlyCredit() {
        let monthly_credit = 0;

        this.props.items.forEach(function(asset) {
            monthly_credit += asset.amount * asset.apr / 100 / 12;
        });

        return monthly_credit;
    }

    render() {
        const { name, principal, apr } = this.state;
        const valid = name.length > 0 && principal.length > 0 && apr.length > 0;

        return (
            <React.Fragment>
                <div className="row">
                  <div className="col-sm">
                    <h3><strong>Savings</strong> <span className="badge badge-secondary">{this.getTotalApr()}%</span></h3>
                    <h5>
                        Monthly credit: <NumberFormat value={this.getMonthlyCredit()} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
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
                            <div className="col-5">
                                <input 
                                    className="form-control form-control-lg"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleInputChange} />
                                <small>eg. Bank deposit</small>
                            </div>
                            <div className="col">
                                <input 
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Principal"
                                    name="principal"
                                    value={this.state.principal}
                                    onChange={this.handleInputChange} />
                                <small>eg. 1000</small>
                            </div>
                            <div className="col-3">
                                <input
                                    className="form-control form-control-lg"
                                    type="number"
                                    min="0"
                                    max="100"
                                    placeholder="APR"
                                    name="apr"
                                    value={this.state.apr}
                                    onChange={this.handleInputChange} />
                                <small>eg. 4</small>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col">
                                <button
                                    className="btn btn-block btn-success btn-lg"
                                    type="submit"
                                    disabled={!valid}>Add asset</button>
                            </div>
                        </div>    
                    </form>
                  </div>
                </div>
                
                <hr />

                <table className="table table-hover align-items-center table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Asset</th>
                            <th scope="col">Credit</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    {this.props.items.map(item => (
                        <tbody key={item.id} style={{borderTop: 'none'}}>        
                            <tr className="bg-white">
                                <th>
                                    <strong>{item.name}</strong><br />
                                    <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                                </th>
                                <td>
                                    <label data-toggle="tooltip" data-html="true" title="">APR {item.apr}%</label>
                                    <input type="text" className="form-control" defaultValue={item.accrued} disabled />
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-sm" onClick={this.handleDelete.bind(this, item)}>x</button>
                                </td>
                            </tr>    
                            <tr className="table-divider"></tr>
                        </tbody>        
                    ))}
                </table>

                {this.props.items.length === 0 && <center>No assets</center>}
            </React.Fragment>
        );
    }
}
  

export default Assets;
