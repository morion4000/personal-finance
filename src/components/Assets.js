import React, { Component } from 'react';

import CONFIG from '../config';

class Assets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            total_accrued: 0
        }
    }

    componentDidMount() {
        const _this = this;
        let total_accrued = 0;
    
        setInterval(function() {
          _this.props.items.map(function(item) {
            let accrued = item.accrued || 0;
    
            accrued += item.amount * item.apr / 100 / CONFIG.MILISECONDS_IN_YEAR * CONFIG.REFRESH_INTERVAL;
    
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
            total_apr += asset.apr;
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
                <div class="row">
                  <div class="col-sm">
                    <h3>Savings <span class="badge badge-secondary">{this.getAssetsTotalApr()}%</span></h3>
                    <h5>${this.getAssetsTotalPrincipal()}</h5>
                    <span data-toggle="tooltip" data-html="true" title="Computing...">${this.state.total_accrued}</span>
                    <hr />
                  </div>
                </div>

                {this.props.items.map(item => (
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-label-group">
                                <strong><label for="principal" data-toggle="tooltip" data-html="true" title="">{item.name}</label></strong>
                                <input type="text" class="form-control" value={item.amount} disabled />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-label-group">
                            <label for="gains" data-toggle="tooltip" data-html="true" title="">APR {item.apr}%</label>
                                <input type="text" class="form-control" value={item.accrued} disabled />
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}
  

export default Assets;
