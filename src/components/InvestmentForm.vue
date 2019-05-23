<template>
  <div class="columns">
    <b-field class="column" label="Type">
      <b-select v-model="invest.type">
        <option>Bank Savings Account</option>
        <option>Bank Fixed Deposit Account</option>
        <option>Other</option>
      </b-select>
    </b-field>
    <b-field class="column" label="Interest">
      <b-select v-model="invest.interest_type">
        <option v-for="type in investment_type">{{ type }}</option>
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
        More Info
      </button>
    </b-field>
    <b-field class="column is-narrow" label="remove">
      <button class="button" @click="$emit('removeInvestment',index)">
        Remove
      </button>
    </b-field>
  </div>
</template>

<script>
import { INVESTMENT_TYPE } from '@/calculations/investments.js'
export default {
  name: 'InvestmentForm',
  props: ['invest', 'index', 'use_percent'],
  data () {
    return {
      investment_type: INVESTMENT_TYPE
    }
  },
  computed: {
    label_invest_income: function () {
      console.log(this.INVESTMENT_TYPE)
      if (this.use_percent) {
        return '% of income'
      }
      return 'Ksh per month'
    }
  }
}
</script>
