<template>
  <div class="container">
    <div class="card">
      <p class="card-header-title">Income Options</p>
      <div class="card-content">
        <div class="content">
          <b-field horizontal label="Monthly Salary">
            <b-input v-model="salary" type="number"></b-input>
          </b-field>
          <b-field horizontal label="% used on Monthly Expenditure">
            <b-input v-model="expenses" type="number"></b-input>
          </b-field>
          <b-field horizontal label="% Monthly Expenses on Retiring">
            <b-input v-model="retirement_expenses" type="number"></b-input>
          </b-field>

          Add select form on investments made
          <button v-on:click="add_investment">Add</button>

          <b-field grouped v-for="invest in investments">
            <b-field label="Type">
              <b-select v-model="invest.type">
                <option>Bank Savings Account</option>
                <option>Bank Fixed Deposit Account</option>
              </b-select>
            </b-field>
            <b-field label="Mean Interest %">
              <b-input type="number" v-model="invest.interest"></b-input>
            </b-field>
            <b-field label="Distribution">
              <b-select v-model="invest.distribution">
                <option>Constant</option>
                <option>Gaussian</option>
              </b-select>
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
      <div>You have {{ Math.floor(lineData.length/12) }} Years and {{ lineData.length%12 }} Months to retire</div>
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
      salary: 0,
      expenses: 0,
      retirement_expenses: 0,
      investments: [],
      lineData: [],
      done_calculating: false,
    };
  },
  methods: {
    add_investment() {
      this.investments.push({ type: '', interest: 0.00, distribution: '' });
      console.log(this.investments);
    },
    calculatePeriods() {
      // assumes the values. To take the correct ones later
      const investment = 30; // percent
      const interest = 6.5; // percent
      const retirementReached = (this.retirement_expenses * this.salary) / 100;

      // calculations
      const monthlyInvest = (investment * this.salary) / 100;
      const monthlyInterest = interest / 1200;
      const monthPrincipals = [0];
      while (true) {
        const principal = monthPrincipals[monthPrincipals.length - 1];
        const newPrincipal = principal + (principal * monthlyInterest);
        monthPrincipals.push(newPrincipal + monthlyInvest);
        if (newPrincipal - principal >= retirementReached) {
          break;
        }
      }
      // this.$set(this.lineData, monthPrincipals);
      this.lineData = monthPrincipals;
      this.done_calculating = true;
    },
    resetCalculations() {
      this.done_calculating = false;
    }
  },
};
</script>
