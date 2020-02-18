import React, { Component } from 'react';
import Highcharts from 'highcharts'
import highchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from 'highcharts-react-official'

import Storage from './Storage';

highchartsSankey(Highcharts);

class Sankey extends Component {
    constructor(props) {
      super(props);

      let data = [];
      
      if (props.items) {
        let assets_sum = 0;
        let services_sum = 0;
        let expenses_sum = 0;
        let income_sum = 0;

        props.items.map(function(item) {
          switch (item.type) {
            case Storage.TYPES.ASSET:
              const monthly_income = item.amount * item.apr / 100 / 12;

              assets_sum += monthly_income;
              data.push([item.name, 'Savings', parseInt(monthly_income)]);
              break;

            case Storage.TYPES.SERVICE:
              services_sum += item.amount;
              data.push([item.name, 'Services', item.amount]);
              break;

            case Storage.TYPES.EXPENSE:
              expenses_sum += item.amount;
              data.push(['Expenses', item.name, item.amount]);
              break;

            default:
          }

          return item;
        });

        income_sum = assets_sum + services_sum;

        data.push(['Savings', 'Income', assets_sum]);
        data.push(['Services', 'Income', services_sum]);

        if (income_sum < expenses_sum) {
          data.push(['Income', 'Expenses', income_sum]);
          data.push(['Deficit', 'Expenses', expenses_sum - income_sum]);
        }
      
        if (income_sum >= expenses_sum) {
          data.push(['Income', 'Expenses', income_sum - (income_sum - expenses_sum)]);
          data.push(['Income', 'Surplus', income_sum - expenses_sum]);
        }
      }

      this.state = {
        options: {
          chart: {
            backgroundColor: 'transparent'
          },
          title: {
            text: 'Money Flow'
          },
          series: [{
            keys: ['from', 'to', 'weight'],
            data: data,
            type: 'sankey',
            name: 'Flow'
          }]
        }
      }
    }

    render() {
        return (    
            <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
            />
        );
    }
}
  

export default Sankey;
