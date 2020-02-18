import React, { Component } from 'react';

import CONFIG from '../config';
import Storage from './Storage';

class Header extends Component {
    constructor(props) {
        super(props);

        let monthly_income = 0;
        let monthly_expenses = 0;

        this.props.items.map(function(item) {    
            if (item.type === Storage.TYPES.ASSET) {
                monthly_income += item.amount * item.apr / 100 / 12;
            } else if (item.type === Storage.TYPES.SERVICE) {
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

        setInterval(function() {
          let accrued_sum = 0;
          
          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            if (item.type === Storage.TYPES.ASSET) {
                accrued += item.amount * item.apr / 100 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
            } else if (item.type === Storage.TYPES.SERVICE) {
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
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <div class="row">
                        <div class="col-sm">
                        <h1 class="display-4">Money.Stream</h1>
                        <p class="lead">Visualise Financial Streams.</p>
                        <button type="button" class="btn btn-primary btn-lg">
                            Streaming <span class="badge badge-light">${this.state.accrued_sum}</span>
                        </button>
                        <br /><br />
                        <p>
                            Income:
                            <span class="badge badge-light" data-toggle="tooltip" data-html="true" title="Hourly">${this.state.monthly_income / 30 / 24}</span> /
                            <span class="badge badge-light" data-toggle="tooltip" data-html="true" title="Daily">${this.state.monthly_income / 30}</span> /
                            <span class="badge badge-light" data-toggle="tooltip" data-html="true" title="Monthly">${this.state.monthly_income}</span> /
                            <span class="badge badge-light" data-toggle="tooltip" data-html="true" title="Yearly">${this.state.monthly_income * 12}</span>
                        </p>
                        <p>
                            Expenses:
                            <span class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Hourly">${this.state.monthly_expenses / 30 / 24}</span> /
                            <span class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Daily">${this.state.monthly_expenses / 30}</span> /
                            <span class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Monthly">${this.state.monthly_expenses}</span> /
                            <span class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Yearly">${this.state.monthly_expenses * 12}</span>
                        </p>
                        </div>
                        <div class="col-sm">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
