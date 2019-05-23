<template>
  <div class="container">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">Income Options</p>
        <router-link class="button" to="/">X</router-link>
      </header>
      <div class="card-content">
        <div class="content">
          <b-field horizontal label="Input % for inputs">
            <b-switch v-model="fake_use_percent">
              {{ use_percent_text }}
            </b-switch>
          </b-field>

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
              <b-field>
                <template slot="label">
                  Monthly Expenses
                  <b-tooltip type="is-dark" size="is-small" class="button is-outlined" label="How much do you spend per month? This can be a percentage of the income or an actual value" multilined>
                    ?
                  </b-tooltip>
                </template>
                <b-input v-model="expenses" type="number" step="any"></b-input>
                <p class="control">
                  <span class="button is-static">%</span>
                </p>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Retirement Expenses">
                <template slot="label">
                  Retirement Expenses
                  <b-tooltip type="is-dark" size="is-small" class="button is-outlined" label="How much do you think you'll spend per month after retirement? This should typically be less that the monthly expenses. This can be a percentage of current income or an actual value" multilined>
                    ?
                  </b-tooltip>
                </template>
                <b-input v-model="retirement_expenses" type="number" step="any"></b-input>
                <p class="control">
                  <span class="button is-static">%</span>
                </p>
              </b-field>
            </div>
          </div>

          Add select form on investments made
        <b-modal :active.sync="isAddInvestmentModalActive" has-modal-card>
            <add-investment-modal :use-percent='use_percent' v-on:addInvestment="addInvestment"></add-investment-modal>
        </b-modal>
          <button v-on:click="isAddInvestmentModalActive = true">Add</button>
        </div>
        <investments-table 
                  :investments="investments" 
                  :use-percent="fake_use_percent" 
                  v-on:remove-investment='removeInvestment' 
                  />
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
import AddInvestmentModal from '@/components/AddInvestmentModal'
import InvestmentsTable from '@/components/InvestmentsTable'
import { calculateInvestmentPeriods } from '@/calculations/investments'

export default {
  name: 'RetirementBase',
  components: {
    LineChart,
    InvestmentForm,
    AddInvestmentModal,
    InvestmentsTable
  },
  data () {
    return {
      isAddInvestmentModalActive: false,
      salary: 10000,
      expenses: 50,
      death: Infinity,
      retirement_expenses: 60,
      investments: [],
      lineData: [],
      toolTipData: [],
      done_calculating: false,
      use_percent: true,
      fake_use_percent: true,
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
      this.use_percent_text = 'Percent %'
      // this.use_percent_text = 'Ksh'
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
    addInvestment (investment) {
      this.investments.push(investment)
    },
    add_investment () {
      this.investments.push({
        type: '',
        interest_type: 'simple',
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
