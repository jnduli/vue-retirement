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
          <a>#buefy</a>.
        </div>
      </div>
      <footer class="card-footer">
        <button class="card-footer-item">Calculate</button>
        <button class="card-footer-item">Clear</button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RetirementBase',
  data() {
    return {
      salary: 0,
      expenses: 0,
      retirement_expenses: 0,
      investments: [],
    };
  },
  methods: {
    add_investment() {
      this.investments.push({ type: '', interest: 0.00, distribution: '' });
      console.log(this.investments);
    },
  },
};
</script>
