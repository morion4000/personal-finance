import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';

class Alert extends Component {
    constructor(props) {
      super(props);

      let estimated_worth = 0;
      let expenses_sum = 0;
      let monthly_revenue = 0;
      let runway = 0;

      this.props.items.map(function(item) {
        let principal = 0;

        if (item.type === CONFIG.ITEM_TYPE.SERVICE) {
            principal = item.amount * 12 / CONFIG.SERVICE_ESTIMATE_APR * 100;

            monthly_revenue += item.amount;
        } else if (item.type === CONFIG.ITEM_TYPE.ASSET) {
            principal = item.amount;

            monthly_revenue += item.amount * item.apr / 100 / 12;
        } else if (item.type === CONFIG.ITEM_TYPE.EXPENSE) {
            expenses_sum += item.amount;
        }

        estimated_worth += principal;

        return item;
      });

      if (monthly_revenue < expenses_sum) {
        runway = estimated_worth / Math.abs(monthly_revenue - expenses_sum) * 12;
      }

      this.state = {
        runway: runway,
        estimated_worth: estimated_worth
      }
    }

    render() {
        return (    
          <div className="alert alert-primary" role="alert">
            <p><strong>Runway:</strong> <span data-toggle="tooltip" data-html="true" title="Runway">{this.state.runway} Years</span></p>
            <p><strong>Est. Worth:</strong>&nbsp;
              <span data-toggle="tooltip" data-html="true" title="@ 7% APR">
                <NumberFormat value={this.state.estimated_worth} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
              </span></p>
          </div>
        );
    }
}
  

export default Alert;
