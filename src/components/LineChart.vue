<template>
  <div>
    <div id="graph">
    </div>
    <!-- <svg width="500" height="270"> -->
    <!-- <g style="transform: translate(0, 10px)"> -->
    <!-- <path :d="line" /> -->
    <!-- </g> -->
    <!-- </svg> -->
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'vue-line-chart',
  props: {
    line_data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      line: '',
    };
  },
  mounted() {
    this.calculatePath();
  },
  watch: {
    line_data() {
      this.calculatePath();
    },
  },
  methods: {
    calculatePath() {
      const data = this.line_data.map((cur, idx) => ({ y: cur, x: idx }));
      const margin = {
        top: 40,
        right: 40,
        bottom: 60,
        left: 60,
      };
      const width = 960 - margin.left - margin.right;
      const height = 800 - margin.top - margin.bottom;

      const x = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, width]);
      const y = d3.scaleLinear()
        .domain([this.line_data[0], this.line_data[this.line_data.length - 1]])
        .range([height, 0]);
      const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y));

      const svg = d3.select('#graph').append('svg')
        .datum(data)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - margin.left)
        .attr('x', 0 - (height / 2))
        .attr('dy', '1em')
        .style('text-anchor', 'middle')
        .text('Value of investments');

      svg.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));
      console.log(`Somthing ${height}`);

      svg.append('text')
        .attr('transform', `translate(${width / 2}, ${height + margin.top + 10})`)
        .style('text-anchor', 'middle')
        .text('Number of months');

      svg.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y));

      svg.append('path')
        .attr('class', 'line')
        .attr('d', line);

      // svg.selectAll('.dot')
      // .data(data.filter(function(d) { return d; }))
      // .enter().append('circle')
      // .attr('class', 'dot')
      // .attr('cx', line.x())
      // .attr('cy', line.y())
      // .attr('r', 1.5);
    },
  },
};
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
</style>
