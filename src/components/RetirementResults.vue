<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Calculations</p>
        <router-link class="button" to="/income">Edit</router-link>
      </header>
      <div class="card-content">
        <div>Months to retirement: {{ lineData.length }}</div>
        <div>You have {{ Math.floor(lineData.length/12) }} Years
          and {{ lineData.length%12 }} Months to retire</div>
        <LineChart :line_data="lineData" :tooltip_data="toolTipData"/>
        <p>TODO: Include details on investments made</p>
      </div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'RetirementResults',
  components: {
    LineChart
  },
  data () {
    return {
      lineData: [1,2,3,4,5,6,7,8]
    }
  }

}
</script>
