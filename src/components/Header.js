import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
        <div class="jumbotron jumbotron-fluid">
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                    <h1 class="display-4">Personal Finance Tracker</h1>
                    <p class="lead">Visualise Financial Streams.</p>
                    <button type="button" class="btn btn-primary btn-lg">
                        Streaming <span class="badge badge-light" id="streaming_revenue">$0</span>
                    </button>
                    <br /><br />
                    <p>
                        Income:
                        <span id="streaming_hour" class="badge badge-light" data-toggle="tooltip" data-html="true" title="Hourly">$0</span> /
                        <span id="streaming_day" class="badge badge-light" data-toggle="tooltip" data-html="true" title="Daily">$0</span> /
                        <span id="streaming_month" class="badge badge-light" data-toggle="tooltip" data-html="true" title="Monthly">$0</span> /
                        <span id="streaming_year" class="badge badge-light" data-toggle="tooltip" data-html="true" title="Yearly">$0</span>
                    </p>
                    <p>
                        Expenses:
                        <span id="expense_hour" class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Hourly">$0</span> /
                        <span id="expense_day" class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Daily">$0</span> /
                        <span id="expense_month" class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Monthly">$0</span> /
                        <span id="expense_year" class="badge badge-danger" data-toggle="tooltip" data-html="true" title="Yearly">$0</span>
                    </p>
                    </div>
                    <div class="col-sm">
                    {/*
                    <div id="donut_overall_status" style={height:'400px'}></div>
                    */}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Header;
