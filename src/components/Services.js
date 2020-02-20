import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import ReactTooltip from 'react-tooltip';

import CONFIG from '../config';
import Storage from './Storage';

class Services extends Component {
    constructor(props) {
        super(props);

        this.interval = null;
        this.state = {
            accrued_sum: 0,
            name: '',
            income: '',
            show_add_form: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
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

    handleDelete(item) {
        Storage.removeItem(item.id);

        window.location.reload();
    }

    showAddForm() {
        this.setState({
            show_add_form: true
        });
    }

    componentDidMount() {
        const _this = this;

        this.interval = setInterval(function() {
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

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    getTotalEstimatedPrincipal() {
        let total_principal = 0;

        this.props.items.forEach(function(asset) {
            const estimated_principal = asset.amount * 12 / CONFIG.SERVICE_ESTIMATE_APR * 100;
            total_principal += estimated_principal;
        });

        return total_principal + this.state.accrued_sum;
    }

    getMonthlyCredit() {
        let monthly_credit = 0;

        this.props.items.forEach(function(asset) {
            monthly_credit += asset.amount;
        });

        return monthly_credit;
    }

    render() {
        const { name, income } = this.state;
        const valid = name.length > 0 && income.length > 0;

        return (
            <React.Fragment>
                <ReactTooltip id="services_credit_tooltip" effect="solid">
                    Hourly: <NumberFormat value={this.getMonthlyCredit() / 30 / 24} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} /><br />
                    Daily: <NumberFormat value={this.getMonthlyCredit() / 30} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={1} /><br />
                    <strong>Monthly: <NumberFormat value={this.getMonthlyCredit()} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} /></strong><br />
                    Yearly: <NumberFormat value={this.getMonthlyCredit() * 12} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                </ReactTooltip>

                <div className="row">
                  <div className="col-sm">
                    <h3><strong>Income</strong></h3>
                    <span data-tip data-for="services_credit_tooltip">
                        Credit: <NumberFormat value={this.state.accrued_sum} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                    </span>
                  </div>
                </div>

                <hr />

                <div className="row" style={{display: this.state.show_add_form ? 'none' : 'block'}}>
                  <div className="col">
                      <center>
                        <button
                            className="btn btn-primary btn-lg"
                            onClick={this.showAddForm}>
                                <i className="icon-circle-with-plus" />
                            </button>
                        </center>
                  </div>
                </div>

                <div className="row" style={{display: this.state.show_add_form ? 'block' : 'none'}}>
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
                                <small>eg. $1000</small>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col">
                                <button
                                    className="btn btn-block btn-primary btn-lg"
                                    disabled={!valid}>Add income</button>
                            </div>
                        </div>    
                    </form>
                  </div>
                </div>

                <hr />

                <table className="table table-hover align-items-center table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Income</th>
                            <th scope="col">Credit</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    {this.props.items.map(item => (
                        <tbody key={item.id} style={{borderTop: 'none'}}>
                            <tr className="bg-white" key={item.id}>
                                <th>
                                    <strong>{item.name}</strong><br />
                                    <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                                </th>
                                <td>
                                    <input type="text" className="form-control" defaultValue={item.accrued} disabled />
                                </td>
                                <td>
                                    <button className="btn btn-secondary btn-sm" onClick={this.handleDelete.bind(this, item)}>
                                        <i className="icon-circle-with-cross" />
                                    </button>
                                </td>
                            </tr>
                            <tr className="table-divider"></tr>
                        </tbody>        
                    ))}
                </table>

                {this.props.items.length === 0 && <center>No services</center>}
            </React.Fragment>
        );
    }
}
  

export default Services;
