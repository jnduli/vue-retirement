<template>
  <div class="container">
    <div class="card">
      <p class="card-header-title">Income Options</p>
      <div class="card-content">
        <div class="content">
          <b-field horizontal label="Monthly Salary">
            <b-input v-model="salary" type="number" step="any"></b-input>
          </b-field>
          <b-field horizontal label="% used on Monthly Expenditure">
            <b-input v-model="expenses" type="number" step="any"></b-input>
          </b-field>
          <b-field horizontal label="% Monthly Expenses on Retiring">
            <b-input v-model="retirement_expenses" type="number" step="any"></b-input>
          </b-field>

          Add select form on investments made
          <button v-on:click="add_investment">Add</button>

          <b-field grouped v-for="invest in investments" v-bind:key="invest.id">
            <b-field label="Type">
              <b-select v-model="invest.type">
                <option>Bank Savings Account</option>
                <option>Bank Fixed Deposit Account</option>
              </b-select>
            </b-field>
            <b-field label="Mean Interest %">
              <b-input type="number" step="any"  v-model="invest.interest"></b-input>
            </b-field>
            <b-field label="Distribution">
              <b-select v-model="invest.distribution">
                <option>Constant</option>
                <!-- <option>Gaussian</option> -->
              </b-select>
            </b-field>
            <b-field label="% of income">
              <b-input type="number" step="any" v-model="invest.percentage"></b-input>
            </b-field>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <button v-on:click="calculatePeriods" class="card-footer-item">Calculate</button>
        <button v-on:click="resetCalculations" class="card-footer-item">Clear</button>
      </footer>
    </div>
    <div v-if="done_calculating" class="card">
      <div>Months to retirement: {{ lineData.length }}</div>
      <div>You have {{ Math.floor(lineData.length/12) }} Years
        and {{ lineData.length%12 }} Months to retire</div>
      <LineChart :line_data="lineData"/>
      <div v-for="prin in lineData">{{ prin }}</div>
    </div>
  </div>
</template>

<script>
import LineChart from '@/components/LineChart'

export default {
  name: 'RetirementBase',
  components: {
    LineChart,
  },
  data() {
    return {
      salary: 10000,
      expenses: 50,
      retirement_expenses: 60,
      investments: [],
      lineData: [],
      done_calculating: false,
    };
  },
  methods: {
    add_investment() {
      this.investments.push({
        id: this.investments.length - 1,
        type: '',
        interest: 10.00,
        distribution: '',
        percentage: 10,
      });
    },
    get_monthly_investments(investments, salary) {
      return investments.map((invest) => {
        const monthly = {
          invest: (invest.percentage * salary) / 100,
          interest: (invest.interest / 1200),
          principal: [0],
          profit: [0],
        };
        return monthly;
      });
    },
    individual_invest_calculations(x) {
      const principal = x.principal[x.principal.length - 1];
      const newPrincipal = principal + (principal * x.interest);
      x.principal.push(newPrincipal + x.invest);
      x.profit.push(newPrincipal - principal);
      return x;
    },
    calculatePeriods() {
      // the limit where investments can sustain you alone
      const retirementReached = (this.retirement_expenses * this.salary) / 100;
      // Check that percentages add up to at most 100
      console.log('Checking changes');
      console.log(this.expenses);
      console.log(this.investments);

      const total = this.expenses + this.investments.reduce((accumulator, currentValue) =>
        accumulator + parseInt(currentValue.percentage, 0), 0);
      console.log(total);
      if (total > 100) {
        console.log('Total is greater than 100');
        return;
      }
      // this.investments is an array of investments made per month at a particular percentage
      // create array on monthlyinvestments, monthlyinterest and monthly principals
      let monthlyInvestments = this.get_monthly_investments(this.investments.slice(), this.salary);
      let profit = 0;
      while (profit <= retirementReached) {
        monthlyInvestments = monthlyInvestments.map(this.individual_invest_calculations);
        // calculate profits
        profit = monthlyInvestments.reduce((acc, current) =>
          acc + current.profit[current.profit.length - 1], 0);
      }
      // lineData should be sum of investments per month
      const principals = monthlyInvestments.map(x => x.principal);
      console.log(principals.length);

      let start = principals[0];
      for (let i = 1; i < principals.length - 1; i += 1) {
        start = start.map((num, index) => num + principals[i][index]);
      }
      this.lineData = start;
      this.done_calculating = true;
    },
    resetCalculations() {
      this.done_calculating = false;
    },
  },
};
</script>
