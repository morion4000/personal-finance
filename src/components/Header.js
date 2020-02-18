import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';

class Header extends Component {
    constructor(props) {
        super(props);

        let monthly_income = 0;
        let monthly_expenses = 0;

        this.props.items.map(function(item) {    
            if (item.type === CONFIG.ITEM_TYPE.ASSET) {
                monthly_income += item.amount * item.apr / 100 / 12;
            } else if (item.type === CONFIG.ITEM_TYPE.SERVICE) {
                monthly_income += item.amount;
            } else {
                monthly_expenses += item.amount;
            }
                
            return item;
          });

        this.state = {
            accrued_sum: 0,
            monthly_income: monthly_income,
            monthly_expenses: monthly_expenses
        }
    }

    componentDidMount() {
        const _this = this;
        let accrued_sum = 0;

        setInterval(function() {
          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            if (item.type === CONFIG.ITEM_TYPE.ASSET) {
                accrued += item.amount * item.apr / 100 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
            } else if (item.type === CONFIG.ITEM_TYPE.SERVICE) {
                accrued += item.amount * 12 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
            }
            
            accrued_sum += accrued;
    
            return item;
          });

          _this.setState({
            accrued_sum: accrued_sum
          });
        }, CONFIG.REFRESH_INTERVAL);
    }

    render() {
        return (
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-5">
                        <h1 className="display-4">Personal Finance</h1>
                        <p className="lead">Visualise Money Streams</p>
                        <button type="button" className="btn btn-primary btn-lg btn-block">
                            Streaming&nbsp;&nbsp;
                            <h5 style={{'color': 'rgb(177, 190, 212)'}}>
                                <NumberFormat value={this.state.accrued_sum} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={6} />
                            </h5>
                        </button>
                        <br /><br />
                        <h5>
                            Income:&nbsp;
                            <span className="badge badge-light" data-toggle="tooltip" data-html="true" title="Hourly">
                                <NumberFormat value={this.state.monthly_income / 30 / 24} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                            </span> /&nbsp;
                            <span className="badge badge-light" data-toggle="tooltip" data-html="true" title="Daily">
                                <NumberFormat value={this.state.monthly_income / 30} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={1} />
                            </span> /&nbsp;
                            <span className="badge badge-light" data-toggle="tooltip" data-html="true" title="Monthly">
                                <NumberFormat value={this.state.monthly_income} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                            </span> /&nbsp;
                            <span className="badge badge-light" data-toggle="tooltip" data-html="true" title="Yearly">
                                <NumberFormat value={this.state.monthly_income * 12} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                            </span>
                        </h5>
                        <p>
                            Expenses:&nbsp;
                            <span className="badge badge-danger" data-toggle="tooltip" data-html="true" title="Hourly">
                                <NumberFormat value={this.state.monthly_expenses / 30 / 24} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                            </span> /&nbsp;
                            <span className="badge badge-danger" data-toggle="tooltip" data-html="true" title="Daily">
                                <NumberFormat value={this.state.monthly_expenses / 30} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={1} />
                            </span> /&nbsp;
                            <span className="badge badge-danger" data-toggle="tooltip" data-html="true" title="Monthly">
                                <NumberFormat value={this.state.monthly_expenses} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                            </span> /&nbsp;
                            <span className="badge badge-danger" data-toggle="tooltip" data-html="true" title="Yearly">
                                <NumberFormat value={this.state.monthly_expenses * 12} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
                            </span>
                        </p>
                        </div>
                        <div className="col-sm">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
