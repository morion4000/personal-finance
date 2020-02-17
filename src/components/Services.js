import React, { Component } from 'react';

class Assets extends Component {
    render() {
        return (
            <React.Fragment>
                <div class="row">
                  <div class="col-sm">
                    <h3>Services</h3>
                    <h5><span id="services_estimated_principal_total" data-toggle="tooltip" data-html="true" title="Est. at 7% APR">$0</span></h5>
                    <span id="services_accrued_total" data-toggle="tooltip" data-html="true" title="Computing...">$0</span>
                    <hr />
                  </div>
                </div>

                {this.props.items.map(item => (
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-label-group">
                                <strong><label for="principal" data-toggle="tooltip" data-html="true" title="">{item.name}</label></strong>
                                <input type="text" class="form-control" value={item.revenue} disabled />
                            </div>
                        </div>
                        <div class="col-sm">
                            <div class="form-label-group">
                            <label for="gains" data-toggle="tooltip" data-html="true" title="">Revenue</label>
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
