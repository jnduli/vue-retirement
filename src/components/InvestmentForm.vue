<template>
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
      <button class="button" @click="$emit('removeInvestment',index)">
        Remove
      </button>
    </b-field>
  </div>
</template>

<script>
export default {
  name: 'InvestmentForm',
  props: ['invest', 'index', 'use_percent'],
  computed: {
    label_invest_income: function () {
      if (this.use_percent) {
        return '% of income'
      }
      return 'Ksh per month'
    }
  }
}
</script>
