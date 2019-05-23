<template>
  <div>
    <div id="graph">
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'vue-line-chart',
  props: {
    line_data: {
      type: Array,
      default: () => []
    },
    tooltip_data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      line: ''
    }
  },
  mounted () {
    this.calculatePath()
  },
  watch: {
    line_data () {
      this.calculatePath()
    }
  },
  methods: {
    getToolTipInvestment: function (toolTipData, index) {
      let text = '<div class="card">'
      if (index > this.line_data.length - 1) {
        index = this.line_data.length - 1
      }
      for (let i = 0; i < toolTipData.length; i += 1) {
        let el = toolTipData[i]
        if (el.interest_type === 'simple') {
          text = text + `<div>${el['type']} : ${Math.floor(el['invest'] * index)}</div>`
        } else if (el.interest_type === 'compound') {
          text = text + `<div>${el['type']} : ${Math.floor(el['principal'][index])}</div>`
        }
      }
      text = text + '</div>'
      return text
    },
    calculatePath () {
      const data = this.line_data.map((cur, idx) => ({ y: cur, x: idx }))
      const dotStep = 10
      const dotData = data.filter((elem, index) => (index % dotStep === 0) || (index === data.length - 1))
      const margin = {
        top: 40,
        right: 40,
        bottom: 60,
        left: 60
      }
      const width = 960 - margin.left - margin.right
      const height = 800 - margin.top - margin.bottom

      const x = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, width])
      const y = d3.scaleLinear()
        .domain([this.line_data[0], this.line_data[this.line_data.length - 1]])
        .range([height, 0])
      const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y))

      d3.select('svg').remove()

      const svg = d3.select('#graph').append('svg')
        .datum(data)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)

      // Define the div for the tooltip
      var div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)

      const dotLine = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y))

      var $this = this
      svg.selectAll('dot')
        .data(dotData)
        .enter()
        .append('circle')
        .attr('r', 5)
        .attr('cx', dotLine.x())
        .attr('cy', dotLine.y())
        .on('mouseover', function (d, i) {
          div.transition()
            .duration(200)
            .style('opacity', 0.9)
          div.html($this.getToolTipInvestment($this.tooltip_data, i * dotStep))
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
        })
        .on('mouseout', function (d) {
          div.transition()
            .duration(500)
            .style('opacity', 0)
        })

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Value of investments')

      svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))

      svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.top + 10})`)
        .style('text-anchor', 'middle')
        .text('Number of months')

      svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))

      svg.append('path')
        .attr('class', 'line')
        .attr('d', line)
    }
  }
}
</script>

<style>
.area {
  fill: lightsteelblue;
}

.line {
  fill: none;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.dot {
  fill: white;
  stroke: steelblue;
  stroke-width: 1.5px;
}

div.tooltip {
  position: absolute;
  text-align: center;
  padding: 2px;
  font: 12px sans-serif;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
  width: 200px;
}
</style>
