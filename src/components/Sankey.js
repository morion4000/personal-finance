import React, { Component } from 'react';
import Highcharts from 'highcharts'
import highchartsSankey from "highcharts/modules/sankey";
import HighchartsReact from 'highcharts-react-official'

highchartsSankey(Highcharts);

const options = {
    title: {
      text: 'Sankey Diagram'
    },
    series: [{
      keys: ['from', 'to', 'weight'],
      data: [['a', 'b', 3]],
      type: 'sankey',
      name: 'Streams'
    }]
  };

class Sankey extends Component {
    render() {
        return (    
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        );
    }
}
  

export default Sankey;
