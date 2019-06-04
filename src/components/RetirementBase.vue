<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Income Options</p>
        <button v-on:click="saveInvestments">Save</button>
        <router-link class="button" to="/">X</router-link>
      </header>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column">
              <b-field>
                <template slot="label">
                  Income (Monthly)
                  <b-tooltip type="is-dark" size="is-small" class="button is-outlined" label="How much you earn per month">
                    ?
                  </b-tooltip>
                </template>
                <b-input v-model="salary" type="number" step="any"></b-input>
                <p class="control">
                  <span class="button is-static">Ksh</span>
                </p>
              </b-field>
            </div>
            <div class="column">
              <b-field>
                <template slot="label">
                  Expected Years
                  <b-tooltip type="is-dark" size="is-small" class="button is-outlined" label="How many years from now do you expect the fund to last for. If left blank, assumed years is infinity" multilined>
                    ?
                  </b-tooltip>
                </template>
                <b-input v-model="death" type="number" step="any" placeholder="Infinity"></b-input>
                <p class="control">
                  <span class="button is-static">yrs</span>
                </p>
              </b-field>
            </div>
          </div>

          <div class="columns">
            <div class="column">
                <unit-conversion-input
                  label="Monthly Expenses"
                  tooltip="How much do you spend per month? This can be a percentage of the income or an actual value"
                  :fractional-money="expenses"
                  :main-money="salary"
                  ></unit-conversion-input>
            </div>
            <div class="column">
              <unit-conversion-input
                label="Retirement Expenses"
                tooltip="How much do you think you'll spend per month after retirement? This should typically be less that the monthly expenses. This can be a percentage of current income or an actual value"
                :fractional-money="retirement_expenses"
                :main-money="salary"
                ></unit-conversion-input>
            </div>
          </div>

          Add select form on investments made
        <b-modal :active.sync="isAddInvestmentModalActive" has-modal-card>
            <add-investment-modal v-on:addInvestment="addInvestment" :salary="salary"></add-investment-modal>
        </b-modal>
          <button id="add-investment" v-on:click="isAddInvestmentModalActive = true">Add</button>
        </div>
        <investments-table
          :salary="salary"
          :investments="investments"
          v-on:remove-investment='removeInvestment' />
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
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'
import InvestmentForm from '@/components/InvestmentForm'
import AddInvestmentModal from '@/components/AddInvestmentModal'
import InvestmentsTable from '@/components/InvestmentsTable'
import UnitConversionInput from '@/components/UnitConversionInput'
import { calculateInvestmentPeriods } from '@/calculations/investments'

export default {
  name: 'RetirementBase',
  components: {
    LineChart,
    InvestmentForm,
    AddInvestmentModal,
    InvestmentsTable,
    UnitConversionInput
  },
  watch: {
    salary: function (newSalary, oldSalary) {
      // update expenses using percentage
      this.expenses.currency = newSalary * this.expenses.percent / 100
      this.retirement_expenses.currency = newSalary * this.retirement_expenses.percent / 100
      this.investments = this.investments.map((investment) => {
        investment.contribution.currency = newSalary * investment.contribution.percent / 100
        return investment
      })
    }
  },
  created: function () {
    const salary = localStorage.getItem('salary')
    this.salary = salary || this.salary
    const death = localStorage.getItem('death')
    this.death = death || this.death
    const expenses = JSON.parse(localStorage.getItem('expenses'))
    this.expenses = expenses || this.expenses
    const retirementExpenses = JSON.parse(localStorage.getItem('retirement_expenses'))
    this.retirement_expenses = retirementExpenses || this.retirement_expenses
    const investments = JSON.parse(localStorage.getItem('investments'))
    this.investments = investments || this.investments
  },
  data () {
    return {
      isAddInvestmentModalActive: false,
      salary: 10000,
      expenses: {
        percent: 0,
        currency: 0,
        use_percent: true
      },
      retirement_expenses: {
        percent: 0,
        currency: 0,
        use_percent: true
      },
      death: Infinity,
      investments: [],
      lineData: [],
      toolTipData: [],
      done_calculating: false,
      error: false,
      error_message: ''
    }
  },
  methods: {
    addInvestment (investment) {
      this.investments.push(investment)
    },
    removeInvestment (index) {
      this.investments.splice(index, 1)
    },
    calculatePeriods () {
      this.resetCalculations()
      if (this.death === 0 || this.death === null) {
        this.death = Infinity
      }
      const result = calculateInvestmentPeriods(JSON.parse(JSON.stringify(this.investments)), this.salary, this.expenses.percent, this.retirement_expenses.percent, this.death)
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
    },
    saveInvestments () {
      localStorage.setItem('salary', this.salary)
      localStorage.setItem('death', this.death)
      localStorage.setItem('expenses', JSON.stringify(this.expenses))
      localStorage.setItem('retirement_expenses', JSON.stringify(this.retirement_expenses))
      localStorage.setItem('investments', JSON.stringify(this.investments))
    }
  }
}
</script>
