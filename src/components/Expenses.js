import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';
import Storage from './Storage';

class Expenses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accrued_sum: 0,
            name: '',
            expense: ''
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
            type: CONFIG.ITEM_TYPE.EXPENSE,
            name: this.state.name,
            amount: this.state.expense,
            apr: 0,
            compounds: false
        });

        this.setState({
            name: '',
            expense: ''
        });

        window.location.reload();
    }

    handleDelete(item) {
        Storage.removeItem(item.id);

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

    getMonthlyDebit() {
        let monthly_debit = 0;

        this.props.items.forEach(function(asset) {
            monthly_debit += asset.amount;
        });

        return monthly_debit;
    }

    render() {
        const { name, expense } = this.state;
        const valid = name.length > 0 && expense.length > 0;

        return (
            <React.Fragment>
                <div className="row">
                  <div className="col-sm">
                    <h3><strong>Expenses</strong></h3>
                    <h5>
                        Monthly debit: <NumberFormat value={this.getMonthlyDebit()} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                    </h5>
                    <span data-toggle="tooltip" data-html="true" title="Computing...">
                        Debit: <NumberFormat value={this.state.accrued_sum} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
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
                                <small>eg. Taxes</small>
                            </div>
                            <div className="col-6">
                                <input 
                                    className="form-control form-control-lg"
                                    type="number"
                                    placeholder="Monthly Expense"
                                    name="expense"
                                    value={this.state.expense}
                                    onChange={this.handleInputChange} />
                                <small>eg. 1000</small>
                            </div>
                        </div>
                        <div className="form-row form-group">
                            <div className="col">
                                <button
                                    className="btn btn-block btn-danger btn-lg"
                                    disabled={!valid}>Add expense</button>
                            </div>
                        </div>    
                    </form>
                  </div>
                </div>

                <hr />

                <table className="table table-hover align-items-center table-borderless">
                    <thead>
                        <tr>
                            <th scope="col">Expense</th>
                            <th scope="col">Debit</th>
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
                                    <button className="btn btn-secondary btn-sm" onClick={this.handleDelete.bind(this, item)}>x</button>
                                </td>
                            </tr>
                            <tr className="table-divider"></tr>
                            </tbody>
                    ))}
                </table>

                {this.props.items.length === 0 && <center>No expenses</center>}
            </React.Fragment>
        );
    }
}
  

export default Expenses;
