import React, { Component } from 'react';

class Assets extends Component {
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
            total_principal += asset.principal;
        });

        return total_principal.toFixed(5);
    }

    render() {
        return (
            <React.Fragment>
                <div class="row">
                  <div class="col-sm">
                    <h3>Savings <span class="badge badge-secondary">{this.getAssetsTotalApr()}%</span></h3>
                    <h5>${this.getAssetsTotalPrincipal()}</h5>
                    <span id="assets_accrued_total" data-toggle="tooltip" data-html="true" title="Computing...">$0</span>
                    <hr />
                  </div>
                </div>

                {this.props.items.map(item => (
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-label-group">
                                <strong><label for="principal" data-toggle="tooltip" data-html="true" title="">{item.name}</label></strong>
                                <input type="text" class="form-control" value={item.principal} disabled />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-label-group">
                            <label for="gains" data-toggle="tooltip" data-html="true" title="">APR {item.apr}%</label>
                                <input type="text" class="form-control" disabled />
                            </div>
                        </div>
                    </div>
                ))}
            </React.Fragment>
        );
    }
}
  

export default Assets;
