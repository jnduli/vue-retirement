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
            <div class="columns">
              <b-field class="column" label="Type">
                <b-select v-model="invest.type">
                  <option>Bank Savings Account</option>
                  <option>Bank Fixed Deposit Account</option>
                  <option>Other</option>
                </b-select>
              </b-field>
              <b-field class="column" label="Annual Int %">
                <b-input type="number" step="any"  v-model="invest.interest"></b-input>
              </b-field>
              <b-field class="column" label="Distribution">
                <b-select v-model="invest.distribution">
                  <option>Constant</option>
                  <!-- <option>Gaussian</option> -->
                </b-select>
              </b-field>
              <b-field class="column" :label="label_invest_income">
                <b-input type="number" step="any" v-model="invest.percentage"></b-input>
              </b-field>
              <b-field class="column is-narrow" label="remove">
                <button class="button" @click="removeInvestment(index)">
                  Remove
                </button>
              </b-field>
            </div>
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
      <LineChart :line_data="lineData"/>
      <!-- <div v-for="prin in lineData">{{ prin }}</div> -->
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import { calculateInvestmentPeriods } from '@/calculations/investments'

export default {
  name: 'RetirementBase',
  components: {
    LineChart
  },
  data () {
    return {
      salary: 10000,
      expenses: 50,
      retirement_expenses: 60,
      investments: [],
      lineData: [],
      done_calculating: false,
      use_percent: true,
      use_percent_text: 'Percent %',
      error: false,
      error_message: ''
    }
  },
  watch: {
    use_percent (val) {
      console.log(val)
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
    },
    label_invest_income: function () {
      if (this.use_percent) {
        return '% of income'
      }
      return 'Ksh per month'
    }
  },
  methods: {
    add_investment () {
      console.log('Adding somethig')
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
      const result = calculateInvestmentPeriods(JSON.parse(JSON.stringify(this.investments)), this.salary, this.expenses, this.retirement_expenses, this.use_percent)
      const passed = result.passed
      console.log(passed)
      if (!passed) {
        this.error = true
        this.error_message = result.message
        return
      }
      this.error = false
      this.lineData = result.data
      this.done_calculating = true
    },
    resetCalculations () {
      this.done_calculating = false
      this.lineData = []
      this.error = false
    }
  }
}
</script>
