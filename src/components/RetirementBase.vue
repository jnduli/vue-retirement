<template>
  <div class="container">
    <div class="card">
      <p class="card-header-title">Income Options</p>
      <div class="card-content">
        <div class="content">
          <b-field horizontal label="Choose between % or Ksh for inputs">
            <b-switch v-model="use_percent">
              {{ use_percent_text }}
            </b-switch>
          </b-field>
          <b-field horizontal label="Years before Death">
            <b-input v-model="death" type="number" step="any"></b-input>
          </b-field>
          <b-field horizontal label="Monthly Salary">
            <b-input v-model="salary" type="number" step="any"></b-input>
          </b-field>
          <b-field horizontal :label="label_monthly">
            <b-input v-model="expenses" type="number" step="any"></b-input>
          </b-field>
          <b-field horizontal :label="label_retire">
            <b-input v-model="retirement_expenses" type="number" step="any"></b-input>
          </b-field>

          Add select form on investments made
          <button v-on:click="add_investment">Add</button>
          <b-field grouped v-for="(invest, index) in investments" v-bind:key="index">
            <investment-form :invest='invest' :index='index' :use_percent='use_percent' v-on:removeInvestment="removeInvestment"/>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <button v-on:click="calculatePeriods" class="card-footer-item">Calculate</button>
        <button v-on:click="resetCalculations" class="card-footer-item">Clear</button>
      </footer>
    </div>
    <b-message v-if="error" title="Problem Encountered" type="is-danger">
      {{ error_message }}
    </b-message>
    <div v-if="done_calculating" class="card">
      <div>Months to retirement: {{ lineData.length }}</div>
      <div>You have {{ Math.floor(lineData.length/12) }} Years
        and {{ lineData.length%12 }} Months to retire</div>
      <LineChart :line_data="lineData" :tooltip_data="toolTipData"/>
      <!-- <div v-for="prin in lineData">{{ prin }}</div> -->
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import InvestmentForm from '@/components/InvestmentForm'
import { calculateInvestmentPeriods } from '@/calculations/investments'

export default {
  name: 'RetirementBase',
  components: {
    LineChart,
    InvestmentForm
  },
  data () {
    return {
      salary: 10000,
      expenses: 50,
      death: Infinity,
      retirement_expenses: 60,
      investments: [],
      lineData: [],
      toolTipData: [],
      done_calculating: false,
      use_percent: true,
      use_percent_text: 'Percent %',
      error: false,
      error_message: ''
    }
  },
  watch: {
    use_percent (val) {
      if (val) {
        this.use_percent_text = 'Percent %'
        return
      }
      this.use_percent_text = 'Ksh'
    }
  },
  computed: {
    label_monthly: function () {
      if (this.use_percent) {
        return '% used on Monthly Expenditure'
      }
      return 'Ksh used per month'
    },
    label_retire: function () {
      if (this.use_percent) {
        return '% of income used on retirement'
      }
      return 'Ksh used per month on retirement'
    }
  },
  methods: {
    add_investment () {
      this.investments.push({
        type: '',
        interest: 10.00,
        distribution: '',
        percentage: 10
      })
    },
    removeInvestment (index) {
      this.investments.splice(index, 1)
    },
    calculatePeriods () {
      this.resetCalculations()
      const result = calculateInvestmentPeriods(JSON.parse(JSON.stringify(this.investments)), this.salary, this.expenses, this.retirement_expenses, this.use_percent, this.death)
      const passed = result.passed
      if (!passed) {
        this.error = true
        this.error_message = result.message
        return
      }
      this.error = false
      this.lineData = result.data
      this.toolTipData = result.extras
      // console.log(this.toolTipData)
      this.done_calculating = true
    },
    resetCalculations () {
      this.done_calculating = false
      this.lineData = []
      this.toolTipData = []
      this.error = false
    }
  }
}
</script>
