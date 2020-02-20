import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

import CONFIG from '../config';

class Alert extends Component {
    constructor(props) {
      super(props);

      let estimated_worth = 0;
      let principal_sum = 0;
      let expenses_sum = 0;
      let monthly_revenue = 0;
      let runway = 0;
      let yearly_deficit = 0;

      props.items.map(function(item) {
        let principal = 0;

        if (item.type === CONFIG.ITEM_TYPE.SERVICE) {
            principal = item.amount * 12 / CONFIG.SERVICE_ESTIMATE_APR * 100;

            monthly_revenue += item.amount;
        } else if (item.type === CONFIG.ITEM_TYPE.ASSET) {
            principal = item.amount;

            monthly_revenue += item.amount * item.apr / 100 / 12;
            principal_sum += item.amount;
        } else if (item.type === CONFIG.ITEM_TYPE.EXPENSE) {
            expenses_sum += item.amount;
        }

        estimated_worth += principal;

        return item;
      });

      if (monthly_revenue < expenses_sum) {
        runway = principal_sum / ((expenses_sum - monthly_revenue) * 12);
        yearly_deficit = (expenses_sum - monthly_revenue) * 12;
      }

      this.state = {
        runway: runway,
        estimated_worth: estimated_worth,
        yearly_deficit: yearly_deficit
      }
    }

    render() {
        return (    
          <div className="alert alert-dark" role="alert">
            <p>
              <strong>Runway:</strong> <span data-tip={`Yearly deficit: $${this.state.yearly_deficit}`}>
                {this.state.yearly_deficit > 0 && <span><NumberFormat value={this.state.runway} displayType={'text'} thousandSeparator={true} decimalScale={1} /> Years</span>}
                {this.state.yearly_deficit === 0 && <span>&infin;</span>}
              </span>
            </p>
            <p><strong>Est. Worth:</strong>&nbsp;
              <span data-tip={`@ ${CONFIG.SERVICE_ESTIMATE_APR}% APR`}>
                <NumberFormat value={this.state.estimated_worth} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={0} />
              </span></p>
          </div>
        );
    }
}
  

export default Alert;
